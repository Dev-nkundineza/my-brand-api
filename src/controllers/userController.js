// import { UserServices } from "../services/userServices.js"
import { generateToken } from "../helpers/jwtFunctions.js"
import { comparePassword, hashPassword } from "../helpers/passwordSecurity.js"
import { userExist, createUser, updateUser, allUsers, getUser, deleteUser } from "../services/userServices.js"
import { fileUpload } from "../helpers/fileUpload.js"


export class userController {
    async createProfile(req, res, next) {

            try {

                const exist = await userExist(req.body.email)
                if (exist) {
                    res.status(409).json({
                        status: 409,
                        message: `this email ${req.body.email} exists`
                    })
                } else {
                    if (req.file) {
                        req.body.picture = await fileUpload(req)
                    } else {
                        req.body.picture = 'https://www.kindpng.com/imgv/iThJmoo_white-gray-circle-avatar-png-transparent-png/'
                    }

                    const user = {
                        username: req.body.username,
                        email: req.body.email,
                        password: await hashPassword(req.body.password),
                        picture: req.body.picture,
                    }

                    const createdUser = await createUser(user)
                    res.status(201).json({ status: 201, message: "user registered successfully", user: createdUser })
                }

            } catch (error) {
                console.log(error);
            }

        }
        //get all users


    async getAlluser(req, res, next) {
            try {
                const foundUsers = await allUsers()
                if (foundUsers) {
                    res.status(200).json({
                        status: 200,
                        message: "users retrieved successfully!",
                        data: foundUsers
                    })
                }
            } catch (error) {
                res.status(500).json({ error: "server error" })
            }
        }
        //get single user
    async getOneUser(req, res, next) {
        try {
            const user = await getUser(req.params.id)
            if (user) {
                res.status(200).json({
                    status: 200,
                    message: "users retrieved successfully!",
                    data: user
                })
            }
        } catch (error) {
            res.status(500).json({ error: "server error" })
        }
    }

    //update profile
    async updateProfile(req, res, next) {

            try {
                if (req.file) {
                    req.body.picture = await fileUpload(req);
                }
                const getUser = await updateUser(
                    req.params.id, req.body
                );
                if (!getUser) {
                    res.status(404).json({ status: 404, message: "user not found" })
                } else {
                    res.status(200).json({
                        status: 200,
                        message: "user profile updated successfully",
                        data: getUser
                    });
                }


            } catch (error) {
                console.log(error)
            }
        }
        // login function

    async login(req, res, next) {
        try {
            const exists = await userExist(req.body.email)
            if (exists) {
                const valid = await comparePassword(req.body.password, exists.password)
                if (!valid) {
                    res.status(403).json({ status: 403, message: "invalid credentials" })
                }
                const token = await generateToken({ id: exists._id })
                res.status(200).json({ status: 200, message: "successfully logged in", accessToken: token })
            } else {
                res.status(403).json({ status: 403, message: "invalid credentials" })
            }
        } catch (error) {
            res.status(500).json({ message: "Internal server error!" })
        }

    }


    async deleteUser(req, res, next) {
        try {
            const getUserDeleted = await deleteUser(req.params.id)
            if (!getUserDeleted) {
                res.status(404).json({ error: "no user found" })
            } else {
                res.json({ status: 204, message: "user deleted successfully" })
            }
        } catch (error) {
            console.log(error);
        }
    }
}