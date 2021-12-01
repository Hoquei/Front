import { ModalLoading } from './modal.js'

// Initialize variables.
const modal = ModalLoading()
const socket = io();
let Nameplayer1 = 'player 1';
let Nameplayer2 = 'player 2';
let scorePlayer1 = 0;
let scorePlayer2 = 0;
let counter = 3
var cnv = document.querySelector("canvas");
var ctx = cnv.getContext("2d");
var sprites = [];

// Initialize the coordinates of the player on modal.
var Player = {
    new: function(playerID, side, color){
        return{
            id: playerID,
            widght: 50,
            height: 50,
            x: side === 'left'? 250 : 1200,
            y: 300,
            speed: 5,
            color: color
        };
    },
}

var Puck = {
    new: function(puckID){
        return{
            id: puckID,
            x: 400,
            y: 300,
            color: "#000000"
        };
    },
}

var p1 = Player.new.call(this, 1, 'left', "#FF0101")
var p2 = Player.new.call(this, 2,'right', "#01FF0A")
var puck = Puck.new.call(this, 3);

sprites.push(p1);
sprites.push(p2);
sprites.push(puck);

// Player 1 direction variables.
var moveEsquerda1 = false, moveDireita1 = false, moveCima1 = false, moveBaixo1 = false;
// Player 2 direction variables.
var moveEsquerda2 = false, moveDireita2 = false, moveCima2 = false, moveBaixo2 = false;

var Game = {

    // Player 1 move commands.
    player1move: function(direction, force) {
        // if the direction is right
        if (direction > 350 || direction < 10){
            moveBaixo1 = false; moveCima1 = false; moveEsquerda1 = false; moveDireita1 = true;
        // if the direction is up
        } else if (direction < 100 && direction > 80){
            moveBaixo1 = false; moveCima1 = true; moveEsquerda1 = false; moveDireita1 = false;
        // if the direction is left
        } else if (direction < 190 && direction > 170){
            moveBaixo1 = false; moveCima1 = false; moveEsquerda1 = true; moveDireita1 = false;
        // if the direction is down
        }  else if (direction < 280 && direction > 250){
            moveBaixo1 = true; moveCima1 = false; moveEsquerda1 = false; moveDireita1 = false;
        }
        
        // if the direction is right-up diagonal
        else if (direction > 10 && direction < 80 ){
            moveBaixo1 = false; moveCima1 = true; moveEsquerda1 = false; moveDireita1 = true;   
        // if the direction is left-up diagonal
        } else if (direction > 100 && direction < 170){
            moveBaixo1 = false; moveCima1 = true; moveEsquerda1 = true; moveDireita1 = false;
        // if the direction is left-down diagonal
        } else if (direction > 190 && direction < 250){
            moveBaixo1 = true; moveCima1 = false; moveEsquerda1 = true; moveDireita1 = false;
        // if the direction is right-down diagonal
        }  else if (direction > 280 && direction < 350){
            moveBaixo1 = true; moveCima1 = false; moveEsquerda1 = false; moveDireita1 = true;
        }
        console.log("força " + force);
        if(force == 0){
            p1.speed = 0;
        } 
        else if(force > 0 && force < 0.5) p1.speed = 0.5;
        else if(force > 0.5 && force < 1) p1.speed = 1;
        else if(force > 1 && force < 2) p1.speed = 1.5;
        else if(force > 2 && force < 3) p1.speed = 2;
        else if(force > 3 && force < 6) p1.speed = 4;
    
    },

    // Player 2 move commands.
    player2move: function(direction, force) {
            // if the direction is right
        if (direction > 350 || direction < 10){
            moveBaixo2 = false; moveCima2 = false; moveEsquerda2 = false; moveDireita2 = true;
            // if the direction is up
        } else if (direction < 100 && direction > 80){
            moveBaixo2 = false; moveCima2 = true; moveEsquerda2 = false; moveDireita2 = false;
            // if the direction is left
        } else if (direction < 190 && direction > 170){
            moveBaixo2 = false; moveCima2 = false; moveEsquerda2 = true; moveDireita2 = false;
            // if the direction is down
        }  else if (direction < 280 && direction > 250){
            moveBaixo2 = true; moveCima2 = false; moveEsquerda2 = false; moveDireita2 = false;
        }

        // if the direction is right-up diagonal
        else if (direction > 10 && direction < 80 ){
            moveBaixo2 = false; moveCima2 = true; moveEsquerda2 = false; moveDireita2 = true;
            // if the direction is left-up diagonal
        } else if (direction > 100 && direction < 170){
            moveBaixo2 = false; moveCima2 = true; moveEsquerda2 = true; moveDireita2 = false;
            // if the direction is left-down diagonal
        } else if (direction > 190 && direction < 250){
            moveBaixo2 = true; moveCima2 = false; moveEsquerda2 = true; moveDireita2 = false;
            // if the direction is right-down diagonal
        }  else if (direction > 280 && direction < 350){
            moveBaixo2 = true; moveCima2 = false; moveEsquerda2 = false; moveDireita2 = true;
        }
        
    },

    player1ChangeDirection: function(direction){
       console.log(direction);
    },
    // Player 1 stop moving function.
    player1stop: function() {
        moveBaixo1 = moveCima1 = moveEsquerda1 = moveDireita1 = false;
    },
    // Player 2 stop moving function.
    player2stop: function() {
        moveBaixo2 = moveCima2 = moveEsquerda2 = moveDireita2 = false;
    },

}

