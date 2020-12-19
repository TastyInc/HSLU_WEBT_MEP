/* FILLER CANVAS */
const canvas = document.getElementById('game-canvas');
const c = canvas.getContext('2d');
let WIDTH = document.getElementById('game-canvas').clientWidth;
let HEIGHT = WIDTH / 16 * 9;
canvas.width = WIDTH;
canvas.height = HEIGHT;

let enemies = new Array();
let projectiles = new Array();
let coins = new Array();
let player = new Player();

c.font = "50px Tahoma Bold";
c.fillStyle = "gold";
c.textAlign = "center";
c.fillText("CLICK TO PLAY", WIDTH/2, HEIGHT/2);

//Starts the Game loooop
canvas.addEventListener('click', function(event) {
    player = new Player(WIDTH / 2, HEIGHT / 2);

    animateGameCanvas();
}, false);

function createEntity() {
    if(entities.length < 50 && window.scrollY < window.innerHeight) {
        let posX;
        let posY;
    
        let rng = Math.floor(Math.random() * 4);
    
        switch(rng) {
            case 0:
                posX = 0
                posY = Math.random() * HEIGHT;
                break;
            case 1:
                posX = WIDTH
                posY = Math.random() * HEIGHT;
                break;
            case 2:
                posX = Math.random() * WIDTH;
                posY = HEIGHT;
                break;
            case 3:
                posX = Math.random() * WIDTH;
                posY = 0;
                break;
            default:
        }
    
        entities.push(new Entity(Math.random() * 2 - 1, Math.random() * 2 - 1, posX, posY));
    }
}

//Animation Loop for Game Canvas
function animateGameCanvas() {
    let now = Date.now();

    c.clearRect(0, 0, WIDTH, HEIGHT);

    /*
    if(window.scrollY < window.innerHeight) {
        let dt = (now - this.then) / 1000;
    
    
        for (var i = particles.length - 1; i >= 0; i--) {
            particles[i].draw(dt);
    
            if (particles[i].delete) {
                particles.splice(i, 1);
            }
        }
    }
    */
    this.then = now;

    requestAnimationFrame(animateGameCanvas);
}









// Input Events für Spieler Movement und Schiessen
addEventListener("keydown", (event) => {

    switch (event.code) {
        case 65: // <-
            player.keyLeft = true;
            break;
        case 87: // /\
            player.keyUp = true;
            break;
        case 68: // ->
            player.keyRight = true;
            break;
        case 83: // \/
            player.keyDown = true;
            break;
        case 37:
            player.setShootDirection("left");
            break;
        case 38:
            player.setShootDirection("up");
            break;
        case 39:
            player.setShootDirection("right");
            break;
        case 40:
            player.setShootDirection("down");
            break;
        case 76: // L: Debug
            DEBUG = !DEBUG;
            break;
        case 82: // R: RESET
            core.setupLevel(menu.selectedLevelNr);
            break;
        case 77: // M: Menu
            core.setupMenu();
            break;
        case 27: // ESC
            musicPlayer.stop();
            core.setupMenu();
            break;
        default:
            break;
    }

    player.moveDirection();
    
})

//keyUp
addEventListener("keyup", (event) => {

    switch (event.code) {
        case 65: // <-
            player.keyLeft = false;
            break;
        case 87: // /\
            player.keyUp = false;
            break;
        case 68: // ->
            player.keyRight = false;
            break;
        case 83: // \/
            player.keyDown = false;
            break;
        case 37:
            if (player.shootDirection == "left") {
                player.setShootDirection(null);
            }
            break;
        case 38:
            if (player.shootDirection == "up") {
                player.setShootDirection(null);
            }
            break;
        case 39:
            if (player.shootDirection == "right") {
                player.setShootDirection(null);
            }
            break;
        case 40:
            if (player.shootDirection == "down") {
                player.setShootDirection(null);
            }
            break;
        default:
            break;
    }

    player.moveDirection();
})