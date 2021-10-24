
import { ModalLoading } from './modal.js'

const modal = ModalLoading()
const socket = io();

let Nameplayer1 = 'player 1';
let Nameplayer2 = 'player 2';
let counter = 3

var Game = {

    //Player 1 move commands
    player1move: function(direction) {
        console.log(typeof(direction));
        
        if (direction > 350 || direction < 10){
            moveBaixo1 = false; moveCima1 = false; moveEsquerda1 = false; moveDireita1 = true;
        } else if (direction < 100 && direction > 80){
            moveBaixo1 = false; moveCima1 = true; moveEsquerda1 = false; moveDireita1 = false;
        } else if (direction < 190 && direction > 170){
            moveBaixo1 = false; moveCima1 = false; moveEsquerda1 = true; moveDireita1 = false;
        }  else if (direction < 280 && direction > 250){
            moveBaixo1 = true; moveCima1 = false; moveEsquerda1 = false; moveDireita1 = false;
        }
        
        else if (direction > 10 && direction < 80 ){
            moveBaixo1 = false; moveCima1 = true; moveEsquerda1 = false; moveDireita1 = true;
        } else if (direction > 100 && direction < 170){
        moveBaixo1 = false; moveCima1 = true; moveEsquerda1 = true; moveDireita1 = false;
        } else if (direction > 190 && direction < 250){
            moveBaixo1 = true; moveCima1 = false; moveEsquerda1 = true; moveDireita1 = false;
        }  else if (direction > 280 && direction < 350){
            moveBaixo1 = true; moveCima1 = false; moveEsquerda1 = false; moveDireita1 = true;
        }

        renderPlayer1();
    },

    //Player 2 move commands
    player2move: function(direction) {
        console.log(typeof(direction));
        
        if (direction > 350 || direction < 10){
            moveBaixo2 = false; moveCima2 = false; moveEsquerda2 = false; moveDireita2 = true;
        } else if (direction < 100 && direction > 80){
            moveBaixo2 = false; moveCima2 = true; moveEsquerda2 = false; moveDireita2 = false;
        } else if (direction < 190 && direction > 170){
            moveBaixo2 = false; moveCima2 = false; moveEsquerda2 = true; moveDireita2 = false;
        }  else if (direction < 280 && direction > 250){
            moveBaixo2 = true; moveCima2 = false; moveEsquerda2 = false; moveDireita2 = false;
        }
        
        else if (direction > 10 && direction < 80 ){
            moveBaixo2 = false; moveCima2 = true; moveEsquerda2 = false; moveDireita2 = true;
        } else if (direction > 100 && direction < 170){
        moveBaixo2 = false; moveCima2 = true; moveEsquerda2 = true; moveDireita2 = false;
        } else if (direction > 190 && direction < 250){
            moveBaixo2 = true; moveCima2 = false; moveEsquerda2 = true; moveDireita2 = false;
        }  else if (direction > 280 && direction < 350){
            moveBaixo2 = true; moveCima2 = false; moveEsquerda2 = false; moveDireita2 = true;
        }

        renderPlayer2();
    },
    player1ChangeDirection: function(direction){
       console.log(direction);
        
    },

    //Player 1 stop moving function.
    player1stop: function() {
        moveBaixo1 = moveCima1 = moveEsquerda1 = moveDireita1 = false;
    },

    //Player 2 stop moving function.
    player2stop: function() {
        moveBaixo2 = moveCima2 = moveEsquerda2 = moveDireita2 = false;
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

//Player 1 stop moving
socket.on('player1stop', () => {
    console.log("stopped");
    Game.player1stop();
})

//Player 2 stop moving
socket.on('player2stop', () => {
    console.log("stopped");
    Game.player2stop();
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

var cnv = document.querySelector("canvas");
var ctx = cnv.getContext("2d");

var p1 = {
    x: 10,
    y: 10
};

var p2 = {
    x: 100,
    y: 10
};
var widght = cnv.width;
var height = cnv.height;
var moveEsquerda1 = false, moveDireita1 = false, moveCima1 = false, moveBaixo1 = false;
var moveEsquerda2 = false, moveDireita2 = false, moveCima2 = false, moveBaixo2 = false;

updatePlayer1();
updatePlayer2();

function movePlayer1(){
    if(moveEsquerda1 && p1.x > 0) p1.x--;
    if(moveDireita1 && p1.x < widght-100) p1.x++;
    if(moveCima1 && p1.y > 0) p1.y--;
    if(moveBaixo1 && p1.y < height-100) p1.y++;
}

function movePlayer2(){
    if(moveEsquerda2 && p2.x > 0) p2.x--;
    if(moveDireita2 && p2.x < widght-100) p2.x++;
    if(moveCima2 && p2.y > 0) p2.y--;
    if(moveBaixo2 && p2.y < height-100) p2.y++;
}

function renderPlayer1(){
    ctx.clearRect(0,0,cnv.width,cnv.height);
    ctx.fillRect(p1.x, p1.y, 50, 50)
}

function renderPlayer2(){
    ctx.clearRect(100,0,cnv.width,cnv.height);
    ctx.fillRect(p2.x, p2.y, 50, 50)
}

function updatePlayer1(){
    requestAnimationFrame(updatePlayer1, cnv);
    movePlayer1();
    renderPlayer1();
}

function updatePlayer2(){
    requestAnimationFrame(updatePlayer2, cnv);
    movePlayer2();
    renderPlayer2();
}