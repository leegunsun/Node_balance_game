const GamesService = require("../services/games.service");

class GamesController {
  constructor() {
    this.gamesService = new GamesService();
  }

  getGames = async (req, res, next) => {
    try {
      const findAllGames = await this.gamesService.findAllGames();
      return res.status(200).json({ games: findAllGames });
    } catch (error) {
      return res
        .status(400)
        .json({ errorMessage: "게임목록 조회에 실패하였습니다." });
    }
  };

  postGames = async (req, res, next) => {
    const { title } = body.req;
    const { userId } = res.locals.user;

    try {
      const postGame = this.gamesService.postGame();
    } catch (error) {}
  };
}

module.exports = GamesController;
