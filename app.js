var createError = require('http-errors');
var express = require('express');
var path = require('path');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

var port = 3000

var indexRouter = require('./routes/index');

var usersRouter = require('./routes/users');

var NodeSession = require('node-session');

var app = express();

var express = require('express');

var session = require('express-session');

var FileStore = require('session-file-store')(session);

app.use(session({
    name: 'assignment-session-cookie',
    secret: 'my express secret',
    saveUninitialized: false,
    resave: true,
    store: new FileStore()
}));

var ssn ;

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Start server and lsiten on specific port
app.listen(port ,function(err){
    if(err){
        return console.log(`ERROR while starting server ${err}`);
    }
    console.log(`Server is running on port ${port}`);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


function checkSignIn(req, res){
    if(req.session.user){
        next();     //If session exists, proceed to page
    } else {
        var err = new Error("Not logged in!");
        console.log(req.session.user);
        next(err);  //Error, trying to access unauthorized page!
    }
}


module.exports = app;
