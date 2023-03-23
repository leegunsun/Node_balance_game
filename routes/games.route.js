const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

const GamesController = require("../controllers/games.controller");
const gamesController = new GamesController();

//authMiddleware 장착해야함
router.get("/", gamesController.getGames);
router.get("/:gameId", gamesController.getOneGame);

router.post("/", authMiddleware, gamesController.postGame);

router.put("/:gameId", authMiddleware, gamesController.updateOption);

router.delete("/:gameId", authMiddleware, gamesController.deleteOneGame);

module.exports = router;
