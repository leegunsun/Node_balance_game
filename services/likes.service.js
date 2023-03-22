const LikesRepository = require("../repositories/likes.repository");

class LikesService {
  constructor() {
    this.likesRepository = new LikesRepository();
  }

  addLike = async (GameId, option) => {
    const addLike = await this.likesRepository.addLike(GameId, option);

    return addLike;
  };
}

module.exports = LikesService;
