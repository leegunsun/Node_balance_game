const express = require("express");

const SignupController = require("../controllers/signup.controller");
const signupController = new SignupController();

const router = express.Router();

router.post("/", signupController.createUser);

module.exports = router;
