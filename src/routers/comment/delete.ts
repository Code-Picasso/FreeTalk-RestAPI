import { Router, Response, Request, NextFunction } from "express";
import Post from "src/models/post";
import Comment from "src/models/comment";

const router = Router();

router.delete(
  "./api/comment/:commentIddelete/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId, commentId } = req.params;

    if (!postId || !commentId) {
      const error = new Error(
        "Post id is and comment id is required"
      ) as CustomError;
      error.status = 400;
      next(error);
    }

    try {
      await Comment.findOneAndRemove({ _id: commentId });
    } catch (err) {
      next(new Error("comment cannot be updated"));
    }

    await Post.findOneAndUpdate(
      { _id: postId },
      { $pull: { comments: commentId } }
    );
    res.status(200).json({ success: true });
  }
);

export { router as deleteCommentRouter };
