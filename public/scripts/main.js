
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
var Game = {
    player1move: function(direction) {
        console.log(typeof(direction));
        
        if (direction > 350 || direction < 10){
            moveBaixo = false; moveCima = false; moveEsquerda = false; moveDireita = true;
        } else if (direction < 100 && direction > 80){
            moveBaixo = false; moveCima = true; moveEsquerda = false; moveDireita = false;
        } else if (direction < 190 && direction > 170){
            moveBaixo = false; moveCima = false; moveEsquerda = true; moveDireita = false;
        }  else if (direction < 280 && direction > 250){
            moveBaixo = true; moveCima = false; moveEsquerda = false; moveDireita = false;
        }
        
        else if (direction > 10 && direction < 80 ){
            moveBaixo = false; moveCima = true; moveEsquerda = false; moveDireita = true;
        } else if (direction > 100 && direction < 170){
        moveBaixo = false; moveCima = true; moveEsquerda = true; moveDireita = false;
        } else if (direction > 190 && direction < 250){
            moveBaixo = true; moveCima = false; moveEsquerda = true; moveDireita = false;
        }  else if (direction > 280 && direction < 350){
            moveBaixo = true; moveCima = false; moveEsquerda = false; moveDireita = true;
        }

        render();
    },
    player1ChangeDirection: function(direction){
       console.log(direction);
        
    },
    player2move: function(direction) {
        console.log(direction);
    },

    //Player stop moving function.
    player1stop: function() {
        moveBaixo = moveCima = moveEsquerda = moveDireita = false;
    }
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

//Player move
socket.on('player1move', (direction) => {
    console.log(direction);
    Game.player1move(direction);
})
socket.on('player2move', (direction) => {
    console.log(direction);
    Game.player2move(direction);
})

 //Player stop moving
socket.on('player1stop', () => {
    console.log("stopped");
    Game.player1stop();
})
socket.on('player2stop', (direction) => {
    console.log(direction);
    Game.player2move(direction);
})

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

// TEST

var cnv = document.querySelector("canvas");
var ctx = cnv.getContext("2d");
ctx.fillRect(10,20,50,80);

var widght = cnv.width;
var height = cnv.height;
var UP = 38, DOWN = 40, LEFT = 37, RIGHT = 39;
var moveEsquerda = false, moveDireita = false, moveCima = false, moveBaixo = false;

var p1 = {
    x: 10,
    y: 10
};

update();
function move(){
    if(moveEsquerda && p1.x > 0) p1.x--;
    if(moveDireita && p1.x < widght-100) p1.x++;
    if(moveCima && p1.y > 0) p1.y--;
    if(moveBaixo && p1.y < height-100) p1.y++;
}

function render(){
    ctx.clearRect(0,0,cnv.width,cnv.height);
    ctx.fillRect(p1.x, p1.y, 50, 50)
}

function update(){
    requestAnimationFrame(update, cnv);
    move();
    render();
}