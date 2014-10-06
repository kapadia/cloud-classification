
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SubjectSchema = new Schema({
    
    scene_id: {
        type: String,
        required: true
    },
    srcwin: {
        type: Array
    },
    updated: {
        type: Date,
        default: Date.now
    },
    created: {
        type: Date,
        default: Date.now
    }
}, {
    strict: true,
    autoIndex: false
});

SubjectSchema.statics.random = function(callback) {
    this.count(function(err, count) {
       
        if (err) {
            return callback(err);
        }
        var rand = ~~(Math.random() * count);
        this.findOne().skip(rand).exec(callback);
    }.bind(this));
};

var Subject = mongoose.model('Subject', SubjectSchema);


module.exports = Subject;