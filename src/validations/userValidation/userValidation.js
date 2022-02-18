import { userSchema } from "./user.schema.js";
export const userValidation = async(req, res, next) => {
    const validate = await userSchema.validate(req.body);


    if (!validate || validate.hasOwnProperty("error")) {

        return res.json({ error: validate.error.details[0].message });
    } else {
        next();
    }


};