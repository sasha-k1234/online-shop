const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  if (!req.headers.authorization) {
    req.userId = 0;
    next();
    return;
  }
  const token = req.headers.authorization.split(" ")[1];
  //const token = authHeader && authHeader.split(' ')[1];
  if (token === null) return res.sendStatus(401);
  try {
    let decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decode.userId;
    next();
  } catch (err) {
    if (err.message.includes("jwt expired")) {
      return res.sendStatus(401);
    }
    res.sendStatus(403);
  }
}

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   if (token == null) return res.sendStatus(401)

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

//     if (err) return res.sendStatus(403)
//     req.user = user;
//     next();
//   })
// }

module.exports = authenticateToken;
