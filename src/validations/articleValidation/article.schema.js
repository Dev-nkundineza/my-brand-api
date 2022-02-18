import joi from 'joi'

export const articleSchema = joi.object({
    title: joi.string().max(1000).required().empty().messages({
        "string.base": "title must be valid",
        "string.empty": "title is not allowed to be empty",
        "string.max": "title is too long ",
        "any.required": "title is required",
    }),

    content: joi.string().required().empty().messages({
        "string.base": "content must be valid",
        "string.empty": "content is not allowed to be empty",
        "any.required": "content is required",
    }),


    author: joi.string().required().empty().messages({
        "string.base": "author must be valid",
        "string.empty": "author is not allowed to be empty",
        "any.required": "author is required",
    }),


})