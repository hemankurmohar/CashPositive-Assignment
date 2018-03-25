const db = require('../database/db_config');

const messge_model = require('../models/message');

const user_controller  = require('../controllers/users_controller');

// function to send message //
function send_messge(messge_object,user_id,callback){
    // checking validations //
    messge_model.validate_messge_object(messge_object,function(err,validation_response){
        if(err == null ){
            // validate if reciever exists or not //
            user_controller.validate_user(messge_object.to_user,user_id,function(v_error,v_resonse){
                if(v_error == null ){
                    if(v_resonse == -1){
                        callback(v_error,"Failed to send. You are blocked by "+messge_object.to_user);
                    }
                    else if (v_resonse == 0) {
                        callback(v_error,"ERROR :: User with username "+messge_object.to_user+" doesn't exists. Please enter correct username.");
                    }
                    else{
                        // execute db update i.e send message.
                        db.update("insert into messages (sender_id,reciever_id,subject,content) values (?,?,?,?)",
                            [user_id,v_resonse,messge_object.subject,messge_object.content],function(error,response){
                                if (error == null)
                                    callback(error,"Message has been sent.");
                                else
                                    callback(error,"ERROR :: "+error);
                            });
                    }
                }else{
                    callback(v_error,"ERROR :: "+v_error);
                }
            });
        }
        else{
            callback(err,"ERROR:"+err);
        }
    });
}

// show all messages in inbox
function show_inbox(user_id,callback){
    db.query("select users.username,messages.sender_id,messages.subject,messages.content,messages.recieved_at from users inner join messages on users.id=messages.sender_id and messages.reciever_id = ? ",[user_id],function(error,response){
        if(error == null){
            if(response.length!=0){
                var len=response.length;
                var str="Sent by User { username },Subject,Content,Time\n";
                for(i=0;i<len;i++){
                    str+=response[i].username+","+response[i].subject+","+response[i].content+","+response[i].recieved_at+"\n";
                }
                callback(error,str);
            }else{
                callback(error,"Ooops..! Your Inbox is Empty.")
            }
        }else{
            callback(error,"ERROR :: "+error);
        }
    });
}

// function to block user by proving username //
function block_user(username,user_id,callback){
    db.query("select id from users where username = ? limit 1",[username],function(err,resp){
        if(err == null){
            if(resp.length!=0){
                db.update("insert into blocked_list (user_id,blocked_user_id) values (?,?)",[user_id,resp[0].id],function(error,response){
                    if(error==null){
                        callback(error,"User "+username+" is blocked now.");
                    } else{
                        callback(error,"ERROR :: "+error);
                    }
                });
            }else{
                callback(error,"User doesn't exsits.")
            }
        }
        else{
            callback(err,"ERROR :: "+err);
        }
    });
}
module.exports.send_messge=send_messge
module.exports.show_inbox=show_inbox
module.exports.block_user=block_user
