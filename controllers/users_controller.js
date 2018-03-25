const db = require('../database/db_config');

const user_model = require('../models/user');

// for encrypting password
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

// create a new user or new registration
function create_user(user_object,callback){
    // checking validations //
    user_model.validate_user_object(user_object,function(err,validation_response){
        if(err == null ){
            encryptedPassword=bcrypt.hashSync(user_object.password,salt);
            // execute update query //
            db.update('insert into users (username,first_name,last_name,hashed_password) values (?,?,?,?)',
                [user_object.username,user_object.first_name,user_object.last_name,encryptedPassword],
                function(error,response){
                    callback(err,"Registered Successfully ! ");
            });
        }
        else{
            callback(err,"ERROR:"+err);
        }
    });
}

// create a new user or new registration
function authenticate_user(user_object,callback){
    // checking validations //
    user_model.validate_user_object(user_object,function(err,validation_response){
        if(err == null ){
            // execute query //
            db.query("select id,hashed_password from users where username = ? limit 1",[user_object.username],function(error,response){
                // match password //
                if(error == null){
                    if(bcrypt.compareSync(user_object.password,response[0].hashed_password)){
                        callback(err,response[0].id);
                    }
                    else{
                        callback(err,"Incorrect username/password.");
                    }
                }
                else{
                    callback(error,"ERROR::"+error);
                }
            });
        }
        else{
            callback(err,"ERROR:"+err);
        }
    });
}

module.exports.create_user=create_user
module.exports.authenticate_user=authenticate_user
