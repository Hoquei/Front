const express = require('express')
const app = express()
var http = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);
let player1 = {
    nickName: string = '',
    socket: string = []
};
let player2 = {
    nickName: string = '',
    socket: string = []
};
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
        let socketId = socket.id;
        io.emit('confirmation', {nickName, socketId});
    })

    socket.on('receivedConfirmation', (player) => {
        sendNames(player.name, player.socketId)
    })
    
    socket.on('disconnect', () => {
        let message = '';
        let winner = '';

        if(socket.id === player1.socket){
            console.log('tchau', player1.nickName);
            
            if(player2.nickName != ''){
                message = 'Player ' + player1.nickName + ' se desconectou';
                winner = 'Por WO, ' + player2.nickName;
                io.emit('gameOver', {message, winner});
            }
            else
                io.emit('firstModal');
                
            player1.nickName = '';
            player1.socket = '';
        } else if(socket.id === player2.socket){
            console.log('tchau', player2.nickName);

            message = 'Player ' + player2.nickName + ' se desconectou';
            winner = 'Por WO, ' + player1.nickName;
            io.emit('gameOver', {message, winner});

            player2.nickName = '';
            player2.socket = '';
        } else {
            console.log('não player desconectado');
        }
    });

    socket.on('move', (obj) => {
        sendMoves(obj);
    })
    
    socket.on('stopMove', (obj) => {
        stopMove(obj);
    });
});

function sendNames(nickName, socketId) {

    if(player1.nickName === '' || player2.nickName === ''){
        if(player1.nickName === ''){
            player1.nickName = nickName;
            player1.socket = socketId;
            io.emit('player1join', {nickName, socketId});
        }
        else {
            player2.nickName = nickName;
            player2.socket = socketId;
            io.emit('player2join', {nickName, socketId});
        } 
    }
    else{
        console.log('limite de players atingido');
        io.emit('player_limit',);
    }  
}

function sendMoves(obj) {

    if (obj.player === player1.nickName){
        io.emit('player1move', obj.direction);
    } else if (obj.player === player2.nickName) {
        io.emit('player2move', obj.direction);
    } else {
        console.log('player não existente');
    }
}

function stopMove(obj) {

    if (obj.player === player1.nickName){
        io.emit('player1stop', obj.direction);
    } else if (obj.player === player2.nickName) {
        io.emit('player2stop', obj.direction);
    } else {
        console.log('player não existente');
    }
}