const { Comments, Games } = require("../models");

class GamesRepository {
  // 식별자 Games가 Model과 같은지 확인해 봐야함
  findAllGames = async () => {
    const findAllGames = await Games.findAll();
    const rename = await Promise.all(
      findAllGames.map(async (ele) => {
        // 식별자 Comment가 Model과 같은지 확인해 봐야함
        const optionA = await Comments.findAll({ where: { option: "A" } });
        const optionB = await Comments.findAll({ where: { option: "B" } });
        return {
          postId: ele.postId,
          title: ele.title,
          optionA: optionA.length ? optionA : [],
          optionB: optionB.length ? optionB : [],
          userId: ele.userId,
          createdAt: ele.createdAt,
        };
      })
    );

    return rename;
  };
}

module.exports = GamesRepository;
