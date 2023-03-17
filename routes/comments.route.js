const express = require("express");
const router = express.Router({mergeParams: true});
const authMiddleware = require("../middlewares/auth-middleware");

const CommentsController = require("../controllers/comments.controller");
const commentsController = new CommentsController();


// 게임에 댓글 등록
router.post(
  "/",
  authMiddleware,
  commentsController.createComment
);

// 게임에 댓글 수정
router.put(
  "/:commentId",
  authMiddleware,
  commentsController.updateComment
);

// 게임에 댓글 삭제
router.delete(
  "/:commentId",
  authMiddleware,
  commentsController.deleteOneComment
);

module.exports = router;
