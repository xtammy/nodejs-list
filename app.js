var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var users = require('./routes/users');
var login = require('./routes/login');

//声明session
var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('An'));
app.use(session({
	secret:'an',
  resave:false,
  saveUninitialized:true
}));
//----------------------------------------------------------  页面提示   ----------------------------------------------------------------------------------------
app.use(function(req, res, next) {
    res.locals.islogin=req.session.islogin;
    var err = req.session.error;
    delete req.session.error;
    res.locals.message = '';
    if (err) {
        res.locals.message = '<div class="alert alert-block alert-danger fade in"> ' +
            '<a class="close" data-dismiss="alert" href="#" aria-hidden="true">&times;</a><p></p>' +
            '<p class="text-center">'+ err +'</p></div>';
    }
    next();
});
//----------------------------------------------------------  页面提示   ----------------------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public',express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
//app.use('/login', routes);
//app.use('/home', routes);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
app.listen(8000,'127.0.0.1',function(){
    console.log('127.0.0.1:8000')
});
module.exports = app;
