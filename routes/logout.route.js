const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const LogoutController = require("../controllers/logout.controller");
const logoutController = new LogoutController();

router.put("/", authMiddleware, logoutController.updateToken);

module.exports = router;
