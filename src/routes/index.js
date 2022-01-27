import express from 'express'

import commentRoute from "./api/commentRoute.js"


const routes = express.Router()

routes.use('/comment', commentRoute)


export default routes