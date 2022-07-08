const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    time_begin: {
        type: Date
    },
    time_end: {
        type: Date
    },
    players: [],
    chatting: {},
    play_history: {}
});

module.exports = Game = mongoose.model('Game', GameSchema);