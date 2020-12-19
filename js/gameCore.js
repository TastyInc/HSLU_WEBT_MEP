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

let then = Date.now();
let totalTime = 0;
let gameStarted = false;

c.font = "50px Tahoma Bold";
c.fillStyle = "gold";
c.textAlign = "center";
c.fillText("CLICK TO PLAY", WIDTH/2, HEIGHT/2);

//Startet das Spiel oder schiest Projektil falls gestartet
canvas.addEventListener('click', function(event) {
    if(gameStarted) {

        player.shoot(event.clientX - canvas.offsetLeft, event.offsetY);
    } else {
        gameStarted = true
        player = new Player(WIDTH / 2, HEIGHT / 2);
        animateGameCanvas();
    }
}, false);

function createEntity(type) {
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

    let angle = Math.atan2(player.y - posY, player.x - posX);

    let velX = Math.cos(angle);
    let velY = Math.sin(angle);

    switch(type) {
        case "enemy":
            enemies.push(new Enemy(posX, posY, velX, velY));
            break;
        case "coin":
            coins.push(new Coin(posX, posY, velX, velY));
            break;
        default:
    }
    
}

//Animation Loop for Game Canvas
function animateGameCanvas() {
    let now = Date.now();

    c.clearRect(0, 0, WIDTH, HEIGHT);

    //Delta Time ausrechnen und jede Velocity der Entitäten damit berechnen 
    let dt = (now - then);
    totalTime += dt;


    if(enemies.length <= Math.round(totalTime / 1000)) {
        createEntity("enemy");

        //10% Chance
        if(Math.random() * 100 < 10) {
            createEntity("coin");
        }
    }


    if(coins.length == 0) {
        if(Math.random() * 100 == 100) {
            console.log("TET");
        }
    }


    player.update(dt);
    player.draw();
    
    for (var i = projectiles.length - 1; i >= 0; i--) {
        projectiles[i].update(dt);
        projectiles[i].draw();

        if (projectiles[i].delete) {
            projectiles.splice(i, 1);
        }
    }

    for (var i = enemies.length - 1; i >= 0; i--) {
        enemies[i].update(dt);
        enemies[i].draw();

        if (enemies[i].delete) {
            enemies.splice(i, 1);
        }
    }

    for (var i = coins.length - 1; i >= 0; i--) {
        coins[i].update(dt);
        coins[i].draw();

        if (coins[i].delete) {
            coins.splice(i, 1);
        }
    }

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
    then = now;

    requestAnimationFrame(animateGameCanvas);
}









// Input Events für Spieler Movement und Schiessen
addEventListener("keydown", (event) => {

    switch (event.code) {
        case 'KeyA': // <-
            player.keyLeft = true;
            break;
        case 'KeyW': // /\
            player.keyUp = true;
            break;
        case 'KeyD': // ->
            player.keyRight = true;
            break;
        case 'KeyS': // \/
            player.keyDown = true;
            break;
        case 'ArrowLeft':
            player.setShootDirection("left");
            break;
        case 'ArrowUp':
            event.preventDefault();
            player.setShootDirection("up");
            break;
        case 'ArrowRight':
            player.setShootDirection("right");
            break;
        case 'ArrowDown':
            event.preventDefault();
            player.setShootDirection("down");
            break;
        case 'KeyL': // L: Debug
            DEBUG = !DEBUG;
            break;
        case 'KeyR': // R: RESET
            core.setupLevel(menu.selectedLevelNr);
            break;
        case 'Space':
            event.preventDefault();
            break;
        default:
            break;
    }

    player.moveDirection();
    
})

//keyUp
addEventListener("keyup", (event) => {

    switch (event.code) {
        case 'KeyA': // <-
            player.keyLeft = false;
            break;
        case 'KeyW': // /\
            player.keyUp = false;
            break;
        case 'KeyD': // ->
            player.keyRight = false;
            break;
        case 'KeyS': // \/
            player.keyDown = false;
            break;
        case 'ArrowLeft':
            if (player.shootDirection == "left") {
                player.setShootDirection(null);
            }
            break;
        case 'ArrowUP':
            if (player.shootDirection == "up") {
                player.setShootDirection(null);
            }
            break;
        case 'ArrowRight':
            if (player.shootDirection == "right") {
                player.setShootDirection(null);
            }
            break;
        case 'ArrowDown':
            if (player.shootDirection == "down") {
                player.setShootDirection(null);
            }
            break;
        default:
            break;
    }

    player.moveDirection();
})