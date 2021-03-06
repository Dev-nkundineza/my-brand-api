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
            singleArticle.status = data.status ? data.status : singleArticle.status;
            const updatedArticle = await singleArticle.save();
            return updatedArticle;
        }
    }
    async deleteArticle(id) {
        await Article.findByIdAndDelete({ _id: id });
        await comment.deleteMany({ articleId: id });
        return true

    }
}