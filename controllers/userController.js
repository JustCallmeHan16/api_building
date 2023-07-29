const User = require("../database/models/userModel");
const generateToken = require("../middleware/token/createToken");

const signIn = async (req, res) => {
  const { email, password } = req.modifyUser;

  try {
    const user = await User.create({ email, password });

    //* create token
    const token = generateToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logIn = async (req, res) => {
  const { email, _id } = req.loginUser;

  try {
    const token = generateToken(_id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { signIn, logIn };
