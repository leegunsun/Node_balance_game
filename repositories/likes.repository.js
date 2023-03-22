const { Likes } = require("../models");

class LikesRepository {
  addLike = async (GameId, option) => {
    const addLike = await Likes.create({ GameId: GameId, option: option });

    return addLike;
  };
}

module.exports = LikesRepository;
