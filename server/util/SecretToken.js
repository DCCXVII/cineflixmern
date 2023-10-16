require("dotenv").config();
const jwt = require("jsonwebtoken");

const createSecretToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 30 * 24 * 60 * 60,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    maxAge: 30 * 24 * 60 * 60,
  });
};

module.exports = createSecretToken;
