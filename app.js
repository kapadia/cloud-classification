
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var mongoose = require('mongoose');
var dotenv = require('dotenv');
var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy;

var routes = require('./routes/index');

dotenv.load();

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://0.0.0.0:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
          console.log("PROFILE", profile);
          return done(null, profile); 
      });
  }
));

var app = express();

app.use(express.static(__dirname + '/public'));

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
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