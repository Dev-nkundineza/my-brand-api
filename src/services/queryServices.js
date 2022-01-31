// import the model you need to access

import Query from '../models/query.js'
export class QueryServices {
    constructor() {}

    async sendQuery(data) {
        const query = await Query(data)
        query.save()
        return query
    }
    async getAllQuery() {
        const query = await Query.find()
        return query;
    }

    async deleteQuery(id) {

        await Query.deleteOne({ _id: id })
    }
}