class Enemy {
    constructor(velX, velY, posX, posY, color) {
        this.velX = velX;
        this.velY = velY;
        this.posX = posX;
        this.posY = posY;
        this.delete = false;
        this.color = 'rgb(255,0,0)';
    }

    draw(dt){
        this.posX += this.velX * dt / 100;
        this.posY += this.velY * dt / 100;

        if (this.posX < -this.radius || this.posY < -this.radius || this.posX > WIDTH + this.radius || this.posY > HEIGHT + this.radius) {
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

class Projectile {
    constructor(x, y, velX, velY) {
        this.x = x;
        this.y = y;        
        this.velX = velX;
        this.velY = velY;
        this.delete = false;
        this.radius = 3;
        this.color = 'rgb(255,255,255)';
    }

    update(dt){
        this.x += this.velX * dt;
        this.y += this.velY * dt;

        if (this.x < -this.radius || this.posY < -this.radius || this.x > WIDTH + this.radius || this.y > HEIGHT + this.radius) {
            this.delete = true;
        }

    }

    draw(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();

    }
}

class Coin {
    constructor(velX, velY, posX, posY, color) {
        this.velX = velX;
        this.velY = velY;
        this.posX = posX;
        this.posY = posY;
        this.delete = false;
        this.color = 'rgb(255,215,0)';
    }

    draw(dt){
        this.posX += this.velX * dt / 100;
        this.posY += this.velY * dt / 100;

        if (this.posX < -this.radius || this.posY < -this.radius || this.posX > WIDTH + this.radius || this.posY > HEIGHT + this.radius) {
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

class Player {
    velX = 0;
    velY = 0;

    keyLeft = false;
    keyRight = false;
    keyUp = false;
    keyDown = false;

    shootChargeTime = 250;
    shootCooldown = 0;

    speed = 1;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.delete = false;
        this.radius = 10;
        this.color = 'rgb(0,255,0)';
    }

    update(dt){

        this.x += this.velX * dt / 4;
        this.y += this.velY * dt / 4;

        this.shootCooldown += dt;

        this.collide();
    }

    draw(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    moveDirection() {
        let diag = this.speed / Math.sqrt(2);

        if (this.keyUp) {
            if (this.keyLeft) {
                this.velX = -diag;
                this.velY = -diag;
            } else if (this.keyRight) {
                this.velX = diag;
                this.velY = -diag;
            } else {
                this.velX = 0;
                this.velY = -this.speed;
            }
        } else if (this.keyDown) {
            if (this.keyLeft) {
                this.velX = -diag;
                this.velY = diag;
            } else if (this.keyRight) {
                this.velX = diag;
                this.velY = diag;
            } else {
                this.velX = 0;
                this.velY = this.speed;
            }
        } else if (this.keyLeft) {
            this.velX = -this.speed;
            this.velY = 0;
        } else if (this.keyRight) {
            this.velX = this.speed;
            this.velY = 0;
        } else {
            this.velX = 0;
            this.velY = 0;
        }
    }

    collide() {
        //collide with wall
        if (this.x - this.radius < 0) {
            this.velX = 0;
            this.x = this.radius;
        }

        if (this.x + this.radius > WIDTH) {
            this.velX = 0;
            this.x = WIDTH - this.radius;
        }

        if (this.y - this.radius < 0) {
            this.velY = 0;
            this.y = this.radius;
        }

        if (this.y + this.radius > HEIGHT) {
            this.velY = 0;
            this.y = HEIGHT - this.radius;
        }
    }

    shoot(endX, endY) {
        if (this.shootCooldown >= this.shootChargeTime) {


            this.shootCooldown = 0;
            
            let angle = Math.atan2(endY - this.y, endX - this.x);

            let velX = Math.cos(angle);
            let velY = Math.sin(angle);

            projectiles.push(new Projectile(this.x, this.y, velX, velY));

        }
    }
}