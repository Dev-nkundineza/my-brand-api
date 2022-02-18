import joi from "joi";

export const commentSchema = joi.object({
    name: joi.string().required().max(60).empty().messages({
        "string.base": "name must be valid",
        "string.empty": "name is not allowed to be empty",
        "string.max": "name exceeds 60 characters",
        "any.required": "name is required",
    }),

    comment: joi.string().required().max(500).empty().messages({
        "string.base": "name must be valid",
        "string.empty": "name is not allowed to be empty",
        "string.max": "name exceeds 60 characters",
        "any.required": "name is required",
    }),


});