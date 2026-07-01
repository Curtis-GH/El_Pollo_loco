/**
 * Collectible coin with a two-frame spinning animation.
 */
class Coin extends MoveableObject {
    width = 80;
    height = 80;
    offset = { top: 15, bottom: 15, left: 15, right: 15 };

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    /**
     * Loads the coin images, sets the position and starts animating.
     * @param {number} x - Horizontal position.
     * @param {number} y - Vertical position.
     */
    constructor(x, y) {
        super();
        this.loadImages(this.IMAGES_COIN);
        this.loadImage(this.IMAGES_COIN[0]);
        this.x = x;
        this.y = y;
        this.animate();
    }

    /**
     * Plays the spinning coin animation.
     */
    animate() {
        let id = setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 300);
        this.intervals.push(id);
    }
}
