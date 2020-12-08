/* FILLER CANVAS */
const canvas = document.getElementById('filler-canvas');
const c = canvas.getContext('2d');
let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

// Produces 10 particles every second
let fillerCanvasInterval = setInterval(createParticle, 100);
let particles = new Array();

class Particle {
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

function createParticle() {
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


window.onresize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

window.onload = function() {
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    animateFillerCanvas();
}

//Animation Loop for canvas
function animateFillerCanvas() {
    if(window.scrollY < window.innerHeight) {
        let now = Date.now();
        let dt = (now - this.then) / 1000;
    
        c.clearRect(0, 0, WIDTH, HEIGHT);
    
        for (var i = particles.length - 1; i >= 0; i--) {
            particles[i].draw(dt);
    
            if (particles[i].delete) {
                particles.splice(i, 1);
            }
        }

        this.then = now;
    }

    requestAnimationFrame(animateFillerCanvas);
}