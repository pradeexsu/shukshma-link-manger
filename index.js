const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const http = require("http");
const https = require("https");

const { nanoid } = require("nanoid");
require("dotenv").config();
require("./models/User");
require("./services/passport");

const authRoutes = require("./routes/authRoutes");
const cookieSession = require("cookie-session");
const passport = require("passport");

const app = express();
app.use(morgan("dev"));

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(cors());
app.use(express.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());
authRoutes(app);

const { Schema, model } = require("mongoose");

const UrlSchema = new Schema(
  {
    email: { type: String, default: null },
    hitCount: { type: Number, default: 0 },
    key: { type: String, index: true, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true }
);
const ShortenUrl = model("ShortenUrl", UrlSchema);

const dbUrl = process.env.MONGO_URI;
mongoose.connect(dbUrl);
mongoose.connection
  .once("open", () => {
    console.log("connected with db");
  })
  .on("error", (error) => {
    console.log("something went wrong");
  });

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.post("/all", async (req, res) => {
  try {
    const email = req.body.email;
    console.log("email :", req.body);
    const links = await ShortenUrl.find({ email });
    res.json({
      links: links,
      status: "success",
    });
  } catch (error) {
    res.json({
      msg: "error is there",
      status: "danger",
    });
  }
});

app.post("/", async (req, res) => {
  console.log(req.body);

  try {
    let key = req.body.key || nanoid(5);
    console.log("[key:  ", key, "  ]");

    const isDuplicateKey = await ShortenUrl.findOne({ key: key });
    if (isDuplicateKey) {
      return res.json({
        msg: "duplicate key",
        status: "warning",
      });
    } else {
      const urlData = { ...req.body };
      urlData.key = key;
      const link = new ShortenUrl(urlData);
      link.save().then(async (feedback) => {
        console.log("feedback: ", feedback);
        res.json({
          ...feedback,
          msg: "link created",
          status: "success",
        });
      });
    }
  } catch (err) {
    res.json({ msg: "error is there", status: "danger" });
  }
});

app.put("/", async (req, res) => {
  try {
    const { key, newKey, email } = req.body;
    const updated = await ShortenUrl.updateOne({ key }, { key: newKey });
    res.json({ msg: "url key updated", data: updated });
  } catch (error) {
    res.json({
      msg: "error is there",
    });
  }
});

app.delete("/:key", async (req, res) => {
  try {
    const { key } = req.params;
    console.log(key);
    const deleted = await ShortenUrl.deleteOne({ key: key });
    res.json({ msg: "url deleted", data: deleted });
  } catch (error) {
    res.json({
      msg: "error is there",
    });
  }
});

app.get("/:key", async (req, res) => {
  try {
    const key = req.params.key;
    ShortenUrl.findOneAndUpdate(
      { key: key },
      { $inc: { hitCount: 1 } },
      { new: true }
    ).then((res1) => {
      console.log("res", res1);
      if (res1 === null) {
        res.send({ msg: "invalid url" }).end();
      } else {
        const link = res1.link;
        res.redirect(link.startsWith("http") ? link : `https://${link}`);
      }
    });
  } catch (error) {
    res.json({
      msg: "error is there",
    });
  }
});

if (process.env.NODE_ENV === "prod") {
  const privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/sku.rest/privkey.pem",
    "utf8"
  );
  const certificate = fs.readFileSync(
    "/etc/letsencrypt/live/sku.rest/cert.pem",
    "utf8"
  );
  const ca = fs.readFileSync(
    "/etc/letsencrypt/live/sku.rest/chain.pem",
    "utf8"
  );
  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };

  https.createServer(credentials, app).listen(443, () => {
    console.log("HTTPS Server running on port 443");
  });
  http
    .createServer(function (req, res) {
      res.writeHead(301, {
        Location: "https://" + req.headers["host"] + req.url,
      });
      res.end();
    })
    .listen(80);
} else if (process.env.NODE_ENV === "dev") {
  app.listen(5000, () => {
    console.log(`server starting at port ${5000}`);
  });
} else {
  app.listen(5000, () => {
    console.log(`server starting at port ${5000}`);
  });
}
