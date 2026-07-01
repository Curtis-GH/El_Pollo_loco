/**
 * Main game class. Manages the character, level, rendering and game logic.
 */
class World {
    character = new Character();
    level = createLevel1();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBar('health', 40, 0);
    statusBarCoin = new StatusBar('coin', 40, 50);
    statusBarBottle = new StatusBar('bottle', 40, 100);
    statusBarEndboss = new StatusBar('endboss', 480, 0);
    isRespawningBottles = false;
    throwableObjects = [];
    intervals = [];
    coinCount = 0;
    bottleCount = 0;
    gameEnded = false;
    soundManager;
    endboss = this.level ? this.level.enemies.find(e => e instanceof Endboss) : null;

    /**
     * Sets up the world, character reference and starts the game loops.
     * @param {HTMLCanvasElement} canvas - The game canvas.
     * @param {Keyboard} keyboard - The keyboard state object.
     * @param {SoundManager} soundManager - The sound manager instance.
     */
    constructor(canvas, keyboard, soundManager) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.soundManager = soundManager;
        this.endboss = this.level.enemies.find(e => e instanceof Endboss);
        this.setWorld();
        this.draw();
        this.run();
    }

    /**
     * Links the character back to this world instance.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts enemy animations and the main collision/logic loop.
     */
    run() {
        this.level.enemies.forEach(enemy => enemy.animate());
        let id = setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCoinCollisions();
            this.checkBottleCollisions();
            this.checkBottleEndbossCollisions();
            this.respawnBottles();
        }, 1000 / 60);
        this.intervals.push(id);
    }

    /**
     * Stops all intervals of the world and its objects.
     */
    stopGame() {
        this.intervals.forEach(id => clearInterval(id));
        this.intervals = [];
        this.character.clearIntervals();
        this.level.enemies.forEach(enemy => enemy.clearIntervals());
        this.throwableObjects.forEach(bottle => bottle.clearIntervals());
    }

    /**
     * Creates a thrown bottle if the throw key is pressed and bottles exist.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.bottleCount > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.bottleCount -= 20;
            if (this.bottleCount < 0) this.bottleCount = 0;
            this.statusBarBottle.setPercentage(this.bottleCount);
            this.soundManager.play('throw');
            this.keyboard.D = false;
        }
    }

    /**
     * Checks collisions between the character and all enemies.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => this.handleEnemyCollision(enemy));
        if (this.character.isDead()) {
            this.showGameOver();
        }
    }

    /**
     * Handles a single enemy collision (stomp kill or taking damage).
     * @param {MoveableObject} enemy - The enemy to check against.
     */
    handleEnemyCollision(enemy) {
        if (enemy instanceof Endboss) return;
        if (enemy.isChickenDead) return;
        if (this.character.isCollidingFromAbove(enemy)) {
            enemy.die();
            this.character.speedY = 20;
            this.soundManager.play('chickenDie');
        } else if (this.character.isColliding(enemy) && !this.character.isHurt()) {
            this.character.hit();
            this.statusBarHealth.setPercentage(this.character.energy);
            this.soundManager.play('hit');
        }
    }

    /**
     * Checks collisions between the character and coins and collects them.
     */
    checkCoinCollisions() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.coinCount += 20;
                if (this.coinCount > 100) this.coinCount = 100;
                this.statusBarCoin.setPercentage(this.coinCount);
                this.soundManager.play('coin');
            }
        });
    }

    /**
     * Checks collisions between the character and bottles and collects them.
     */
    checkBottleCollisions() {
        if (this.bottleCount >= 100) return;
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                this.bottleCount += 20;
                if (this.bottleCount > 100) this.bottleCount = 100;
                this.statusBarBottle.setPercentage(this.bottleCount);
                this.soundManager.play('bottle');
            }
        });
    }
    /**
     * Checks collisions between thrown bottles and the endboss.
     */
    checkBottleEndbossCollisions() {
        if (!this.endboss || this.endboss.isDead()) return;
        this.throwableObjects.forEach((bottle, index) => {
            if (this.endboss.isColliding(bottle)) {
                this.endboss.hitBoss();
                this.statusBarEndboss.setPercentage(this.endboss.energy);
                this.throwableObjects.splice(index, 1);
                this.soundManager.playEndbossHit();
            }
        });
        if (this.endboss.isDead()) {
            this.showWin();
        }
    }

    /**
     * Respawns three bottles across the level when none are left.
     */
    respawnBottles() {
        if (this.level.bottles.length === 0 && !this.isRespawningBottles) {
            this.isRespawningBottles = true;
            let id = setTimeout(() => {
                for (let i = 0; i < 3; i++) {
                    let x = 200 + Math.random() * (this.level.level_end_x - 400);
                    this.level.bottles.push(new Bottle(x, 370));
                }
                this.isRespawningBottles = false;
            }, 3000);
            this.intervals.push(id);
        }
    }

    /**
     * throwing bottle on the side where pepe looks
     */
    checkThrowObjects() {
    if (this.keyboard.D && this.bottleCount > 0) {
        let direction = this.character.otherDirection;
        let offsetX = direction ? -50 : 100;
        let bottle = new ThrowableObject(this.character.x + offsetX, this.character.y + 100, direction);
        this.throwableObjects.push(bottle);
        this.bottleCount -= 20;
        if (this.bottleCount < 0) this.bottleCount = 0;
        this.statusBarBottle.setPercentage(this.bottleCount);
        this.soundManager.play('throw');
        this.keyboard.D = false;
    }
}

    /**
     * Clears the canvas and draws all layers, then requests the next frame.
     */
    draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground();
    this.drawGameObjects();
    this.drawStatusBars();
    let self = this;
    requestAnimationFrame(function () {
        self.draw();
    });
}

    /**
     * Draws the background objects relative to the camera.
     */
    drawBackground() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Draws all status bars in a fixed screen position.
     */
    drawStatusBars() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarEndboss);
    }

    /**
     * Draws the character, enemies and collectible objects.
     */
    drawGameObjects() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);
}

    /**
     * Draws a list of objects onto the map.
     * @param {DrawableObject[]} objects - The objects to draw.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Draws a single object, mirroring it if it faces the other direction.
     * @param {MoveableObject} mo - The object to draw.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }

    /**
     * Ends the game as a loss and shows the game over screen.
     */
    showGameOver() {
        if (this.gameEnded) return;
        this.gameEnded = true;
        this.stopGame();
        this.soundManager.sounds.background.pause();
        this.soundManager.play('gameover');
        document.getElementById('gameover-screen').classList.remove('hidden');
    }

    /**
     * Ends the game as a win and shows the win screen.
     */
    showWin() {
        if (this.gameEnded) return;
        this.gameEnded = true;
        this.stopGame();
        this.soundManager.sounds.background.pause();
        this.soundManager.play('win');
        document.getElementById('win-screen').classList.remove('hidden');
    }
}
