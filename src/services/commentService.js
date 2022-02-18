import comment from "../models/comment.js";
import Article from "../models/article.js";

export class CommentServices {
    async getAllComments(id) {
        try {
            const comments = await comment.find({ articleId: id });
            return comments;
        } catch (error) {
            console.log(error);
        }
    }

    async addComments(data, articleId) {
        try {

            const getArticle = await Article.findOne(articleId)
            if (getArticle) {
                const dataToSave = await comment(data);
                dataToSave.save();
                return dataToSave;
            } else {
                return false;
            }

        } catch (error) {
            console.log(error);
        }
    }

    async _deleteComment(id) {
        try {
            const getComment = await comment.findByIdAndDelete(id);
            if (!getComment) {
                return `the comment you want to delete doesn't exist `;
            } else {
                return `comment deleted successfully`
            }
        } catch (error) {
            return `the comment you want to delete doesn't exist `;
        }
    }
}