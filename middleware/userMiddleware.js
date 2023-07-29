const validator = require("validator");
const bcrypt = require("bcrypt");

const User = require("../database/models/userModel");

const signInMiddleWare = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({ error: "All fields must be fill" });
  }

  if (!validator.isEmail(email)) {
    return res.status(404).json({ error: "Email is not valid" });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(404).json({ error: "Password is not strong enough" });
  }

  const exists = await User.findOne({ email });

  if (exists) {
    return res.status(404).json({ error: "Email already in use" });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = { email, password: hash };
  req.modifyUser = user;
  next();
};

const loginMiddleWare = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({ error: "All fields must be fill!" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: "Incorrect Email" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(404).json({ error: "Incorrect Password" });
  }

  req.loginUser = user;
  next();
};

module.exports = { signInMiddleWare, loginMiddleWare };
