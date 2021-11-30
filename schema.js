const joi = require("joi");
const schema = {
    register: joi.object({
        name:joi.string().min(3).max(50).alphanum().required(),
        email:joi.string().email().required(),
        password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        repeat_password: joi.ref('password'),
    }),
    login:joi.object({
        email:joi.string().email().required(),
        password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    }),
    post:joi.object({
        title:joi.string().min(6).max(20).required(),
        body:joi.string().min(20).max(100).required(),
    }),
    
}

module.exports = schema;