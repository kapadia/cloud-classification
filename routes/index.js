
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


router.get('/user', function(req, res) {
    var msg = {user: null};
    
    msg.user = req.isAuthenticated() ? req.user.username : false;
    return res.status(200).json(msg);
});


router.post('/classification', ensureAuthenticated, function(req, res) {
    
    var conditions = { "_id": req.body.subjectId };
    var update = { "$inc": { classification_count: 1 }, updated: new Date() };
    Subject.findOneAndUpdate(conditions, update, function(error, subject) {
        
        var c = new Classification();
        c.cloudy = req.body.isCloudy;
        c.subject_id = req.body.subjectId;
        c.volunteer = req.user.username;
        c.save(function(err, doc) {
            return res.status(200).json({});
        });
        
    });
    
});


router.get('/subject', ensureAuthenticated, function(req, res) {
    
    Subject.random(function(err, subject) {
        return res.json(subject);
    });
    
});


module.exports = router;
