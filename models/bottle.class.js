/**
 * Collectible salsa bottle lying on the ground with a two-frame animation.
 */
class Bottle extends MoveableObject {
    width = 80;
    height = 80;
    offset = { top: 15, bottom: 15, left: 15, right: 15 };

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    /**
     * Loads the bottle images, sets the position and starts animating.
     * @param {number} x - Horizontal position.
     * @param {number} y - Vertical position.
     */
    constructor(x, y) {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImage(this.IMAGES_BOTTLE[0]);
        this.x = x;
        this.y = y;
        this.animate();
    }

    /**
     * Plays the ground bottle animation.
     */
    animate() {
        let id = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 300);
        this.intervals.push(id);
    }
}