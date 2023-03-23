const { Comments, Games, Likes } = require("../models");
const { Op } = require("sequelize");

class GamesRepository {
  // 식별자 Games가 Model과 같은지 확인해 봐야함

  findAllGames = async () => {
    const findAllGames = await Games.findAll({
      attributes: [
        "gameId",
        "title",
        "optionA",
        "optionB",
        "UserId",
        "createdAt",
      ],
    });

    return findAllGames;
  };

  findOneGame = async (gameId) => {
    const findOne = await Games.findOne({ where: { gameId: gameId } });

    return findOne;
  };

  findOneRenameGame = async (gameId) => {
    const findOneGames = await Games.findAll({ where: { gameId: gameId } });
    const comments = await Comments.findAll({
      where: { gameId: gameId },
    });
    const likesA = await Likes.findAll({
      where: { [Op.and]: [{ GameId: gameId }, { option: "A" }] },
    });
    const likesB = await Likes.findAll({
      where: { [Op.and]: [{ GameId: gameId }, { option: "B" }] },
    });

    // console.log(findOneGames);
    const rename = await Promise.all(
      findOneGames.map(async (ele) => {
        return {
          gameId: ele.gameId,
          title: ele.title,
          optionA: ele.optionA,
          optionB: ele.optionB,
          comments: comments.length ? comments : [],
          likesA: likesA.length ? likesA.length : 0,
          likesB: likesB.length ? likesB.length : 0,
          UserId: ele.UserId,
          createdAt: ele.createdAt,
          updatedAt: ele.updatedAt,
        };
      })
    );

    return rename;
  };

  createGame = async (title, optionA, optionB, UserId) => {
    const createGame = await Games.create({ title, optionA, optionB, UserId });

    return createGame;
  };

  updateOption = async (gameId, optionA, optionB) => {
    const updateGame = await Games.update(
      { optionA: optionA, optionB: optionB },
      { where: { gameId: gameId } }
    );

    return updateGame;
  };

  deleteOneGame = async (gameId) => {
    const findOne = await Games.findOne({ where: { gameId: gameId } });
    await findOne.destroy();
    return;
  };
}

module.exports = GamesRepository;
