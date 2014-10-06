var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dotenv = require('dotenv');

var routes = require('./routes/index');

dotenv.load();

var app = express();

app.use(express.static(__dirname + '/public'));

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

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


var mongoUser = process.env.MONGO_USERNAME;
var mongoPass = process.env.MONGO_PASSWORD;
var mongoURI = process.env.MONGO_URI;
var dbConfig = "mongodb://" + mongoUser + ":" + mongoPass + "@" + mongoURI;

mongoose.connect(dbConfig)
var db = mongoose.connection;

db.on('error', function() {
  console.log('Unable to connect to database');
});

db.once('open', function() {
  console.log("Connected to database");
});

module.exports = app;