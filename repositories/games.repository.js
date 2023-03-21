const { Comments, Games } = require("../models");
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
    const commentsA = await Comments.findAll({
      where: { [Op.and]: [{ gameId: gameId }, { option: "A" }] },
    });
    const commentsB = await Comments.findAll({
      where: { [Op.and]: [{ gameId: gameId }, { option: "B" }] },
    });

    // console.log(findOneGames);
    const rename = await Promise.all(
      findOneGames.map(async (ele) => {
        return {
          gameId: ele.gameId,
          title: ele.title,
          optionA: ele.optionA,
          optionB: ele.optionB,
          commentsA: commentsA.length ? commentsA : [],
          commentsB: commentsB.length ? commentsB : [],
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

  deleteOneGame = async (gameId) => {
    const findOne = await Games.findOne({ where: { gameId: gameId } });
    await findOne.destroy();
    return;
  };
}

module.exports = GamesRepository;
