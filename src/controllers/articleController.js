import { ArticleServices } from "../services/articleServices.js";
import cloudinary from "cloudinary"
import 'dotenv/config'


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_USER_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secrete: process.env.CLOUDINARY_API_SECRET,
});

export class ArticleController {
    // CREATE ARTICLE
    // TODO Don't access database from this file you only needs


    async createArticle(req, res, next) {
        try {
            cloudinary.v2.uploader.upload(req.file.path, async function(err, image) {
                if (err) {
                    console.warn(error);
                }

                req.body.image = image.Url;
                const data = {
                    title: req.body.title,
                    content: req.body.content,
                    image: req.body.image,
                    author: req.body.author,
                };
                const _CreateArticle = await new ArticleServices().createArticle(data);
                res.status(200).json({
                    status: 200,
                    message: "you create a post successfully ",
                    data: _CreateArticle,
                });
            });
        } catch (error) {
            console.log(error);
        }
    }

    // GET ALL ARTICLES
    async getAllArticles(req, res, next) {
        try {
            const allArticles = await new ArticleServices().getAllArticles();
            res.status(200).json({
                status: 200,
                message: "these are all articles",
                data: allArticles,
            });
        } catch (error) {
            console.log(error);
        }
    }

    // GET SINGLE POST
    async getArticle(req, res, next) {
        try {
            const allArticles = await new ArticleServices().getArticle(req.params.id);
            res.status(200).json({
                status: 200,
                message: "you are getting one post",
                data: allArticles,
            });
        } catch (error) {
            console.log(error);
        }
    }

    // UPDATING POST
    async updateArticle(req, res, next) {
        try {
            const allArticles = await new ArticleServices().getArticle(req.params.id);
            if (req.body.title) {
                allArticles.title = req.body.title;
            }
            if (req.body.content) {
                allArticles.content = req.body.content;
            }
            if (req.body.image) {
                allArticles.image = req.body.image;
            }
            if (req.body.author) {
                allArticles.author = req.body.author;
            }
            if (
                req.body.author ||
                req.body.image ||
                req.body.content ||
                req.body.title
            ) {
                allArticles.updatedAt = new Date();
            }
            // if (!req.body.author ||
            //     req.body.image ||
            //     req.body.content ||
            //     req.body.title
            // ) {
            //     res.json({ error: "post can't be created" });
            // }

            res.status(200).json({
                status: 200,
                message: "you are getting one post",
                data: allArticles,
            });
        } catch (error) {
            console.log(error);
        }
    }

    // DELETE A POST
    async deleteArticle(req, res, next) {
        try {
            await new ArticleServices().deleteArticle(req.params.id);
            res.status(204).json({ status: 204, message: "deleted successfully" });
        } catch (error) {
            console.log(error);
        }
    }
}