/* GAME CANVAS */
const canvas = document.getElementById('game-canvas');
const c = canvas.getContext('2d');
let WIDTH = document.getElementById('game-canvas').clientWidth;
let HEIGHT = WIDTH / 16 * 9; // 16:9 Aspect Ratiooo
canvas.width = WIDTH;
canvas.height = HEIGHT;

let enemies = new Array();
let projectiles = new Array();
let coins = new Array();
let player = new Player();

let then;
let totalTime;
let gameStarted = false;
let gameOver = false;
let score;

c.font = "50px Tahoma Bold";
c.fillStyle = "gold";
c.textAlign = "center";
c.fillText("Press [SPACE] to play", WIDTH/2, HEIGHT/2);

updateScore(0);

//Schiesst Projektil, falls Spiel gestartet
canvas.addEventListener('click', function(event) {
    if(gameStarted) {
        player.shoot(event.clientX - canvas.offsetLeft, event.offsetY);
    } 
}, false);

function startGame() {
    if(!gameStarted) {
        gameStarted = true
        then = Date.now()
        enemies = [];
        projectiles = [];
        coins = [];
        totalTime = 0;
        score = 0;
        player = new Player(WIDTH / 2, HEIGHT / 2);
    
        animateGameCanvas();
    }
}

function createEntity(type) {
    let posX;
    let posY;

    let rng = Math.floor(Math.random() * 4);

    //zufällige Position an einem der 4 Ränder
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
    if (document.hasFocus()) {
        let now = Date.now();

        c.clearRect(0, 0, WIDTH, HEIGHT);

        //Delta Time ausrechnen und jede Velocity der Entitäten damit berechnen (für eine konsistente Spielgeschwindigkeit)
        let dt = (now - then);
        totalTime += dt;
        score += Math.round(dt / 10);

        if(enemies.length <= Math.round(totalTime / 1000)) {
            createEntity("enemy");

            //10% Chance
            if(Math.random() * 100 < 10) {
                createEntity("coin");
            }
        }

        player.update(dt);
        player.draw();
        
        //umgekehrter For Loop damit splice richtig funktioniert...
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

            //collision Gegner und spieler
            if(collisionDetection(enemies[i], player)){
                gameOver = true;
            }

            //collision Gegner & Projektile
            projectiles.forEach(proj => {
                if(collisionDetection(enemies[i], proj)){
                    proj.delete = true;
                    enemies[i].delete = true;
                    score += 80;
                }
            })

            if (enemies[i].delete) {
                enemies.splice(i, 1);
            }
        }

        for (var i = coins.length - 1; i >= 0; i--) {
            coins[i].update(dt);
            coins[i].draw(player.coins);

            //collision von Coins und Spieler
            if(collisionDetection(coins[i], player)){
                coins[i].delete = true;
                score += 450;
            }

            if (coins[i].delete) {
                coins.splice(i, 1);
            }
        }

        c.font = "20px Courier";
        c.fillStyle = "rgb(255,255,255)";
        c.textAlign = "right";
        c.fillText(score, 120, 40);

        then = now;

    } else {
        then = Date.now();
    }

    //Animation nur, solang spiel auch am laufen ist
    if(!gameOver){
        requestAnimationFrame(animateGameCanvas);
    } else {
        c.font = "50px Tahoma Bold";
        c.fillStyle = "gold";
        c.textAlign = "center";
        c.fillText("Final Score: " + score, WIDTH/2, HEIGHT/2);
        c.fillText("Press [SPACE] to restart", WIDTH/2, HEIGHT/2 + 55);

        gameStarted = false;
        gameOver = false;
        updateScore(score);
    }
}


function collisionDetection(obj1, obj2) {
    if (obj1.x - obj2.x < obj1.radius + obj2.radius) {
        if (obj1.y - obj2.y < obj1.radius + obj2.radius) {
            let absqrt = (obj2.x - obj1.x) * (obj2.x - obj1.x) + (obj2.y - obj1.y) * (obj2.y - obj1.y); //Distanz zwischen Objekten
            let radsqrt = (obj1.radius + obj2.radius) * (obj1.radius + obj2.radius); //Radius der Objekte
            if (absqrt < radsqrt) {
                return true; //is colliding
            }
        }
    }

    return false;
}


function updateScore(score) {
    let formData = new FormData();

    formData.append("score", score)

    //Ajax
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "server.php", true); //<- Asynchron
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            document.getElementById("highscores").innerHTML = xhr.responseText;
        }
    };
    xhr.onerror = function (e) {
        document.getElementById("highscores").innerHTML = "ERROR:" + xhr.responseText;
    };
    xhr.send(formData);
}


// Input Events für Spieler Movement und Start
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
        case 'Space':
            event.preventDefault();
            break;
        default:
            break;
    }

    player.moveDirection();
    
})

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
        case 'Space': 
            startGame();
            break;
        default:
            break;
    }

    player.moveDirection();
})