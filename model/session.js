const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    ipAddress: {
        type: String,
    },
    date: {
        type: Date,
    },
    preGameSurvey: {
    },
    postGameSurvey: {
    },
    generalSurvey: {
    },
    role: "",
    game: { }
})

module.exports = Session = mongoose.model('session', SessionSchema);
