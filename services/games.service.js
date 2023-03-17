const GamesRepository = require("../repositories/games.repository");

class GamesService {
  constructor() {
    this.gamesRepository = new GamesRepository();
  }

  findAllGames = async () => {
    try {
      const findAllGames = await this.gamesRepository.findAllGames();

      return findAllGames;
    } catch (error) {
      error = new Error("게임목록 조회에 실패하였습니다.");
      error.status = 400;
      throw error;
    }
  };

  findOneGames = async (gameId) => {
    try {
      const findOneGame = await this.gamesRepository.findOneGame(gameId);

      return findOneGame;
    } catch (error) {
      error = new Error("게임목록 조회에 실패하였습니다.");
      error.status = 400;
      throw error;
    }
  };

  postGame = async (title, optionA, optionB, UserId) => {
    if (!title && !optionA && !optionB) {
      error = new Error("데이터 형식이 올바르지 않습니다.");
      error.status = 400;
      throw error;
    }

    if (!title) {
      throw Boom.preconditionFailed("게시글 제목의 형식이 일치하지 않습니다.");
    } else if (!optionA || !optionB) {
      throw Boom.preconditionFailed("게시글 내용의 형식이 일치하지 않습니다.");
    }

    const createGame = await this.gamesRepository.createGame(
      title,
      optionA,
      optionB,
      UserId
    );

    return createGame;
  };
}

module.exports = GamesService;
