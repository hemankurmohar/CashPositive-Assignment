'use strict';
// for object schema validation
const Joi = require('joi');

// define validations on object attributes
const user = Joi.object().keys({
    username: Joi.string(),
    first_name: Joi.string().regex(/^[a-zA-Z]/).max(50),
    last_name: Joi.string().regex(/^[a-zA-Z]/).max(50),
    password: Joi.string()
});

// function to validate schema of user object //
function validate_user_object(user_object,callback){
    Joi.validate(user_object,user,function(err, value){
        callback(err,value);
    })
}

module.exports.validate_user_object = validate_user_object;

