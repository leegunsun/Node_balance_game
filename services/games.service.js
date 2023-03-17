const GamesRepository = require("../repositories/games.repository");

class GamesService {
  constructor() {
    this.gamesRepository = new GamesRepository();
  }

  findAllGames = async () => {
    const findAllGames = await this.gamesRepository.findAllGames();

    return findAllGames;
  };
}

module.exports = GamesService;
