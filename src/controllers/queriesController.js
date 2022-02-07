import { QueryServices } from "../services/queryServices.js";
export class QueryController {
    // CREATE ARTICLE

    async sendQuery(req, res, next) {
        try {
            if (!req.body.location) {
                req.body.location = "unknown";
            }
            const data = {
                name: req.body.name,
                email: req.body.email,
                message: req.body.message,
                location: req.body.location,
            };
            console.log(data);
            const _Sentquery = await new QueryServices().sendQuery(data);

            res.status(200).json({
                status: 200,
                message: "you successful send query",
                data: _Sentquery,
            });
        } catch (error) {
            console.log(error);
        }
    }

    // GET ALL ARTICLES
    async getAllQueries(req, res, next) {
        try {
            const allArticles = await new QueryServices().getAllQuery();
            res.status(200).json({
                status: 200,
                message: "these are all queries sent",
                data: allArticles,
            });
        } catch (error) {
            console.log(error);
        }
    }

    // DELETE A QUERY

    async deleteQuery(req, res, next) {
        try {
            await new QueryServices().deleteQuery(req.params.id);
            res.json({ status: 204, message: "deleted successfully..........." });
        } catch (error) {
            console.log(error);
        }
    }
}