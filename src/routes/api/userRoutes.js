import express from 'express'
import multer from 'multer'
import { fileFilter } from '../../../helpers/fileFilter.js'

import { userController } from '../../controllers/userController.js'

const userControllels = new userController()
const storage = multer.diskStorage({});
const uploads = multer({ storage, fileFilter })
const route = express.Router()

route.post('/register', uploads.single('picture'), userControllels.createProfile)
    // route.get('/', userControllels._getAllUsers)
    // route.get('/:id', userControllels._getOneUsers)
    // route.patch('/:id', userControllels._updateUser)
    // route.delete('/:id', userControllels._deleteUser)

export default route