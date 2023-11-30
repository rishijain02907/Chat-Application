const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const connect = require('./config/database-config');

const Chat = require('./models/chat');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {

  socket.on('join_room', (data) => {
    socket.join(data.roomid, function() {
        console.log("joined a room")
    });
  })

    // server collecting a message
    socket.on('msg_send', async(data) => {
        console.log(data);
        // server sending message to all the clients who are connected to a websocker connection
        const chat = await Chat.create({
            roomId: data.roomid,
            user: data.username,
            content: data.msg
        });
        io.to(data.roomid).emit('msg_rcvd',data);
    })

    socket.on('typing',(data) => {
        socket.broadcast.to(data.roomid).emit('someone_typing');
    })
});

app.set('view engine', 'ejs');
app.use('/', express.static(__dirname + '/public'));

app.get('/chat/:roomid', async(req,res) => {
    const chats = await Chat.find({
        roomId: req.params.roomid
    }).select('content user');
    res.render('index', {
        name: 'Rishi',
        id: req.params.roomid,
        chats: chats
    });
})

//any changes in app will be displayed here to because it's passed in createServer()
server.listen(3000, async() => {
    console.log("Server Started");
    await connect();
    console.log("mongodb connected");
});