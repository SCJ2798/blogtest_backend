const Joi = require('joi');

module.exports.BlogSchema = Joi.object({
    title:Joi.string().required(),
    uid:Joi.string(),
});







