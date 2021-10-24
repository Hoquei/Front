import Modal from './modal.js'
const modal = Modal();
const socket = io();

let playerName = ''
socket.on("player_join", (arg) => {
    playerName = modal.nome();
    document.getElementById('PlayerName').innerHTML = `Player name: ${playerName}`; 
})

var options = {
    color: "green",
    zone: document.getElementById('zone_joystick'),
};


var manager = nipplejs.create(options);

manager.on('end', function(evt, nipple) {
    console.log(nipple);
    socket.emit('stopMove', {player: playerName});
})

manager.on('move', function(evt, nipple) {
    if(nipple.direction){
        console.log(nipple);
        // console.log(nipple.direction.y);
        socket.emit('move', {direction: nipple.angle.degree,
                             player: playerName});
    }
})