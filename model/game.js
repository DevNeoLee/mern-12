const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    room_name: { type: String },
    ipAddress_creator: { type: String},
    time_begin: {
        type: Date
    },
    time_end: {
        type: Date
    },
    role: "",
    players: [],
    chatting: [],
    play_history: []
});

module.exports = Game = mongoose.model('Game', GameSchema);