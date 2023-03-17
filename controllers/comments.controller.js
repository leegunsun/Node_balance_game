const CommentsService = require("../services/comments.service");

class CommentsController {
    commentsService = new CommentsService();

    createComment = async (req,res, next) => {
        try {
            const { gameId } = req.params;
            // const { userId } = res.locals.user;
            const { content, part, userId } = req.body; // 나중에 유저아이디 삭제하기
            if (!gameId || !userId || !comment || !part) {
                throw new InvalidParamsError();
              }
            await this.commentsService.createComment(gameId, userId, content, part);
            res.status(201).json({ message: "댓글을 작성하였습니다." });
        } catch (error) {
            next(error);
        }
    }

    updateComment = async (req, res, next) => {
        try {
            const { content, userId } = req.body;  // 나중에 유저아이디 삭제하기
            // const { userId } = res.locals.user;
            const { gameId, commentId } = req.params;
            if (!gameId || !userId || !content || !commentId) {
                throw new InvalidParamsError();
              }
            await this.commentsService.updateComment(commentId, userId, gameId, content);
            res.status(200).json({message: "댓글을 수정하였습니다."});
        } catch (error) {
            next(error);
        }
    }

    deleteOneComment = async (req, res, next) => {
        try {
            const { userId } = req.body // 나중에 유저아이디 삭제하기
            // const { userId } = res.locals.user;
            const { gameId, commentId } = req.params;
            if (!gameId || !userId || !commentId) {
                throw new InvalidParamsError();
              }
            await this.commentsService.deleteOneComment(commentId, userId, gameId);
            res.status(200).json({message: "댓글을 삭제하였습니다."});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = CommentsController;