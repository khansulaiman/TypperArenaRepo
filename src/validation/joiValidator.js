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


const setTestTypeSchema = Joi.object({
    name: Joi.string().max(200).required(),
    description: Joi.string().max(500).required(),
    created_at: Joi.date().timestamp().optional()  // Optional if not required from client
});
module.exports = {
    setTestResultSchema,
    setTestTypeSchema
    // Add more schemas as needed, e.g., anotherSchema
};
