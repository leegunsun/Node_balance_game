const express = require("express");
const router = express.Router();

const loginRouter = require("./login.route");
const gamesRouter = require("./games.route");
const commentsRouter = require("./comments.route");
const signupRouter = require("./signup.route");

router.use("/signup", signupRouter);
router.use("/games", gamesRouter);
router.use("/games/:gameId/comments", commentsRouter);
router.use("/login", loginRouter);

module.exports = router;
