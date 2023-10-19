require("dotenv").config();
const jwt = require("jsonwebtoken");

const createSecretToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", 
    maxAge: 30 * 24 * 60 * 60 * 1000, // in milliseconds
  });
};

module.exports = createSecretToken;
