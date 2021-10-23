const express = require('express')
const app = express()
var http = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);

let player1;
let player2;
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
        var teste = sendNames(nickName, socket.id);
        console.log('entrou');
        console.log(teste);
        return teste;
    })

    socket.on('disconnect', (arg) => {
        console.log(socket.id);
        console.log('p1 disconect: ' + player1);
        console.log('p2 disconect: ' + player2);
        if(player1 != undefined || player2 != undefined){
            if(player1.getSocketId === socket.id)
                player1 = undefined;
            else
                player2 = undefined;
        }

        console.log('a user disconnected');
    });

    socket.on('move', (obj) => {
        sendMoves(obj);
    })
    
    socket.on('stopMove', (obj) => {
        stopMove(obj);
    });
});

function sendNames(nickName, socketId) {
    console.log(socketId);
    console.log(player1);

    if(player1 === undefined || player2 === undefined){
        if(player1 === undefined)
            player1 = new Player(nickName, socketId);
        else
            player2 = new Player(nickName, socketId);
        
        console.log(player1.getNickName());
        countplayer++;
        io.emit('player_join', nickName);
    }
    else{
        console.log('limite de players atingido');
        return true;
    }  
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

class Player {
    constructor(nickName, socketId) {
      this.nickName = nickName;
      this.socketId = socketId;
    }

    getNickName(){
        return this.nickName;
    }

    getSocketId(){
        return this.socketId;
    }
}