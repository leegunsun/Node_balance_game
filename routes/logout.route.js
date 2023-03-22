const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const LogoutController = require("../controllers/comments.controller");
const logoutController = new LogoutController();

router.post("/", authMiddleware, logoutController.deleteToken);

module.exports = router;

