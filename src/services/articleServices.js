import Article from "../models/article.js";
import comment from "../models/comment.js";
export class ArticleServices {
    constructor() {}

    async createArticle(data) {
        const article = await Article(data);
        article.save();
        return article;
    }
    async getAllArticles() {
        const article = await Article.find();
        return article;
    }
    async getArticle(id) {
        const singleArticle = await Article.findOne({ _id: id });
        return singleArticle;
    }
    async updateArticle(id, data) {
        const singleArticle = await Article.findOne({ _id: id });
        if (!singleArticle) {
            return false;
        } else {
            singleArticle.title = data.title ? data.title : singleArticle.title;
            singleArticle.content = data.content ?
                data.content :
                singleArticle.content;
            singleArticle.image = data.image ? data.image : singleArticle.image;
            singleArticle.author = data.author ? data.author : singleArticle.author;
            const updatedArticle = await singleArticle.save();
            return updatedArticle;
        }
    }


    async deleteArticle(id) {
        try {
            const result = await Article.findByIdAndDelete(id);
            await comment.deleteMany({ articleId: id });
            // commentTodelete.delete();
            if (!result) {
                return false;
            } else {
                return "article deleted successfully";
            }
        } catch (error) {
            return "the article you are trying to delete doesn't exist";
        }
    }
}