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
}