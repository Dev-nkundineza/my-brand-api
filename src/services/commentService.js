import comment from "../models/comment.js";

export class CommentServices {

    async getAllComments(id) {

        try {
            const comments = await comment.find({ articleId:id })
            return comments;
        } catch (error) {
            console.log(error);
        }
    }

    async _addComment(data) {
        try {
            const _dataToSave = await comment(data)
            _dataToSave.save()
            return _dataToSave
        } catch (error) {
            console.log(error);
        }
    }

    async _deleteComment(id) {
        try {
            await comment.deleteOne({ _id: id })
        } catch (error) {
            console.log(error);
        }
    }
}