const express = require("express");
const router = express.Router();

const GamesController = require("../controllers/games.controller");
const gamesController = new GamesController();

//authMiddleware 장착해야함
router.get("/", gamesController.getGames);
router.get("/:gameId", gamesController.getOneGame);

router.post("/", gamesController.postGame);

router.delete("/:gameId", gamesController.deleteOneGame);

module.exports = router;
