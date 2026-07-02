/**
 * A salsa bottle that can be thrown by the character.
 */
class ThrowableObject extends MoveableObject {

    /**
     * Loads the rotation image, sets position/direction and starts the throw.
     * @param {number} x - Horizontal start position.
     * @param {number} y - Vertical start position.
     * @param {boolean} otherDirection - True if thrown to the left.
     */
    constructor(x, y, otherDirection) {
        super();
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.otherDirection = otherDirection;
        this.throw();
    }

    /**
     * Throws the bottle with upward impulse and direction-based movement.
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        let id = setInterval(() => {
            if (this.otherDirection) {
                this.x -= 10;
            } else {
                this.x += 10;
            }
        }, 25);
        this.intervals.push(id);
    }
    lastThrowTime = 0;

checkThrowObjects() {
    let now = new Date().getTime();
    if (this.keyboard.D && this.bottleCount > 0 && now - this.lastThrowTime > 1000) {
        this.lastThrowTime = now;
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
}