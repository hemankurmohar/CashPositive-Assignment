var express = require('express');

// body parser converts the HTTP request data into Json data
var bodyParser = require('body-parser')

//specify in which format you want to convert HTTP Request data
var jsonParser = bodyParser.json();

var router = express.Router();

const db = require('../database/db_config');

const registration_controller = require('../controllers/registration');

const users_controller = require('../controllers/users_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET registration page. */
router.post('/register',jsonParser ,function(req, res, next) {
    var user_object = req.body;
    users_controller.create_user(user_object,function(err,response){
        if(err == null )
            res.send(response);
        else
            res.send(err);
    });
});



module.exports = router;
