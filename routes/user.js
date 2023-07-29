const express = require("express");
const router = express.Router();

//* middleware
const {
  signInMiddleWare,
  loginMiddleWare,
} = require("../middleware/userMiddleware");

//* controllers
const { signIn, logIn } = require("../controllers/userController");

router.post("/signin", signInMiddleWare, signIn);

router.post("/login", loginMiddleWare, logIn);

module.exports = router;
