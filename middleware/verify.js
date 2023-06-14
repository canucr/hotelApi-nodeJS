const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(500).json({ message: "you are not logged in..." });
  }
  jwt.verify(token, "SECRET_KEY", (err, user) => {
    if (err) res.status(500).json({ message: "wrong token..." });
    req.user = user;
    next();
  });
};
const userToken = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id == req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(500).json({ message: "you are not logged in..." });
    }
  });
};
const adminToken = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(500).json({ message: "you are not admin!" });
    }
  });
};

module.exports = { verifyToken, userToken, adminToken };
