const GamesService = require("../services/games.service");
const Boom = require("boom");

class GamesController {
  constructor() {
    this.gamesService = new GamesService();
  }

  getGames = async (req, res, next) => {
    try {
      const findAllGames = await this.gamesService.findAllGames();
      return res.status(200).json({ games: findAllGames });
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

  getOneGame = async (req, res, next) => {
    const { gameId } = req.body;

    try {
      const findOneGame = await this.gamesService.findOneGame(gameId);

      return res.status(200).json({ game: findOneGame });
    } catch (error) {
      if (Boom.isBoom(error)) {
        res
          .status(error.output.statusCode)
          .json({ errorMessage: error.output.payload.message }); // 에러 메시지를 설정하면 이쪽으로 빠집니다.
      } else {
        console.log(`message : ${error.output.payload.message}`);
        console.log(`statusCode : ${error.output.statusCode}`);
        res.status(400).json({ errorMessage: "게시글 조회에 실패하였습니다." });
      }
    }
  };

  postGame = async (req, res, next) => {
    const { title, optionA, optionB } = body.req;
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
        res.status(400).json({ errorMessage: "게시글 작성에 실패하였습니다." });
      }
    }
  };

  deleteOneGame = async (req, res, next) => {
    const { gameId } = req.body;
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
