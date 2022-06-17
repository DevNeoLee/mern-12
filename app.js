const path = require('path');
const express = require("express")
const app = express()
const http = require('http');
const server = http.createServer(app)

const cors = require('cors');

const instrument = require('@socket.io/admin-ui')

app.use(cors());


const io = require('socket.io')(server, 
    { serveClient: false }
    )

const db = require('./config/keys')

const mongoose = require('mongoose')

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log("mongo connection error: ", err.message));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
} else {
    app.get('/', (req, res) => { 
        // return res.send("hello world from express")}
          res.sendFile(__dirname + '/index.html');
    })
}

// const bodyParser = require('body-parser')
// const game = require("./routes/api/game");

// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())

// app.use("/api/game", game);


const port = process.env.PORT || 5000

//helping functions for WS events
// function removeArrayItem(arr, item) {
//     for (var i = arr.length; i--;) {
//         if (arr[i] === item) arr.splice(i, 1);
//     }
// }



io.on("connection", socket => {
    console.log('you are connected on the backend to: ', socket.id)
    console.log('방들: ', socket.rooms)

    socket.onAny(event => {
        console.log('socket event: ', event)
    })


    socket.on("role", (role) => {
        console.log("socket.role: ", role)
        socket.role = role
        console.log("socket.role: ", socket.role)
    })

    socket.on('erica_message', (msg) => {
        let room = io.sockets.adapter.rooms.get('room1')
        console.log('messages from Erica: ', msg)
        io.in('room1').emit('erica_message', msg)
        // socket.to('room1').emit('welcome', msg)
        // socket.to('room1').emit('welcome')

        // room && console.log("몇: ", room.size)
        // console.log("방들: ", socket.rooms)
        // room && console.log("몇: ", room.size)
        // console.log("사람들: ", io.sockets.adapter.rooms.get('room1').size)
        // console.log('who joined: ', socket.id)

    })

    socket.on('norman_message', (data) => {
        let room = io.sockets.adapter.rooms.get('room1')
        console.log('form content from norman: ', data)
        socket.broadcast.to('room1').emit('norman_message', data)
    })

    socket.on('pete_message', (data) => {
        let room = io.sockets.adapter.rooms.get('room1')
        console.log('form content from pete: ', data)
        socket.broadcast.to('room1').emit('pete_message', data)
    })

    //메세지와 동시에 펑션을 'done'을 받아서 실행할수 있음.
    socket.on("enter_room", (msg, done) => {
        let room = io.sockets.adapter.rooms.get('room1')
        
        if (room === undefined || room.size < 5) {
            socket.join('room1')
            socket.to('room1').emit('welcome')
            room && console.log("몇: ", room.size)
            console.log("방들: ", socket.rooms)
            room &&  console.log("몇: ", room.size)
            console.log("사람들: ", io.sockets.adapter.rooms.get('room1').size)
            console.log('who joined: ', socket.id)

        } else {
            socket.join('room2')
            socket.to('room2').emit('welcome')
            console.log("사람들: ", io.sockets.adapter.rooms.get('room1').size)
            console.log('room2 size: ', io.sockets.adapter.rooms.get('room2').size)
            console.log('who joined: ', socket.id)

        }
        console.log("사람들: ", io.sockets.adapter.rooms.get('room1').size)
        console.log('msg: ', msg)
    })

    socket.on("disconnecting", () => {
        socket.to('room2').emit('leaving')
        console.log("someone leaving the room", socket.id)
 
        // socket.rooms.forEach(room => {
        //     socket.to(room).emit('leaving')
        //     io.sockets.adapter.rooms.get('room2') && console.log('room2 size: ', io.sockets.adapter.rooms.get('room2').size)
        // })
    })

    socket.on("disconnect", () => {
        socket.to('room2').emit('left')
        console.log("someone left the room", socket.id)

        // io.sockets.emit('left', () => { console.log('bye bye')})
        // console.log('room2 size: ', io.sockets.adapter.rooms.get('room2').size)
    })

    socket.on("norman_chat", (data) => {
            let room = io.sockets.adapter.rooms.get('room1')
            console.log('chat content from Norman: ', data)
            socket.broadcast.to('room1').emit('norman_chat', data)
            console.log('backend received an event, norman_chat:', socket.id)
    })
})

server.listen(port, () => console.log(`Server is running on the port ${port}, from express server`))
