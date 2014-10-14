
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
    classification_count: {
        type: Number,
        default: 0
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
    var condition = { "classification_count": { "$lt": 5 } };
    
    this.count(condition, function(err, count) {
       
        if (err) {
            return callback(err);
        }
        var rand = ~~(Math.random() * count);
        
        this.findOne(condition).skip(rand).exec(callback);
    }.bind(this));
};

var Subject = mongoose.model('Subject', SubjectSchema);


module.exports = Subject;