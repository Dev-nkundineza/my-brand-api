import express from "express"
import { CommentsController } from '../../controllers/commentsController.js'
const route = express.Router()

const commentControllers = new CommentsController()

route.get('/', commentControllers.getComments)
route.post('/', commentControllers.addComment)
route.delete('/:id', commentControllers.deleteComment)


export default route