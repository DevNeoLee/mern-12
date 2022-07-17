const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    ipAddress: {
        type: String,
    },
    session_begin: {
        type: Date,
    },
    session_end: {
        type: Date,
    },
    preGameSurvey: {
    },
    postGameSurvey: {
    },
    generalSurvey: {
    },
    role: "",
    your_decisions: {},
    game_id: { type: Schema.Types.ObjectId }
})

module.exports = Session = mongoose.model('session', SessionSchema);
