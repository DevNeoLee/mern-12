const path = require('path');
const express = require("express")
const app = express()
const http = require('http');
const server = http.createServer(app)

const cors = require('cors');
const mongoDB = require('./utils/dbConnect')

app.use(cors());
app.use(express.json());

mongoDB();

const sessionRouter = require('./router/sessionRouter');
const grandGameRouter = require('./router/grandgameRouter')

const io = require('socket.io')(server, 
    { serveClient: false }
    )

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
} else {
    app.get('/', (req, res) => { 
        console.log('----------------------******* hello from backend', req.ip)
        return res.send("hello world from express")
        // res.sendFile(__dirname + '/index.html');
    })
}

const bodyParser = require('body-parser')
// const game = require("./routes/api/game");

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const port = process.env.PORT || 5000

app.use('/api/session', sessionRouter);
app.use('/api/grandgame', grandGameRouter);

//helping functions for WS events
// function removeArrayItem(arr, item) {
//     for (var i = arr.length; i--;) {
//         if (arr[i] === item) arr.splice(i, 1);
//     }
// }

let browserTapCount = 0;

io.on("connection", socket => {
    let unique_clients_number = Object.keys(socket.nsp.sockets);
    
    browserTapCount += 1;


    socket.on('loginpage_connection', (socket) => {
        console.log('A new user connected')
        console.log('Open Brower Tap count: ', browserTapCount)
        io.emit('browserTapCount', browserTapCount);

    })

    console.log('A user connected: ', socket.id)

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

    socket.on("initial_connection", (socket) => {
        // let roomInitial = io.sockets.adapter.rooms.get('roomInitial')
        // socket.join('roomInitial')
        // socket.to('roomInitial').emit('join', 3)
    //    console.log("users connected: ", socket.client.conn.server.clientsCount)

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
        browserTapCount -= 1;
        socket.to('room2').emit('left')
        console.log("someone left the room", socket.id)
        io.emit('browserTapCount', browserTapCount);
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
