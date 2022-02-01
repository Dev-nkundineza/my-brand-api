import { CommentServices } from "../services/commentService.js ";
export class CommentsController {
    async getComments(req, res, next) {
        try {
            const comments = await new CommentServices().getAllComments(
                req.params.articleId
            );
            res.status(200).json({
                status: 200,
                message: "these are all of the comments",
                data: comments,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async addComment(req, res, next) {
        try {
            const data = {
                articleId: req.params.articleId,
                name: req.body.name,
                comment: req.body.comment,
            };

            const _addedComment = await new CommentServices()._addComment(data);
            res.status(200).json({
                status: 200,
                message: "you added this comment",
                comment: _addedComment,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async deleteComment(req, res, next) {
        try {
            await new CommentServices()._deleteComment(req.params.id);
            res
                .json({
                    status: 204,
                    message: "comment deleted successfully",

                });
        } catch (error) {
            console.log(error);
        }
    }
}