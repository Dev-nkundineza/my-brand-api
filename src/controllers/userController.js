// import { UserServices } from "../services/userServices.js"
import { generateToken } from "../../helpers/jwtFunctions.js"
import { comparePassword, hashPassword } from "../../helpers/passwordSecurity.js"
import { userExist, createUser } from "../services/userServices.js"
import { fileUpload } from "../../helpers/fileUpload.js"


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

    // async _getAllUsers(req, res, next) {
    //     try {
    //         const allUsers = await new UserServices().getUser();
    //         res
    //             .status(200)
    //             .json({ status: 200, message: "you get all users", data: allUsers });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // GET SINGLE USER

    // async _getOneUsers(req, res, next) {
    //     try {
    //         const user = await new UserServices().getOneUser(req.params.id);
    //         res
    //             .status(200)
    //             .json({ status: 200, message: "selected user", data: user });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // update an user

    // async _updateUser(req, res, next) {
    //     try {
    //         const user = await new UserServices().updateProfile(req.params.id);
    //         if (req.body.username) {
    //             user.username = req.body.username;
    //         }
    //         if (req.body.password) {
    //             user.password = req.body.password;
    //         }

    //         res.status(200).json({
    //             status: 200,
    //             message: "profile has been updated",
    //             data: user,
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // // DELETE USER

    // async _deleteUser(req, res, next) {

    //     await new UserServices().deleteUser(req.params.id)
    //     res.status(200).json({
    //         status: 200,
    //         message: `user ${req.params.id} has been deleted`,
    //     })

    // }
}