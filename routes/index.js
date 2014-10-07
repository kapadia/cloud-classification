
var express = require('express');
var router = express.Router();
var Subject = require('../models/subject');
var Classification = require('../models/classification');
var passport = require('passport');


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}


router.get('/auth/github', passport.authenticate('github'), function(req, res) {
});


router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), function(req, res) {
    res.redirect('/');
});


router.post('/classification', ensureAuthenticated, function(req, res) {
    
    var c = new Classification();
    c.cloudy = req.body.isCloudy;
    c.subject_id = req.body.subjectId;
    c.volunteer = req.user.username;
    c.save(function(err, doc) {
      return res.json({"BOO": "YA"});
    });
});


router.get('/subject', ensureAuthenticated, function(req, res) {
    
    Subject.random(function(err, subject) {
        return res.json(subject);
    });
    
});


module.exports = router;
