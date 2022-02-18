import Query from "../models/query.js";
export class QueryServices {
    async sendQuery(data) {
        try {
            const query = await Query(data);
            query.save();
            return query;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllQuery() {
        try {
            const query = await Query.find();
            return query;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteQuery(id) {
        try {
            await Query.deleteOne({ _id: id });
        } catch (error) {
            console.log(error);
        }
    }
}