// validators.js
const Joi = require('joi');

const setTestResultSchema = Joi.object({
    user_id: Joi.string().required(),
    test_type_id: Joi.string().required(),
    paragraph_id: Joi.string().required(),
    wpm: Joi.number().required(),
    accuracy: Joi.number().required(),
    raw: Joi.number().required(),
    characters: Joi.number().integer().required(),
    consistency: Joi.number().required(),
    time: Joi.number().integer().required(),
    demography: Joi.string().max(255).required(),
    created_at: Joi.date().timestamp().optional()  // Optional if not required from client
});


const paragraphSchema = Joi.object({
    contest_id: Joi.string()
        .allow(null) // Allows null or undefined for contest_id
        .optional()
        .messages({
            "string.base": "Contest ID must be a string!",
        }),
    content: Joi.string()
        .required()
        .messages({
            "string.empty": "Content is required!",
            "string.base": "Content must be a string!",
        }),
        difficulty_level: Joi.string()
        .required()
        .messages({
            "string.empty": "Difficulty level is required!",
            "string.base": "Difficulty level must be a string!",
        }),
    typing_duration: Joi.number()
        .optional()
        .messages({
            "number.base": "Typing duration must be a number!",
        }),
});



const setTestTypeSchema = Joi.object({
    name: Joi.string().max(200).required(),
    description: Joi.string().max(500).required(),
    created_at: Joi.date().timestamp().optional()  // Optional if not required from client
});



const addModuleSchema = Joi.object({
    name: Joi.string()
    .max(200)
    .required()
    .messages({
      "string.empty": "Module name is required!",
      "string.base" : "Module must be a string",
      "any.required": "Module name is required!"
    }),
  description: Joi.string()
    .max(500)
    .required()
    .messages({
      "string.empty": "Module description is required!",
      "string.base" : "Content must be a string",
      "any.required": "Module description is required!"
    }),
});


const addPermissionSchema = Joi.object({
    name: Joi.string().max(200).required({
         "string.empty": "Permission name is required!",
         "string.required": "Permission name is required!",
         "string.base": "Permission must be a string"
    }),
    description: Joi.string().max(500).required({
         "string.empty": "Permission description is required!",
         "string.required": "Permission description is required!",
         "string.base": "Permission must be a string"
    }),
});



module.exports = {
    setTestResultSchema,
    setTestTypeSchema,
    paragraphSchema,
    addModuleSchema,
    addPermissionSchema
    // Add more schemas as needed, e.g., anotherSchema
};
