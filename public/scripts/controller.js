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
manager.on('move', function(evt, nipple) {
    if(nipple.direction){
        console.log(nipple.direction.x);
        console.log(nipple.direction.y);
        socket.emit('move', {direction: nipple.direction,
                             player: playerName});
    }
})