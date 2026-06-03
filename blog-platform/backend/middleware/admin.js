const { ROLES } = require("../utils/constants");

const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === ROLES.ADMIN) {
    next();
  } else {
    res.status(403).json({ message: "Admin access required" });
  }
};

module.exports = adminMiddleware;
