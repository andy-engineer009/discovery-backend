const jwt = require("jsonwebtoken");
const { secretKey } = require("../../config/keys");


const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
console.log(token)
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
