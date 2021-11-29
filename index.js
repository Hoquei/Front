const express = require('express')
const app = express()
var http = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);
let countplayer = 0;

app.use(express.static(__dirname+'/public/scripts'))
app.use(express.static(__dirname + '/public'));

// Initialize modal of the player
let player1 = {
    nickName: string = '',
    socket: string = []
};
let player2 = {
    nickName: string = '',
    socket: string = []
};

// http listen in 8080
http.listen(8080, () => {
    console.log('Listen on port 8080!')
})

// use the index.html in base page
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

// use the controller.html in controller page
app.get('/controller', (req, res) => {
    res.sendFile(__dirname + "/controller.html");
})

// Socket that allows to control events when connected.
io.on('connection', (socket) => {

    // listen socket topic playerJoin
    socket.on('playerJoin', (nickName) => {
        let socketId = socket.id;
        // emit socket topic Confirmation
        io.emit('confirmation', {nickName, socketId});
    })

    //listen socket topic received Confirmation
    socket.on('receivedConfirmation', (player) => {
        sendNames(player.name, player.socketId)
    })
    
    // Socket to identify when a player disconnect from the game.
    socket.on('disconnect', () => {
        let message = '';
        let winner = '';

        //if socket disconnected is the same from player 1 player 2 wins
        if(socket.id === player1.socket){
            console.log('tchau', player1.nickName);
            // if player2 has nickname, winner
            if(player2.nickName != ''){
                message = 'Player ' + player1.nickName + ' se desconectou';
                winner = 'Por WO, ' + player2.nickName;
                // emit socket topic gameOver
                io.emit('gameOver', {message, winner});
            }
            else
                // emit socket topic firstModal
                io.emit('firstModal');
                
            player1.nickName = '';
            player1.socket = '';
             //if socket disconnected is the same from player 2, player 1 wins
        } else if(socket.id === player2.socket){
            console.log('tchau', player2.nickName);

            message = 'Player ' + player2.nickName + ' se desconectou';
            winner = 'Por WO, ' + player1.nickName;
            // emit socket topic gameOver
            io.emit('gameOver', {message, winner});

            player2.nickName = '';
            player2.socket = '';
        } else {
            console.log('não player desconectado');
        }
    });
    // emit socket topic move
    socket.on('move', (obj) => {
        sendMoves(obj);
    })
        // emit socket topic stopmove
    socket.on('stopMove', (obj) => {
        stopMove(obj);
    });
});

// Function that send the names of the joined players.
function sendNames(nickName, socketId) {

    // if no player has a name
    if(player1.nickName === '' || player2.nickName === ''){
        // if player 1 has nickname
        if(player1.nickName === ''){
            player1.nickName = nickName;
            player1.socket = socketId;

            // emit socket topic player1Join
            io.emit('player1join', {nickName, socketId});
        }
        else {
            player2.nickName = nickName;
            player2.socket = socketId;

            // emit socket topic player2Join 
            io.emit('player2join', {nickName, socketId});
        } 
    }
    else{
        console.log('limite de players atingido');
        // emit socket topic player_limit
        io.emit('player_limit',);
    }  
}

// Function that send the moves of a certain player.
function sendMoves(obj) {

    // if player move is player 1, emit socket Player1move
    if (obj.player === player1.nickName){
        io.emit('player1move', obj.direction);
    // if player move is player 2, emit socket Player2move
    } else if (obj.player === player2.nickName) {
        io.emit('player2move', obj.direction);
    } else {
        console.log('player não existente');
    }
}

// Function that send the stop move command of a certain player.
function stopMove(obj) {
    // if player move is player 1, emit socket Player1move
    if (obj.player === player1.nickName){
        io.emit('player1stop', obj.direction);
    // if player move is player 2, emit socket Player2move
    } else if (obj.player === player2.nickName) {
        io.emit('player2stop', obj.direction);
    } else {
        console.log('player não existente');
    }
}