const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new googleStrategy(
    {
      clientSecret: process.env.CLIENT_SECRET,
      clientID: process.env.CLIENT_ID,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("access Token: ", accessToken);
      console.log("refresh Token: ", refreshToken);
      console.log("profile: ", profile);
      console.log("Done: ", done);

      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        console.log("user already exist");
        return done(null, existingUser);
      }
      console.log("welcome new user");
      const user = await new User({
        googleId: profile.id,
        ...profile._json        
      }).save();
      return done(null, user);
    }
  )
);
