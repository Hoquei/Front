
import { ModalLoading } from './modal.js'

const modal = ModalLoading()
const socket = io();


let player1 = 'player 1';
let player2 = 'player 2';
let countpPlayers = 0;

socket.on("player_join", (arg) => {
    if(player1 === 'player 1') {
        player1 = arg;
        document.getElementById("player1").innerHTML = player1; 
        document.getElementById("playerWaiting").innerHTML = 'Player 1 já conectou'; 
        countpPlayers++;
    } else if(player2 === 'player 2'){
        player2 = arg;
        document.getElementById("player2").innerHTML = player2;
        countpPlayers++;
        modal.close();
    } else {
        console.log('limite de players atingido');
    }
    
})
