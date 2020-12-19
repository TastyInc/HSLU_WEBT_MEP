class Enemy {
    constructor(velX, velY, posX, posY, color) {
        this.velX = velX;
        this.velY = velY;
        this.posX = posX;
        this.posY = posY;
        this.delete = false;
        this.color = this.setColor();
    }

    draw(dt){
        this.posX += this.velX * dt / 100;
        this.posY += this.velY * dt / 100;

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

class Coin {
    constructor(velX, velY, posX, posY, color) {
        this.velX = velX;
        this.velY = velY;
        this.posX = posX;
        this.posY = posY;
        this.delete = false;
        this.color = this.setColor();
    }

    draw(dt){
        this.posX += this.velX * dt / 100;
        this.posY += this.velY * dt / 100;

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

class Player {
    velX = 0;
    velY = 0;

    keyLeft = false;
    keyRight = false;
    keyUp = false;
    keyDown = false;

    shootDirection;
    shootChargeTime = 0.2;
    shootCooldown = 0;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.delete = false;
        this.radius = 10;
        this.color = 'rgb(0,255,0)';
    }

    update(dt){
        if (this.shootDirection != null) {
            this.shoot(dt);
        }

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

    setShootDirection(direction) {
        this.shootDirection = direction;
    }

    shoot(dt) {

        this.shootCooldown += dt;

        if (this.shootCooldown >= this.shootChargeTime) {
            this.shootCooldown = 0;

            let dirX = 0;
            let dirY = 0;

            switch (this.shootDirection) {
                case "up":
                    dirY -= 10;
                    break;
                case "down":
                    dirY = 10;
                    break;
                case "left":
                    dirX -= 10;
                    break;
                case "right":
                    dirX = 10;
                    break;
                default:
                    break;
            }

            createProjectile(this.x, this.y, dirX, dirY);

            /*
            let proj = new linProjectile(0);

            Util.applyTemplate(proj, prPlayer);
            proj.color = lvl.playerProjCol;
            proj.x = player.x;
            proj.y = player.y;
            proj.setAngleAndVelocity(player.x, player.y, player.x + dirX, player.y + dirY);
            proj.setup(proj);
            */
        }
    }
}