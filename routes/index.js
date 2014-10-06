
var express = require('express');
var router = express.Router();
var Subject = require('../models/subject');
var Classification = require('../models/classification');


router.get('/', function(req, res) {
    res.render('index', function(err, html) {
        console.log(html);
    });
});

router.post('/classification', function(req, res) {
    console.log('receiving classification');
    console.log(req.body);
    
    var c = new Classification();
    c.cloudy = req.body.isCloudy;
    c.subject_id = req.body.subjectId;
    c.save(function(err, doc) {
      return res.json({"BOO": "YA"});
    });
});

router.get('/subject', function(req, res) {
    console.log('getting random subject');
    
    Subject.random(function(err, subject) {
        console.log(err);
        console.log(subject);
        return res.json(subject);
    });
});

module.exports = router;