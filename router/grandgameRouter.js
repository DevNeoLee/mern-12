const express = require('express')
const Game = require('../model/game');

const router = express.Router();

router.get('/', (req, res) => {
    const data = Game.find()
    console.log("Getting game from MondgoDB through API");
})

router.post('/', (req, res) => {
    console.log('hello world!')
    console.log('req.ip: ', req.ip)

    console.log("req: ", req.body)
    console.log('hello world2')

    const newData = new Game({
        ipAddress_creator: req.ip,
        game_begin: new Date(),
        game_end: req.body.game_end,
        players: req.body.players,
        chatting: { 1: [], 2: [], 3: [], 4: [] },
        room_name: req.body.room_name,
        erica_messages: { 1: [], 2: [], 3: [], 4: [] },
        pete_decisions: { 1: [], 2: [], 3: [], 4: [] },
        norman_decisions: { 1: [], 2: [], 3: [], 4: [] }
    })

    newData.save();
    res.json(newData);
    console.log('newData: ', newData)

    console.log("Created a game to start into MongodDB through API");
})

router.put('/', async (req, res) => {
    console.log('req.body: ', req.body)
    console.log('type: ', typeof req.body)
    const game = await Game.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });

    if (!game) {
        console.log('game: ', game);
        return res.status(400).json({ success: false, error: "3" })
    } else {
        return res.status(200).json({ success: true, data: game });
    }

    console.log("Updated its game to MongodDB through API");
})

module.exports = router;