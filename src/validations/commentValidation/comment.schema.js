import joi from "joi"

export const commentSchema = joi.object({
    name: joi.string().required().max(60).empty(),
    message: joi.string().required().max(500).empty(),
})