/* Form Header Click & Change Events */
let btnHeaderLogin = document.getElementById("form-header-login");
let btnHeaderRegister = document.getElementById("form-header-register");
let btnHeaderGuest = document.getElementById("form-header-guest");

btnHeaderLogin.addEventListener('click', event => {
    formHeaderClick("login");
});

btnHeaderRegister.addEventListener('click', event => {
    formHeaderClick("register");
});

btnHeaderGuest.addEventListener('click', event => {
    formHeaderClick("guest");
});

function formHeaderClick(formName) {
    document.getElementById("form-header-login").classList.remove("active");
    document.getElementById("form-header-register").classList.remove("active");
    document.getElementById("form-header-guest").classList.remove("active");

    document.getElementById("form-login").classList.remove("active");
    document.getElementById("form-register").classList.remove("active");
    document.getElementById("form-guest").classList.remove("active");

    document.getElementById("form-header-" + formName).classList.add("active");
    document.getElementById("form-" + formName).classList.add("active");
}

/* FILLER CANVAS*/


/*
var goToTop = document.querySelector('#backToTop');

goToTop.addEventListener("click", function(e){
    window.scroll({top: 0, left: 0, behavior: 'smooth'});
  //scroll smoothly back to the top of the page
});
*/

let viewStillInFiller = true;

window.addEventListener("scroll", function(){
    let nav = document.querySelector("nav");

    if(window.scrollY == 0){
        nav.style.backgroundColor = "transparent"; 
    } else {
        nav.style.backgroundColor = "#233434";

        if(window.scrollY >= window.innerHeight){
            viewStillInFiller = false;
        } else {
            viewStillInFiller = true;
        }
    }
});

const canvas = document.getElementById('filler-canvas');
const c = canvas.getContext('2d');
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;


class Particle {

    constructor(velX, velY, posX, posY) {
        this.velX = velX;
        this.velY = velY;
        this.posX = posX;
        this.posY = posY;
        this.delete = false;
    }

    draw(dt){
        this.posX += this.velX * WIDTH * dt / 10;
        this.posY += this.velY * HEIGHT * dt / 10;

        if (this.posX < 0 || this.posY < 0|| this.posX > WIDTH || this.posY > HEIGHT) {
            this.delete = true;
        } else {
            c.beginPath();
            c.arc(this.posX, this.posY, 10, 0, Math.PI * 2);
            c.fillStyle = "#FFF";
            c.fill();
            c.closePath();
        } 

    }
}

let fillerCanvasInterval = setInterval(createParticle, 100);
let particles = new Array();

function createParticle() {
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


window.onload = function() {
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    animateFillerCanvas();
}



function animateFillerCanvas() {
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

    if(viewStillInFiller){
        requestAnimationFrame(animateFillerCanvas);
    }

}