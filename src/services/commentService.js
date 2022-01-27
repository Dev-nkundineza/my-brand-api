import comment from "../models/comment.js";

export class CommentServices {

    async getAllComments() {
        const comments = await comment.find()
        return comments;
    }

    async _addComment(data) {
        const _dataToSave = await comment(data)
        _dataToSave.save()
        return _dataToSave
    }

    async _deleteComment(id) {
        await comment.deleteOne({ _id: id })
    }
}