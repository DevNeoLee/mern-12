const express = require('express')
const Session = require('../model/session');

const router = express.Router();

router.get('/', (req, res) => {
    const data = Session.find()
    console.log("Getting session from MondgoDB through API");
})

router.post('/', (req, res) => {
    console.log('req.ip: ', req.ip)

    const newData = new Session({
        ipAddress: req.ip,
        session_begin: new Date(),
        role: "",
    })

   newData.save();
   res.json(newData);

    console.log("Created its session to MongodDB through API");
})

router.put('/', async (req, res) => {
    console.log('req.body: ', req.body)
    console.log('type: ', typeof req.body)
    const session = await Session.findOneAndUpdate({_id: req.body._id}, req.body, {new: true});

    if (!session) {
        console.log('session: ', session);
        return res.status(400).json({ success: false, error: "3"})
    } else {
        return res.status(200).json({ success: true, data: session});
    }

    console.log("Updated its session to MongodDB through API");
})

module.exports = router;