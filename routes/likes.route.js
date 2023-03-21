const express = require("express");
const router = express.Router();

const LikesController = require("../controllers/likes.controller");
const likesController = new LikesController();

router.use("/", likesController);

module.exports = router;
