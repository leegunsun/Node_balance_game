const GamesService = require("../services/games.service");
// const CustomLogger = require("../config/custom_winston");

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
  try {
    const label = "games.controller.js";
    const { title, optionA, optionB } = req.body;
    const Joi = require('joi');

    const messages = {
      'string.base': '이 필드는 문자열로 이루어져야 합니다.',
      'string.empty': '이 필드는 비어 있을 수 없습니다.',
      'string.min': '이 필드는 최소 {{#limit}} 문자 이상이어야 합니다.',
      'string.max': '이 필드는 최대 {{#limit}} 문자 이하여야 합니다.',
      'any.required': '이 필드는 필수입니다.',
    };
    
    const schema = Joi.object({
      title: Joi.string().min(1).max(10).messages({
        ...messages,
        'string.min': '제목은 최소 {{#limit}} 문자 이상이어야 합니다.',
        'string.max': '제목은 최대 {{#limit}} 문자 이하여야 합니다.'
      }),
      optionA: Joi.string().min(1).max(25).messages({
        ...messages,
        'string.min': 'optionA는 최소 {{#limit}} 문자 이상이어야 합니다.',
        'string.max': 'optionA는 {{#limit}} 문자 이하여야 합니다.'
      }),
      optionB: Joi.string().min(1).max(25).messages({
        ...messages,
        'string.min': 'optionA는 최소 {{#limit}} 문자 이상이어야 합니다.',
        'string.max': 'optionB는 최대 {{#limit}} 문자 이하여야 합니다.'
      }),
    });

    const validate = schema.validate({title: title, optionA: optionA, optionB: optionB}, { abortEarly: false });

    if (validate.error) {
      throw Boom.badRequest(validate.error.message);
    } else {
      console.log('Valid input!');
    }

    const { userId } = res.locals.user;

    const postGame = await this.gamesService.postGame(
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
      res.status(400).json({ errorMessage: "게임 등록에 실패하였습니다." });
    }
  }
  }
    
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
