
import { ModalLoading } from './modal.js'

const modal = ModalLoading()
const socket = io();

let Nameplayer1 = 'player 1';
let Nameplayer2 = 'player 2';
let countpPlayers = 0;

socket.on("player_join", (arg) => {
    if(Nameplayer1 === 'player 1') {
        Nameplayer1 = arg;
        document.getElementById("player1").innerHTML = Nameplayer1; 
        document.getElementById("playerWaiting").innerHTML = 'Player 1 já conectou'; 
        countpPlayers++;
    } else if(Nameplayer2 === 'player 2'){
        Nameplayer2 = arg;
        document.getElementById("player2").innerHTML = Nameplayer2;
        countpPlayers++;
        modal.close();
    } else {
        console.log('limite de players atingido');
    }
    
})
