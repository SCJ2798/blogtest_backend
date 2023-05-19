const Joi = require('joi');

module.exports.UserLoginSchema= Joi.object({
    email:Joi.string().email().required(),
    psw:Joi.string().min(8).required()
});

module.exports.UserSchema = Joi.object({
    first_name:Joi.string().required(),
    last_name:Joi.string().required(),
    email:Joi.string().email().required(),
    psw:Joi.string().min(8).required(),
});







