const LikesRepository = require("../repositories/likes.repository");

class LikesService {
  constructor() {
    this.likesRepository = new LikesRepository();
  }

  addLike = async (GameId) => {
    const addLike = await this.likesRepository.addLike(GameId);

    return addLike;
  };
}

module.exports = LikesService;
