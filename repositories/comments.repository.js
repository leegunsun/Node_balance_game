const { Games, Comments } = require("../models");

class CommentsRepository {
  findGameById = async (gameId) => {
    const game = await Games.findByPk(gameId);

    return game;
  };

  createComment = async (gameId, userId, content, option) => {
    await Comments.create({ GameId: gameId, UserId: userId, content, option });
  };

  findCommentById = async (commentId) => {
    const comment = await Comments.findByPk(commentId);

    return comment;
  };

  updateComment = async (commentId, userId, content) => {
    await Comments.update(
      { content },
      { where: { commentId, UserId: userId } }
    );
  };

  deleteComment = async (commentId, userId) => {
    await Comments.destroy({ where: { commentId, UserId: userId } });
  };
}

module.exports = CommentsRepository;