// Rendering waiting players screen (principal screen: modal).
textModal('Bem vindo!', 'Esperando players', 'Para jogar conecte no /controller');
atualizarPlacar();

// Player 1 join socket.
socket.on('player1join', (player) => {
    Nameplayer1 = player.nickName;
    document.getElementById("player1").innerHTML = Nameplayer1; 
    document.getElementById("playerWaiting").innerHTML = 'Player 1 já conectou'; 
})

// Player 2 join socket.
socket.on('player2join', (player) => {
    Nameplayer2 = player.nickName;
    document.getElementById("player2").innerHTML = Nameplayer2;
    var waitGame = setInterval(() => {
        // if the counter get 0 close modal
        if(counter <= 0) {
            modal.close();
            clearInterval(waitGame);
            timer();
        }
        textModal('Prepare-se',counter--)
    }, 1000);
})

// Player 1 move socket.
socket.on('player1move', (direction, force) => {
    console.log("força " + force);
    Game.player1move(direction, force);
})
// Player 2 move socket.
socket.on('player2move', (direction, force) => {
    Game.player2move(direction, force);
})

// Player 1 stop moving.
socket.on('player1stop', () => {
    console.log("player 1 stopped");
    Game.player1stop();
})

// Player 2 stop moving.
socket.on('player2stop', () => {
    console.log("player 2 stopped");
    Game.player2stop();
})

// Waiting players screen set variables function.
function textModal(bemVindo, waiting, play, player1) {
    bemVindo ? document.getElementById("BemVindo").innerHTML = bemVindo : document.getElementById("BemVindo").innerHTML = '';
    waiting ? document.getElementById("waiting").innerHTML = waiting : document.getElementById("waiting").innerHTML = ''; 
    play ? document.getElementById("play").innerHTML = play : document.getElementById("play").innerHTML = ''; 
    player1 ? document.getElementById("playerWaiting").innerHTML = player1 : document.getElementById("playerWaiting").innerHTML = ''; 
}

// Match timer.
function timer() {
    var minutes = 3
    var seconds = 0
    var timerdisplay = document.getElementById('timer-display')
    var timer = setInterval(() => {
        timerdisplay.innerHTML = (seconds >= 10) ? minutes + ":" + seconds : minutes + ":0" + seconds
        
        // if the time is less than a minute 
        if(minutes < 1){
            document.getElementById('timer-display').style.color = "red"
        }
        // if the seconds and minutes are 0
        if (seconds <= 0 && minutes == 0) {
            console.log('terminou o timer');
            gameOver('O tempo acabou!', scorePlayer1 > scorePlayer2 ? Nameplayer1 : (scorePlayer1 < scorePlayer2 ? Nameplayer2 : 'Ninguém'));
            clearInterval(timer);
        }
        //if the seconds is 0 recude minute
        if(seconds == 0) {
            seconds = 60
            minutes -=1
        }
        seconds--;
    }, 1000);
}

// Game over socket.
socket.on('gameOver', (message) =>{
    gameOver(message.message, message.winner);
})

// Principal screen socket for definition of default message.
socket.on('firstModal', () =>{
    textModal('Bem vindo!', 'Esperando players', 'Para jogar conecte no /controller');
})

// Function to identify the winner.
function gameOver(message, winner){
    modal.open();
    textModal('FIM DE JOGO!', message, (winner + ' venceu!'));
}

// Function to update score according to players points.
function atualizarPlacar(){
    document.getElementById("scorePlayer1").innerHTML = scorePlayer1
    document.getElementById("scorePlayer2").innerHTML = scorePlayer2
}

// Functions to move players according to the limits established by the field canvas.
function movePlayer1(){
    // move the player 1 left
    if(moveEsquerda1 && p1.x > 0) p1.x = p1.x - p1.speed;
    // move the player 1 right
    if(moveDireita1 && p1.x < 700) p1.x = p1.x + p1.speed;
    // move the player 1 up 
    if(moveCima1 && p1.y > 0) p1.y = p1.y - p1.speed;
    // move the player 1 down
    if(moveBaixo1 && p1.y < 595) p1.y = p1.y + p1.speed;
}

function movePlayer2(){
    // move the player 2 left
    if(moveEsquerda2 && p2.x > 751) p2.x = p2.x - p2.speed;
    // move the player 2 right
    if(moveDireita2 && p2.x < 1442) p2.x = p2.x + p2.speed;
    // move the player 2 up
    if(moveCima2 && p2.y > 0) p2.y = p2.y - p2.speed;
    // move the player 1 down
    if(moveBaixo2 && p2.y < 595) p2.y = p2.y + p2.speed;
}

function collision(){

    if((p1.x) == puck.x){
        puck.x = puck.x + (p1.speed + 10);
    }
    
    if((p1.y) == puck.y){
        puck.y = puck.y + (p1.speed + 10);
    }
}

function loop(){
    window.requestAnimationFrame(loop, cnv);
    update();
    render();
}

// Function to update the new position of the player on screen.
function update(){
    movePlayer1();

    movePlayer2();

    collision();
}

/* Function that render the player object conforms it walk through the screen:
   Erase the last position and render the new position on screen.
*/
function render(){
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    var i = 0;
    for(i; i < sprites.length; i++){
        var spr = sprites[i];
        if(spr.id != 3){
            ctx.fillStyle = spr.color;
            ctx.fillRect(spr.x, spr.y, spr.widght, spr.height);
        }
        else{
            ctx.fillStyle = spr.color;
            ctx.fillRect(spr.x, spr.y, 50, 50);
        }
    }
}
loop();