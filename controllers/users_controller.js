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
                   if(error == null )
                        callback(error,"Registered Successfully ! ");
                   else
                       callback(error,"ERROR :: "+error);
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
                if(error == null && response.length!=0){
                    if(bcrypt.compareSync(user_object.password,response[0].hashed_password)){
                        callback(err,response[0].id);
                    }
                    else{
                        callback(err,"Incorrect username/password.");
                    }
                }
                else if (response.length==0){
                    callback("No Record Found.","ERROR:: no record");
                }
                else{
                    callback(error,"ERROR:: "+error);
                }
            });
        }
        else{
            callback(err,"ERROR:"+err);
        }
    });
}
// function to check whether user exists or not and user should not be blocked by current signed in user. //
function validate_user(username,user_id,callback){
    db.query("select id from users where username = ? limit 1 ",[username],function(error,response){
       if(error == null ){
           if(response.length){
               db.query("select * from blocked_list where user_id = ?  and blocked_user_id = ? limit 1",[response[0].id,user_id],function(err,resp){
                  if(error == null){
                      if(resp.length!=0){
                            callback(err,-1);
                      }else{
                          callback(error,response[0].id);
                      }
                  }
                  else{
                      callback(error,"ERROR :: "+error);
                  }
               });

           }else{
               callback(error,0);
           }
       }else{
           callback(error,"ERROR::"+error);
       }
    });
}


module.exports.create_user=create_user
module.exports.authenticate_user=authenticate_user
module.exports.validate_user=validate_user
