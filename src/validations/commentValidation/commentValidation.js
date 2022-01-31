import { commentSchema } from "./comment.schema";
export const commentValidation = async(req, res, next) => {

    const value = await commentSchema.validate(req.body);

    if (value) {
        res.json({
            error: 1,
            message: value.error.details[0].message
        })
    } else {
        next();
    }

}