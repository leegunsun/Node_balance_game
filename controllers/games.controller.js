const GamesService = require("../services/games.service");
const Boom = require("boom");
const CustomLogger = require("../config/custom_winston");
class GamesController {
  constructor() {
    this.gamesService = new GamesService();
    this.customLogger = new CustomLogger();
  }

  getGames = async (req, res, next) => {
    const label = "games.controller.js";
    try {
      const findAllGames = await this.gamesService.findAllGames();
      console.log(findAllGames);

      if (findAllGames.length === 0) {
        res.status(200).json({ message: "아직 게임이 등록되지 않았어요." });
      }

      res.status(200).json({ games: findAllGames });
      return;
    } catch (error) {
      if (Boom.isBoom(error)) {
        this.customLogger.log(
          "error",
          label,
          error.output.payload.message,
          error.output.statusCode
        );
        return res
          .status(error.output.statusCode)
          .json({ errorMessage: error.output.payload.message }); // 에러 메시지를 설정하면 이쪽으로 빠집니다.
      } else {
        this.customLogger.log("error", label, error.message, error.status);
        res.status(400).json({ errorMessage: "게임이 삭제에 실패하였습니다." });
      }
    }
  };

  getOneGame = async (req, res, next) => {
    const { gameId } = req.params;

    try {
      const findOneGame = await this.gamesService.findOneGame(gameId);

      return res.status(200).json({ game: findOneGame });
    } catch (error) {
      if (Boom.isBoom(error)) {
        res
          .status(error.output.statusCode)
          .json({ errorMessage: error.output.payload.message }); // 에러 메시지를 설정하면 이쪽으로 빠집니다.
      } else {
        console.log(`message : ${error.message}`);
        console.log(`statusCode : ${error.output.statusCode}`);
        res.status(400).json({ errorMessage: "게임 조회에 실패하였습니다." });
      }
    }
  };

  postGame = async (req, res, next) => {
    const { title, optionA, optionB } = req.body;
    const { userId } = res.locals.user;

    try {
      const postGame = this.gamesService.postGame(
        title,
        optionA,
        optionB,
        userId
      );
      postGame;
      return res.status(201).json({ message: "게임 등록 완료~!!" });
    } catch (error) {
      if (Boom.isBoom(error)) {
        res
          .status(error.output.statusCode)
          .json({ errorMessage: error.output.payload.message }); // 에러 메시지를 설정하면 이쪽으로 빠집니다.
      } else {
        console.log(`message : ${error.output.payload.message}`);
        console.log(`statusCode : ${error.output.statusCode}`);
        res.status(400).json({ errorMessage: "게임 등록에 실패하였습니다." });
      }
    }
  };

  deleteOneGame = async (req, res, next) => {
    const { gameId } = req.params;
    const { userId } = res.locals.user;

    try {
      const deleteOne = await this.gamesService.deleteOneGame(gameId, userId);
      deleteOne;
      return res.status(200).json({ message: "게임을 삭제하였습니다." });
    } catch (error) {
      if (Boom.isBoom(error)) {
        res
          .status(error.output.statusCode)
          .json({ errorMessage: error.output.payload.message }); // 에러 메시지를 설정하면 이쪽으로 빠집니다.
      } else {
        console.log(`message : ${error.output.payload.message}`);
        console.log(`statusCode : ${error.output.statusCode}`);
        res.status(400).json({ errorMessage: "게임이 삭제에 실패하였습니다." });
      }
    }
  };
}

module.exports = GamesController;
