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
    contest_id: Joi.string().required().messages({
        "string.empty": "Contest ID is required",
        "string.base": "Contest ID must be a string"
    }),
    content: Joi.string().required().messages({
        "string.empty": "Content is required",
        "string.base": "Content must be a string"
    }),
    dificulty_level: Joi.string().required().messages({
        "string.empty": "Dificulty level is required",
        "string.base": "Dificulty level must be a string"
    })
});



const setTestTypeSchema = Joi.object({
    name: Joi.string().max(200).required(),
    description: Joi.string().max(500).required(),
    created_at: Joi.date().timestamp().optional()  // Optional if not required from client
});
module.exports = {
    setTestResultSchema,
    setTestTypeSchema,
    paragraphSchema
    // Add more schemas as needed, e.g., anotherSchema
};
