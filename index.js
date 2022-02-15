const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
require("./models/User");
require("./services/passport");

const authRoutes = require("./routes/authRoutes");
const cookieSession = require("cookie-session");
const passport = require("passport");

const app = express();
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());
authRoutes(app);

const dbUrl = process.env.MONGO_URI;
mongoose.connect(dbUrl);
mongoose.connection
  .once("open", () => {
    console.log("connected with db");
  })
  .on("errir", (error) => {
    console.log("something went wrong");
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server starting at port ${port}`);
});
