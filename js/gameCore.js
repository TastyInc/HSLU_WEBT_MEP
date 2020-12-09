/* FILLER CANVAS */
const canvas = document.getElementById('game-canvas');
const c = canvas.getContext('2d');
let WIDTH = document.getElementById('game-canvas').clientWidth;
let HEIGHT = WIDTH / 16 * 9;
canvas.width = WIDTH;
canvas.height = HEIGHT;

// Produces 10 particles every second
let entities = new Array();

c.font = "50px Tahoma Bold";
c.fillStyle = "gold";
c.textAlign = "center";
c.fillText("CLICK TO PLAY", WIDTH/2, HEIGHT/2);

canvas.addEventListener('click', function(event) {
    console.log(c);
    animateGameCanvas();
}, false);

class Entity {
    constructor(velX, velY, posX, posY) {
        this.velX = velX;
        this.velY = velY;
        this.posX = posX;
        this.posY = posY;
        this.delete = false;
        this.color = this.setColor();
    }

    setColor(){
        let r = Math.random() * 200 + 55;
        let g = Math.random() * 200 + 55;
        let b = Math.random() * 200 + 55;
        return "rgb(" + String(r) + ", " + String(g) + ", " + String(b) + ")";
    }

    draw(dt){
        this.posX += this.velX * WIDTH * dt / 10;
        this.posY += this.velY * HEIGHT * dt / 10;

        if (this.posX < 0 || this.posY < 0|| this.posX > WIDTH || this.posY > HEIGHT) {
            this.delete = true;
        } else {
            c.beginPath();
            c.arc(this.posX, this.posY, 10, 0, Math.PI * 2);
            c.fillStyle = this.color;
            c.fill();
            c.closePath();
        } 
    }
}

function createEntity() {
    if(particles.length < 50 && window.scrollY < window.innerHeight) {
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
    
        particles.push(new Particle(Math.random() * 2 - 1, Math.random() * 2 - 1, posX, posY));
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
