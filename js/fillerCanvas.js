/* FILLER CANVAS */
const fillerCvx = document.getElementById('filler-canvas');
const cvx = fillerCvx.getContext('2d');
let fillerWIDTH = window.innerWidth;
let fillerHEIGHT = window.innerHeight;

// Produces 10 particles every second
let fillerCanvasInterval = setInterval(createParticle, 100);
let fillerParticles = new Array();

class fillerParticle {
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
        this.posX += this.velX * fillerWIDTH * dt / 10;
        this.posY += this.velY * fillerHEIGHT * dt / 10;

        if (this.posX < 0 || this.posY < 0|| this.posX > fillerWIDTH || this.posY > fillerHEIGHT) {
            this.delete = true;
        } else {
            cvx.beginPath();
            cvx.arc(this.posX, this.posY, 10, 0, Math.PI * 2);
            cvx.fillStyle = this.color;
            cvx.fill();
            cvx.closePath();
        } 
    }
}

function createParticle() {
    if(fillerParticles.length < 50 && window.scrollY < window.innerHeight) {
        let posX;
        let posY;
    
        let rng = Math.floor(Math.random() * 4);
    
        switch(rng) {
            case 0:
                posX = 0
                posY = Math.random() * fillerHEIGHT;
                break;
            case 1:
                posX = fillerWIDTH
                posY = Math.random() * fillerHEIGHT;
                break;
            case 2:
                posX = Math.random() * fillerWIDTH;
                posY = fillerHEIGHT;
                break;
            case 3:
                posX = Math.random() * fillerWIDTH;
                posY = 0;
                break;
            default:
        }
    
        fillerParticles.push(new fillerParticle(Math.random() * 2 - 1, Math.random() * 2 - 1, posX, posY));
    }
}


window.onresize = function() {
    fillerCvx.width = fillerWIDTH = window.innerWidth;
    fillerCvx.height = fillerHEIGHT = window.innerHeight;
};

window.onload = function() {
    fillerCvx.width = fillerWIDTH;
    fillerCvx.height = fillerHEIGHT;
    
    animateFillerCanvas();
}

//Animation Loop for canvas
function animateFillerCanvas() {
    let now = Date.now();

    if(window.scrollY < window.innerHeight) {
        let dt = (now - this.then) / 1000;
    
        cvx.clearRect(0, 0, fillerWIDTH, fillerHEIGHT);
    
        let fontSize = window.innerWidth / 20 + 20;

        cvx.font = fontSize + "px Tahoma Bold";
        cvx.fillStyle = "white";
        cvx.textAlign = "center";
        cvx.fillText("BLASTER", fillerWIDTH/2, fillerHEIGHT/2 + window.scrollY/1.8);

        for (var i = fillerParticles.length - 1; i >= 0; i--) {
            fillerParticles[i].draw(dt);
    
            if (fillerParticles[i].delete) {
                fillerParticles.splice(i, 1);
            }
        }
    }

    this.then = now;

    requestAnimationFrame(animateFillerCanvas);
}