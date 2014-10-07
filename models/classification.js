
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ClassificationSchema = new Schema({
    
    subject_id: {
        type: String,
        required: true
    },
    cloudy: {
        type: Number,
        required: true
    },
    volunteer: {
        type: String,
        required: true
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

var Classification = mongoose.model('Classification', ClassificationSchema);


module.exports = Classification;