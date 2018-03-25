const db = require('../database/db_config');

const user_model = require('../models/user');

// for encrypting password
const bcrypt = require('bcrypt');
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

module.exports.create_user=create_user
