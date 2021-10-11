const express = require('express')
const app = express()
var http = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);

app.use(express.static(__dirname+'/public/scripts'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
app.get('/controller', (req, res) => {
    res.sendFile(__dirname + "/controller.html");
})

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('playerJoin', (arg) => {
        sendNames(arg);
    })

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
});

function sendNames(arg) {
    io.emit('player_join', arg);
}

app.use(express.static(__dirname + '/public'));
http.listen(8080, () => {
    console.log('Listen on port 8080!')
})


