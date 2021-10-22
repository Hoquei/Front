
import { ModalLoading } from './modal.js'

const modal = ModalLoading()
const socket = io();

let Nameplayer1 = 'player 1';
let Nameplayer2 = 'player 2';
let counter = 3

var Player = {
	new: function (side, numHitter) {
		return {
			id: numHitter,
			width: 50,
			height: 200, 
			x: side === 'left' ? 50 : maxRes - 200,
			y: 250,
			speed: 25,
			score: 0,

			centro: [50, 60],
			meios: [[30, 50], [60, 70]],
			pontas: [[0, 30], [70, 100]],
		};
	},
}

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
                clearInterval();
                modal.close() 
            }
            textModal('Prepare-se',counter--)
        }, 1000);
        timer();
    } else {
        console.log('limite de players atingido');
    } 
})
box = document.getElementById('test');

// TEST
var cnv = document.querySelector("canvas");
var ctx = cnv.getContext("2d");
ctx.fillRect(10,20,50,80);

var Game = {
    initialize: function() {
        this.player1 = Player.new.call(this, 'left', 1);
        var speed = 10
        socket.on('player1move', (direction) => {
            
            switch(direction){
                case 'right':
                    
                    break;
            }
            console.log(direction);
        })
        
        socket.on('player2move', (direction) => {
            console.log(direction);
        })
    }
}


function textModal(bemVindo, waiting, play, player1) {
    bemVindo ? document.getElementById("BemVindo").innerHTML = bemVindo : document.getElementById("BemVindo").innerHTML = '';
    waiting ? document.getElementById("waiting").innerHTML = waiting : document.getElementById("waiting").innerHTML = ''; 
    play ? document.getElementById("play").innerHTML = play : document.getElementById("play").innerHTML = ''; 
    player1 ? document.getElementById("playerWaiting").innerHTML = player1 : document.getElementById("playerWaiting").innerHTML = ''; 
}

function timer() {
    var minutes = 3
    var seconds = 3
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

