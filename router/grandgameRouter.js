const express = require('express')
const Game = require('../model/game');

const router = express.Router();

router.get('/', (req, res) => {
    const data = Game.find()
    console.log("Getting game from MondgoDB through API");
})

router.post('/', (req, res) => {
    console.log('req.ip: ', req.ip)

    const newData = new Game({
        ipAddress_creator: req.ip,
        time_begin: new Date(),
        time_end: null,
        players: [],
        chatting: [],
        play_history: []
    })

    newData.save();
    res.json(newData);

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