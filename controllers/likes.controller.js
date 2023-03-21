const LikesService = require("../services/likes.service");

class LikesController {
  constructor() {
    this.likesService = new LikesService();
  }

  addLike = async (req, res, next) => {
    const { GameId } = req.params;

    try {
      const add = await this.likesService.addLike(GameId);
      add;
      res.status(200).json({ message: "좋아요를 추가했습니다." });
    } catch (error) {
      res
        .status(500)
        .json({ errorMessage: "예상치 못한 오류가 발생했습니다." });
    }
  };
}

module.exports = LikesController;
