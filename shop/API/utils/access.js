const jwt = require("jsonwebtoken");
function generateAccessToken(user) {
  return jwt.sign({userId:user.id,role:user.role}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });
}

module.exports = generateAccessToken;
