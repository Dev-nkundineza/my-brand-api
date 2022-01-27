import { CommentServices } from '../services/commentService.js '
export class CommentsController {

    async getComments(req, res, next) {
        const comments = await new CommentServices().getAllComments()
        res.status(200).json({ status: 200, message: "these are all of the comments", data: comments })
    }

    async addComment(req, res, next) {

        const data = {
            "name": req.body.name,
            "comment": req.body.comment
        }

        const _addedComment = await new CommentServices()._addComment(data)
        res.status(200).json({ status: 200, message: "you added this comment", comment: _addedComment })
    }

    async deleteComment(req, res, next) {
        await new CommentServices()._deleteComment(req.params.id)
        res.status(204)
        res.send()
    }
}