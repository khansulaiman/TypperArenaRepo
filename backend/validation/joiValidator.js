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
    contest_id: Joi.string().optional(),
    content: Joi.string().required().messages({
        "string.empty": "Content is required!",
        "string.required": "Content is required!",
        "string.base": "Content must be a string!"
    }),
    dificulty_level: Joi.string().required().messages({
        "string.empty": "Dificulty level is required!",
        "string.required": "Dificulty level is required!",
        "string.base": "Dificulty level must be a string!"
    })
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
