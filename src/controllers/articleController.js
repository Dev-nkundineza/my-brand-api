import { ArticleServices } from "../services/articleServices.js";
import cloudinary from "../helpers/imageUpload.js";
import { fileUpload } from "../helpers/fileUpload.js";
import "dotenv/config";

export class ArticleController {
    // CREATE ARTICLE

    async createArticle(req, res, next) {
        try {
            if (req.file) {
                req.body.image = await fileUpload(req);

            } else {
                req.body.image =
                    "https://www.kindpng.com/imgv/iThJmoo_white-gray-circle-avatar-png-transparent-png/";
            }

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

            if (allArticles) {
                res.status(200).json({
                    status: 200,
                    message: "you are getting one post",
                    data: allArticles,
                });
            } else {
                res.status(404).json({ status: 404, message: "post not found " });
            }

        } catch (error) {
            console.log(error);
        }
    }

    // UPDATING POST
    async updateArticle(req, res, next) {
        try {
            if (req.file) {
                req.body.image = await fileUpload(req);
            }

            const allArticles = await new ArticleServices().updateArticle(
                req.params.id,
                req.body
            );
            if (!allArticles) {
                res
                    .status(404)
                    .json({ status: 404, message: "no such post you want to update" });
            }
            res.status(200).json({
                status: 200,
                message: `you update this article with id:${req.params.id} `,
                data: allArticles,
            });


        } catch (error) {
            console.log(error);
        }
    }

    // DELETE A POST
    async deleteArticle(req, res, next) {
        try {
            const getItemToDelete = await new ArticleServices().deleteArticle(
                req.params.id
            );
            if (!getItemToDelete) {
                res.status(404).json({
                    message: "the article you are trying to delete doesn't exist",
                });
            }
            res.json({ status: 204, message: "deleted successfully" });

            await new ArticleServices().deleteArticle(req.params.id);
            res.status(204).json({ status: 204, message: "deleted successfully" });
        } catch (error) {
            console.log(error);
        }
    }
}