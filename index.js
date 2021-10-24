const express = require('express')
const app = express()
var http = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);
let player1 = '';
let player2 = '';
let countplayer = 0;

app.use(express.static(__dirname+'/public/scripts'))
app.use(express.static(__dirname + '/public'));
http.listen(8080, () => {
    console.log('Listen on port 8080!')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.get('/controller', (req, res) => {
    res.sendFile(__dirname + "/controller.html");
})

io.on('connection', (socket) => {

    socket.on('playerJoin', (nickName) => {
        sendNames(nickName);
    })

    socket.on('disconnect', (arg) => {
        console.log('a user disconnected');
    });

    socket.on('move', (obj) => {
        sendMoves(obj);
    })
    
    socket.on('stopMove', (obj) => {
        stopMove(obj);
    });
});

function sendNames(nickName) {

    player1 === '' ? player1 = nickName : player2 === '' ? player2 = nickName : console.log('limite de players atingido');
    countplayer++;
    io.emit('player_join', nickName);
}

function sendMoves(obj) {

    if (obj.player === player1){
        io.emit('player1move', obj.direction);
    } else if (obj.player === player2) {
        io.emit('player2move', obj.direction);
    } else {
        console.log('player não existente');
    }
}

function stopMove(obj) {

    if (obj.player === player1){
        io.emit('player1stop', obj.direction);
    } else if (obj.player === player2) {
        io.emit('player2stop', obj.direction);
    } else {
        console.log('player não existente');
    }
}
