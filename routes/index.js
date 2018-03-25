var express = require('express');

// body parser converts the HTTP request data into Json data
var bodyParser = require('body-parser')

//specify in which format you want to convert HTTP Request data
var jsonParser = bodyParser.json();

var router = express.Router();

const db = require('../database/db_config');

const registration_controller = require('../controllers/registration');

const users_controller = require('../controllers/users_controller');

// for maintaining the session
//var session;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET registration page. */
router.post('/register',jsonParser ,function(req, res, next) {
    var user_object = req.body;
    session = req.session;
    users_controller.create_user(user_object,function(err,response){
        if(err == null )
            res.send(response);
        else
            res.send(err);
    });
});

/* User Login. */
router.post('/login',jsonParser ,function(req, res, next) {
    var user_object = req.body;
    // get session
    session = req.session;
    if(session.user_id){
        res.send("You are already Logged in.")
    }else
    {
        users_controller.authenticate_user(user_object,function(err,response){
            if(err == null ){
                session.user_id=response;
                res.send("Successfull Logged in.");
            }
            else
                res.send(err);
        });
    }
});

// get request for logging out user.
router.get('/logout',function(req,res,next){
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
            res.send("ERROR while trying to log out.")
        } else {
            res.send("Successfully logged out.")
        }
    });

});
module.exports = router;
