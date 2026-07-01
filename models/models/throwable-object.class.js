/**
 * A salsa bottle that can be thrown by the character.
 */
class ThrowableObject extends MoveableObject {

    /**
     * Loads the rotation image, sets position and starts the throw.
     * @param {number} x - Horizontal start position.
     * @param {number} y - Vertical start position.
     */
    constructor(x, y) {
        super();
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
    }

    /**
     * Throws the bottle with an upward impulse and forward movement.
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}
