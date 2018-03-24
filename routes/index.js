var express = require('express');
var router = express.Router();
var db = require('../database/db_config');
/* GET home page. */
router.get('/', function(req, res, next) {
    db.query('select * from users where id = ?',[1],function(error,fetch_response){
        if(!error)
            console.log(fetch_response)
        else
            console.log(error)
    })

    res.render('index', { title: 'Express' });

});
module.exports = router;
