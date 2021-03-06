import { CommentServices } from "../services/commentService.js";
export class CommentsController {
    async getComments(req, res, next) {
        try {
            const comments = await new CommentServices().getAllComments(
                req.params.articleId
            );
            if (!req.params.articleId) {
                res.status(404).json({ message: "ARTICLE NOT FOUND" })
            } else {
                res.status(200).json({
                    status: 200,
                    message: "these are all of the comments retrieved",
                    data: comments,
                });
            }

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

            const _addedComment = await new CommentServices().addComments(data, req.params.id);
            res.status(201).json({
                status: 201,
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
            res.json({
                status: 204,
                message: "comment deleted successfully",
            });
        } catch (error) {
            res.status(500).json({ status: 500, message: "internal server error" })
        }
    }
}