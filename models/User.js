const { Schema, model } = require("mongoose");

const userSchema = Schema({
  googleId: String,
  sub: String,
  given_name: String,
  name: String,
  family_name: String,
  picture: String,
  email: String,
  email_verified: Boolean,
  locale: String
});

model("users", userSchema);
