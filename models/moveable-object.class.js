/**
 * Base class for all movable objects. Adds gravity, movement and collision.
 */
class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;
    intervals = [];
    offset = { top: 0, bottom: 0, left: 0, right: 0 };

    /**
     * Applies gravity by continuously updating the vertical position.
     */
    applyGravity() {
        let id = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
        this.intervals.push(id);
    }

    /**
     * Checks whether the object is above the ground level.
     * @returns {boolean} True if above ground or a throwable object.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    /**
     * Checks whether this object collides with another object.
     * @param {MoveableObject} mo - The other object.
     * @returns {boolean} True if the hitboxes overlap.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Checks whether this object hits another one from above (stomp).
     * @param {MoveableObject} mo - The other object.
     * @returns {boolean} True if colliding from above while airborne.
     */
    isCollidingFromAbove(mo) {
        let characterBottom = this.y + this.height - this.offset.bottom;
        let enemyTop = mo.y + mo.offset.top;
        return this.isColliding(mo) && this.isAboveGround() && characterBottom < enemyTop + 30;
    }

    /**
     * Reduces energy when hit and records the time of the hit.
     */
    hit() {
        this.energy -= 25;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks whether the object was recently hurt (within one second).
     * @returns {boolean} True if hurt less than one second ago.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Checks whether the object is dead (energy at zero).
     * @returns {boolean} True if energy equals zero.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Moves the object continuously to the right.
     */
    moveRight() {
        setInterval(() => {
            this.x += this.speed;
        }, 1000 / 60);
    }

    /**
     * Moves the object continuously to the left.
     */
    moveLeft() {
        let id = setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
        this.intervals.push(id);
    }

    /**
     * Plays an animation by cycling through the given images.
     * @param {string[]} images - Array of image paths.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Clears all stored intervals of this object.
     */
    clearIntervals() {
        this.intervals.forEach(id => clearInterval(id));
        this.intervals = [];
    }
}
