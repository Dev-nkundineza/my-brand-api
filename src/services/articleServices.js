import Article from "../models/article.js";
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
    async updateArticle(id) {
        const singleArticle = await Article.findOne({ _id: id });
        return singleArticle;
    }
    async deleteArticle(id) {
        await Article.deleteOne({ _id: id });
    }
}