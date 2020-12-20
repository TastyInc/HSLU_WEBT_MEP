class Enemy {
    constructor(x, y, velX, velY) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.delete = false;
        this.radius = Math.random() * 10 + 5;
        this.color = 'rgb(230,50,20)';
    }

    update(dt){
        this.x += this.velX * dt / 10;
        this.y += this.velY * dt / 10;

        //Falls ausserhalb des Canvas -> Objekt löschen
        if (this.x < -this.radius || this.y < -this.radius || this.x > WIDTH + this.radius || this.y > HEIGHT + this.radius) {
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

        if (this.x < -this.radius || this.y < -this.radius || this.x > WIDTH + this.radius || this.y > HEIGHT + this.radius) {
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
    constructor(x, y, velX, velY) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.delete = false;
        this.radius = 20;
        this.color = 'rgb(50,255,100)';
        this.rotation = 0;
        this.rotMult = Math.random() * 2 - 1;
    }

    update(dt){
        this.x += this.velX * dt / 15;
        this.y += this.velY * dt / 15;
        this.rotation += dt / 10 * this.rotMult;

        if (this.x < -this.radius || this.y < -this.radius || this.x > WIDTH + this.radius || this.y > HEIGHT + this.radius) {
            this.delete = true;
        }
    }


    draw(){
        c.save();
        c.translate(this.x + this.radius / 2, this.y + this.radius / 2)
        c.rotate(this.rotation * Math.PI / 180);
        c.translate(-this.x - this.radius / 2, -this.y - this.radius / 2)
        c.fillStyle = this.color
        c.fillRect(this.x, this.y, this.radius, this.radius);
        c.restore();
    }
}

class Player {
    velX = 0;
    velY = 0;

    keyLeft = false;
    keyRight = false;
    keyUp = false;
    keyDown = false;

    shootChargeTime = 200;
    shootCooldown = 0;

    speed = 1;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.delete = false;
        this.radius = 10;
        this.color = 'rgb(96, 80, 255)';
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