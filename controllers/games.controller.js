const GamesService = require("../services/games.service");
// const CustomLogger = require("../config/custom_winston");

const bodySchema = Joi.object({
  titleSchema: Joi.string().max(10).min(1),
  optionASchema: Joi.string().max(25).min(1),
  optionBSchema: Joi.string().max(25).min(1),
})

const Joi = require("joi");
const Boom = require("boom");
class GamesController {
  constructor() {
    this.gamesService = new GamesService();
    // this.customLogger = new CustomLogger();
  }

  getGames = async (req, res, next) => {
    const label = "games.controller.js";
    try {
      const findAllGames = await this.gamesService.findAllGames();

      if (findAllGames.length === 0) {
        res.status(200).json({ message: "아직 게임이 등록되지 않았어요." });
      }

      res.status(200).json({ games: findAllGames });
      return;
    } catch (error) {
      if (Boom.isBoom(error)) {
        // this.customLogger.log(
        //   "error",
        //   label,
        //   error.output.payload.message,
        //   error.output.statusCode
        // );
        return res
          .status(error.output.statusCode)
          .json({ errorMessage: error.output.payload.message }); // 에러 메시지를 설정하면 이쪽으로 빠집니다.
      } else {
        // this.customLogger.log("error", label, error.message, error.status);
        res.status(400).json({ errorMessage: "게임이 삭제에 실패하였습니다." });
      }
    }
  };

  getOneGame = async (req, res, next) => {
    const label = "games.controller.js";
    const { gameId } = req.params;

    try {
      const findOneGame = await this.gamesService.findOneGame(gameId);

      return res.status(200).json({ game: findOneGame });
    } catch (error) {
      if (Boom.isBoom(error)) {
        // this.customLogger.log(
        //   "error",
        //   label,
        //   error.output.payload.message,
        //   error.output.statusCode
        // );
        res
          .status(error.output.statusCode)
          .json({ errorMessage: error.output.payload.message }); // 에러 메시지를 설정하면 이쪽으로 빠집니다.
      } else {
        // this.customLogger.log("error", label, error.message, error.status);
        res.status(400).json({ errorMessage: "게임 조회에 실패하였습니다." });
      }
    }
  };

  postGame = async (req, res, next) => {
    const label = "games.controller.js";
    const { title, optionA, optionB } = await bodySchema.validateAsync(req.body) // 추가
    // const { title, optionA, optionB } = req.body;
    // const titleSchema = Joi.string().max(10).min(1);
    // const optionASchema = Joi.string().max(25).min(1);
    // const optionBSchema = Joi.string().max(25).min(1);

    // const { value: validatedTitle } = titleSchema.validate(title);
    // const { value: optionAValidate } = optionASchema.validate(optionA);
    // const { value: optionBValidate } = optionBSchema.validate(optionB);
    const { userId } = res.locals.user;

    try {
      // const postGame = this.gamesService.postGame(
      //   validatedTitle,
      //   optionAValidate,
      //   optionBValidate,
      //   userId
      // );
      const postGame = this.gamesService.postGame(
        title,
        optionA,
        optionB,
        userId
      );

      if (title == false) {
        throw Boom.badRequest("제목 글자 수를 확인해 주세요");
      }

      if (optionA == false) {
        throw Boom.badRequest("옵션A 글자 수를 확인해 주세요");
      }

      if (optionB == false) {
        throw Boom.badRequest("옵션B 글자 수를 확인해 주세요");
      }

      postGame;
      return res.status(201).json({ message: "게임 등록 완료~!!" });
    } catch (error) {
      if (Boom.isBoom(error)) {
        // this.customLogger.log(
        //   "error",
        //   label,
        //   error.output.payload.message,
        //   error.output.statusCode
        // );
        res
          .status(error.output.statusCode)
          .json({ errorMessage: error.output.payload.message }); // 에러 메시지를 설정하면 이쪽으로 빠집니다.
      } else {
        // this.customLogger.log("error", label, error.message, error.status);
        res.status(400).json({ errorMessage: "게임 등록에 실패하였습니다." });
      }
    }
  };

  deleteOneGame = async (req, res, next) => {
    const label = "games.controller.js";
    const { gameId } = req.params;
    const { userId } = res.locals.user;

    try {
      const deleteOne = await this.gamesService.deleteOneGame(gameId, userId);
      deleteOne;
      return res.status(200).json({ message: "게임을 삭제하였습니다." });
    } catch (error) {
      if (Boom.isBoom(error)) {
        // this.customLogger.log(
        //   "error",
        //   label,
        //   error.output.payload.message,
        //   error.output.statusCode
        // );
        res
          .status(error.output.statusCode)
          .json({ errorMessage: error.output.payload.message }); // 에러 메시지를 설정하면 이쪽으로 빠집니다.
      } else {
        // this.customLogger.log("error", label, error.message, error.status);
        res.status(400).json({ errorMessage: "게임이 삭제에 실패하였습니다." });
      }
    }
  };
}

module.exports = GamesController;
