
import { ModalLoading } from './modal.js'

const modal = ModalLoading()
const socket = io();

let Nameplayer1 = 'player 1';
let Nameplayer2 = 'player 2';
var counter = 3

textModal('Bem vindo!', 'Esperando players', 'Para jogar conecte no /controller');

socket.on("player_join", (nickName) => {
    if(Nameplayer1 === 'player 1') {
        Nameplayer1 = nickName;
        document.getElementById("player1").innerHTML = Nameplayer1; 
        document.getElementById("playerWaiting").innerHTML = 'Player 1 já conectou'; 
    } else if(Nameplayer2 === 'player 2'){
        Nameplayer2 = nickName;
        document.getElementById("player2").innerHTML = Nameplayer2;
        setInterval(() => {
            if(counter <= 0) {
                modal.close()
                timer();
                clearInterval(timer);
            }
            textModal('Prepare-se',counter--)
        }, 1000);
    } else {
        console.log('limite de players atingido');
    } 
})

socket.on('player1move', (direction) => {
    console.log(direction);
})


socket.on('player2move', (direction) => {
    console.log(direction);
})

function textModal(bemVindo, waiting, play, player1) {
    bemVindo ? document.getElementById("BemVindo").innerHTML = bemVindo : document.getElementById("BemVindo").innerHTML = '';
    waiting ? document.getElementById("waiting").innerHTML = waiting : document.getElementById("waiting").innerHTML = ''; 
    play ? document.getElementById("play").innerHTML = play : document.getElementById("play").innerHTML = ''; 
    player1 ? document.getElementById("playerWaiting").innerHTML = player1 : document.getElementById("playerWaiting").innerHTML = ''; 
}

function timer() {
    var minutes = 3
    var seconds = 0
    var timerdisplay = document.getElementById('timer-display')
    var timer = setInterval(() => {
        timerdisplay.innerHTML = (seconds >= 10) ? minutes + ":" + seconds : minutes + ":0" + seconds
        if(minutes < 1){
            document.getElementById('timer-display').style.color = "red"
        }
        if (seconds <= 0 && minutes == 0) {
            console.log('terminou o timer');
            modal.open();
            textModal('FIM!');
            clearInterval(timer);
        }
        if(seconds == 0) {
            seconds = 60
            minutes -=1
        }
        seconds--;
    }, 1000);
}

