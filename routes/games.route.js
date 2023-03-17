const express = require("express");
const router = express.Router();

const GamesController = require("../controllers/games.controller");
const gamesController = new GamesController();

//authMiddleware 장착해야함
router.get("/", gamesController.getGames);
router.post("/", gamesController.postGames);

module.exports = router;
