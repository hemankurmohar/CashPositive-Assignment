'use strict';
// for object schema validation
const Joi = require('joi');

// define validations on object attributes
const messge = Joi.object().keys({
    to_user: Joi.string().regex(/^[a-zA-Z]/).max(50),
    subject: Joi.string().max(100),
    content: Joi.string()
});

// function to validate schema of messge object //
function validate_messge_object(messge_object,callback){
    Joi.validate(messge_object,messge,function(err, value){
        callback(err,value);
    })
}

module.exports.validate_messge_object = validate_messge_object;

