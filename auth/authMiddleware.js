const jwt = require("jsonwebtoken");
const User = require("../database/models/userModel");

const authorizationMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(404).json({ error: "Authorization token require!" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    next();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { authorizationMiddleware };
