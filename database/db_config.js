var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "hemankur#9041",
    database: "assignment"
});

con.query('select * from users where id = ?',[1],function(error,fetch_response){
    if(!error)
        console.log(fetch_response)
    else
        console.log(error)
})

module.exports = {
    query: function(text,params,callback) {
        console.log(params)
        const start = Date.now();
        return con.query(text,params,function(err,res){
            const duration = Date.now() - start;
            console.log('executed query', { text, duration, total_rows: res.length })
            callback(err, res);
        });
    }
}