import { QueryServices } from "../services/queryServices.js"
export class QueryController {

    // CREATE ARTICLE

    async sendQuery(req, res, next) {
        const data = {
            "name": req.body.name,
            "email": req.body.email,
            "message": req.body.message

        }
        console.log(data);
        const _Sentquery = await new QueryServices().sendQuery(data);

        res.status(200).json({
                status: 200,
                message: "you successful send post",
                data: _Sentquery
            })
            // return article
    }

    // GET ALL ARTICLES
    async getAllQueries(req, res, next) {
        const allArticles = await new QueryServices().getAllQuery();
        res.status(200).json({ status: 200, message: "these are all queries sent", data: allArticles })
    }

    // DELETE A QUERY

    async deleteQuery(req, res, next) {
        await new QueryServices().deleteQuery(req.params.id);
        res.status(204)
        res.send()
    }
}