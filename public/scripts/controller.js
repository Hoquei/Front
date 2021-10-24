import Modal from "./modal.js";
const modal = Modal();
const socket = io();

let player;
socket.on('confirmation', (arg) => {
    console.log('arg', arg);
    player = modal.nome();
    if(player.name === arg.nickName && player.socketId === arg.socketId){
        document.getElementById('PlayerName').innerHTML = `Player name: ${player.name}`;
        socket.emit('receivedConfirmation', player);
    }
})

socket.on("player_join", (arg) => {
    player = modal.nome();
    console.log('connection: ', player.socketId);
    document.getElementById('PlayerName').innerHTML = `Player name: ${player.name}`; 
})

var options = {
    color: "green",
    zone: document.getElementById('zone_joystick'),
};

socket.on('player_limit', () => {
    console.log('limite de players', player.name);
}) 

var manager = nipplejs.create(options);

manager.on('end', function(evt, nipple) {
    console.log(nipple);
    socket.emit('stopMove', {player: player.name});
})

manager.on('move', function(evt, nipple) {
    if(nipple.direction){
        console.log(nipple);
        socket.emit('move', {direction: nipple.angle.degree,
                             player: player.name});
    }
})