var mysql = require('mysql');

// DB login credentials//
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "hemankur#9041",
    database: "assignment"
});


//  query function that will execute all types of queries //
module.exports = {
    // two seprate functions for searching and updating because of diffrent function for result rows cout.
    // for searching //
    query: function(text,params,callback) {
        const start = Date.now();
        return con.query(text,params,function(err,res){
            const duration = Date.now() - start;
            console.log('executed query', { text, duration, total_rows: res.length })
            callback(err, res);
        });
    },
    //for creating,updating and deleting.
    update: function(text,params,callback){
        const start = Date.now();
        return con.query(text,params,function(err,res){
            const duration = Date.now() - start;
            console.log('transaction done', { text, duration, total_rows_affected: res.affectedRows })
            callback(err, res);
        });
    }

}