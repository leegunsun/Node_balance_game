const GamesRepository = require("../repositories/games.repository");
const Boom = require("boom");

class GamesService {
  constructor() {
    this.gamesRepository = new GamesRepository();
  }

  findAllGames = async () => {
    try {
      const findAllGames = await this.gamesRepository.findAllGames();

      return findAllGames;
    } catch (error) {
      throw Boom.preconditionFailed("게임목록 조회에 실패하였습니다.");
    }
  };

  findOneGame = async (gameId) => {
    try {
      const findOneGame = await this.gamesRepository.findOneRenameGame(gameId);

      return findOneGame;
    } catch (error) {
      throw Boom.preconditionFailed("게임목록 조회에 실패하였습니다.");
    }
  };

  postGame = async (title, optionA, optionB, UserId) => {
    if (!title && !optionA && !optionB) {
      throw Boom.preconditionFailed("데이터 형식이 올바르지 않습니다.");
    }

    if (!title) {
      throw Boom.preconditionFailed("게임 제목의 형식이 일치하지 않습니다.");
    } else if (!optionA || !optionB) {
      throw Boom.preconditionFailed("게임 내용의 형식이 일치하지 않습니다.");
    }

    const createGame = await this.gamesRepository.createGame(
      title,
      optionA,
      optionB,
      UserId
    );

    return createGame;
  };

  updateOption = async (gameId, optionA, optionB) => {
    const update = await this.gamesRepository.updateOption(
      gameId,
      optionA,
      optionB
    );

    return update;
  };

  deleteOneGame = async (gameId, userId) => {
    const game = await this.gamesRepository.findOneGame(gameId);

    if (!game) {
      throw Boom.preconditionFailed("게임이 존재하지 않습니다.");
    }

    if (game.UserId == userId) {
      try {
        const deleteOne = await this.gamesRepository.deleteOneGame(gameId);
        const message = "게임을 삭제하였습니다";
        deleteOne;
        return message;
      } catch (error) {
        throw Boom.preconditionFailed("게임이 정상적으로 삭제되지 않았습니다.");
      }
    } else {
      throw Boom.preconditionFailed("게임의 삭제 권한이 존재하지 않습니다.");
    }
  };
}

module.exports = GamesService;
