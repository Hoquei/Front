import Modal from "./modal.js";
const modal = Modal();
const socket = io();
let player;

/**
 * Socket to identify the confirmation of the player in the game.
 */
socket.on('confirmation', (arg) => {
    console.log('arg', arg);
    player = modal.nome();
    // if the name and socket of the player are the same as the parameter, it sends confirmation
    if(player.name === arg.nickName && player.socketId === arg.socketId){
        document.getElementById('PlayerName').innerHTML = `Player name: ${player.name}`;
        socket.emit('receivedConfirmation', player);
    }
})

// Socket to identify the joined player.
socket.on("player_join", (arg) => {
    player = modal.nome();
    console.log('connection: ', player.socketId);
    document.getElementById('PlayerName').innerHTML = `Player name: ${player.name}`; 
})

// define Joystick atributes.
var options = {
    color: "green",
    zone: document.getElementById('zone_joystick'),
};

// Socket to identify when a third person try to connect into the game as a player.
socket.on('player_limit', () => {
    console.log('limite de players', player.name);
}) 

// Create Nipplejs controller
var manager = nipplejs.create(options);

// Socket to identify when a player stops.
manager.on('end', function(evt, nipple) {
    console.log(nipple);
    socket.emit('stopMove', {player: player.name});
})

// Socket to identify when a player moves.
manager.on('move', function(evt, nipple) {
    // if the nipple returns direction, emit the move
    if(nipple.direction){
        console.log(nipple);
        socket.emit('move', {direction: nipple.angle.degree,
                             player: player.name});
    }
})