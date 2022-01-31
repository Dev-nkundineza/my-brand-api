import express from 'express'
import multer from 'multer'
import { fileFilter } from '../../../helpers/fileFilter.js'

import { userController } from '../../controllers/userController.js'

const userControllels = new userController()
const storage = multer.diskStorage({});
const uploads = multer({ storage, fileFilter })
const route = express.Router()

route.post('/register', uploads.single('picture'), userControllels.createProfile)
route.post('/login', userControllels.login)


export default route