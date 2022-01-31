import express from 'express'
<<<<<<< HEAD
import userRoutes from "./api/userRoutes.js"

const routes = express.Router()



import welcomeRoutes from "./api/welcomeRoutes.js"
import articleRoutes from "./api/articleRoutes.js"

import queriesRoutes from "./api/queriesRoutes.js"

routes.use('/', welcomeRoutes)
routes.use('/articles', articleRoutes)
routes.use('/queries', queriesRoutes)
routes.use('/user', userRoutes)
=======
import welcomeRoutes from "./api/welcomeRoutes.js"
import articleRoutes from "./api/articleRoutes.js"


const routes = express.Router()

routes.use('/', welcomeRoutes)
routes.use('/articles', articleRoutes)

>>>>>>> c15a8f6 (Ft articles crud api #15 (#2))

export default routes