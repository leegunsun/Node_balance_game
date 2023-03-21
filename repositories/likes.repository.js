const { Likes } = require("../models");

class LikesRepository {
  addLike = async (GameId) => {
    const addLike = await Likes.create({ GameId: GameId });

    return addLike;
  };
}

module.exports = LikesRepository;
