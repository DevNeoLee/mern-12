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
    role: { type: String},
    game_id: { type: Schema.Types.ObjectId }
})

module.exports = Session = mongoose.model('session', SessionSchema);
