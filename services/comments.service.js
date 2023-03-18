const CommentsRepository = require("../repositories/comments.repository");

class CommentsService {
  commentsRepository = new CommentsRepository();

  createComment = async (gameId, userId, content, option) => {
    const findGame = await this.commentsRepository.findGameById(gameId);
    if (!findGame) throw new Error("게임이 존재하지 않습니다.");

    await this.commentsRepository.createComment(
      gameId,
      userId,
      content,
      option
    );
  };

  updateComment = async (commentId, userId, gameId, content) => {
    const findGame = await this.commentsRepository.findGameById(gameId);
    const findComment = await this.commentsRepository.findCommentById(
      commentId
    );
    if (!findGame) throw new Error("게임이 존재하지 않습니다.");
    if (!findComment) throw new Error("댓글이 존재하지 않습니다.");
    if (findComment.UserId != userId)
      throw new Error("댓글의 수정 권한이 존재하지 않습니다.");

    await this.commentsRepository.updateComment(commentId, userId, content);
  };

  deleteOneComment = async (commentId, userId, gameId) => {
    const findGame = await this.commentsRepository.findGameById(gameId);
    const findComment = await this.commentsRepository.findCommentById(
      commentId
    );
    if (!findGame) throw new Error("게시글이 존재하지 않습니다.");
    if (!findComment) throw new Error("댓글이 존재하지 않습니다.");
    if (findComment.UserId !== userId)
      throw new Error("댓글의 수정 권한이 존재하지 않습니다.");

    await this.commentsRepository.deleteComment(commentId, userId);
  };
}

module.exports = CommentsService;
