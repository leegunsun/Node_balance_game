const express = require("express");
const router = express.Router();

const loginRouter = require("./login.route");
const loginRouter = require("./logout.route");
const gamesRouter = require("./games.route");
const commentsRouter = require("./comments.route");
const signupRouter = require("./signup.route");
const likesRouter = require("./likes.route");

router.use("/signup", signupRouter);
router.use("/games", gamesRouter);
router.use("/games/:gameId/comments", commentsRouter);
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);
router.use("/like", likesRouter);

module.exports = router;
