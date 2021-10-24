
import { ModalLoading } from './modal.js'

const modal = ModalLoading()
const socket = io();

let Nameplayer1 = 'player 1';
let Nameplayer2 = 'player 2';
let scorePlayer1 = 0;
let scorePlayer2 = 0;

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
atualizarPlacar();

socket.on('player1join', (player) => {
    Nameplayer1 = player.nickName;
    document.getElementById("player1").innerHTML = Nameplayer1; 
    document.getElementById("playerWaiting").innerHTML = 'Player 1 já conectou'; 
})

socket.on('player2join', (player) => {
    Nameplayer2 = player.nickName;
    document.getElementById("player2").innerHTML = Nameplayer2;
    var waitGame = setInterval(() => {
        if(counter <= 0) {
            modal.close();
            clearInterval(waitGame);
            timer();
        }
        textModal('Prepare-se',counter--)
    }, 1000);
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
    var seconds = 0
    var timerdisplay = document.getElementById('timer-display')
    var timer = setInterval(() => {
        timerdisplay.innerHTML = (seconds >= 10) ? minutes + ":" + seconds : minutes + ":0" + seconds
        if(minutes < 1){
            document.getElementById('timer-display').style.color = "red"
        }
        if (seconds <= 0 && minutes == 0) {
            console.log('terminou o timer');
            gameOver('O tempo acabou!', scorePlayer1 > scorePlayer2 ? Nameplayer1 : (scorePlayer1 < scorePlayer2 ? Nameplayer2 : 'Ninguém'));
            clearInterval(timer);
        }
        if(seconds == 0) {
            seconds = 60
            minutes -=1
        }
        seconds--;
    }, 1000);
}

socket.on('gameOver', (message) =>{
    gameOver(message.message, message.winner);
})

socket.on('firstModal', () =>{
    textModal('Bem vindo!', 'Esperando players', 'Para jogar conecte no /controller');
})

function gameOver(message, winner){
    modal.open();
    textModal('FIM DE JOGO!', message, (winner + ' venceu!'));
}

function atualizarPlacar(){
    document.getElementById("scorePlayer1").innerHTML = scorePlayer1
    document.getElementById("scorePlayer2").innerHTML = scorePlayer2
}

var cnv = document.querySelector("canvas");
var ctx = cnv.getContext("2d");

var p1 = {
    x: 300,
    y: 300
};

var p2 = {
    x: 1200,
    y: 300
};
var widght = cnv.width;
var height = cnv.height;
var moveEsquerda1 = false, moveDireita1 = false, moveCima1 = false, moveBaixo1 = false;
var moveEsquerda2 = false, moveDireita2 = false, moveCima2 = false, moveBaixo2 = false;

updatePlayer1();
updatePlayer2();

function movePlayer1(){
    if(moveEsquerda1 && p1.x > 0) p1.x = p1.x - 10;
    if(moveDireita1 && p1.x < widght) p1.x =  p1.x + 10;
    if(moveCima1 && p1.y > 0) p1.y =  p1.y - 10;
    if(moveBaixo1 && p1.y < height) p1.y =  p1.y + 10;
}

function movePlayer2(){
    if(moveEsquerda2 && p2.x > 0) p2.x--;
    if(moveDireita2 && p2.x < widght) p2.x++;
    if(moveCima2 && p2.y > 0) p2.y--;
    if(moveBaixo2 && p2.y < height) p2.y++;
}

function renderPlayer1(){
    ctx.clearRect(0,0,cnv.width,cnv.height);
    ctx.fillRect(p1.x, p1.y, 50, 50)
}

function renderPlayer2(){
    ctx.clearRect(750,0,cnv.width,cnv.height);
    ctx.fillRect(p2.x, p2.y, 50, 50);
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