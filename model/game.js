const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    room_name: { type: String },
    ipAddress_creator: { type: String},
    game_begin: {
        type: Date
    },
    game_end: {
        type: Date
    },
    players: [],
    chatting: {},
    erica_messages: {},
    pete_decisions: {},
    norman_decisions: {},
});

module.exports = Game = mongoose.model('Game', GameSchema);