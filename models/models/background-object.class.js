/**
 * A static background layer object positioned along the level.
 */
class BackgroundObject extends MoveableObject {
    width = 720;
    height = 480;

    /**
     * Loads the background image and positions it at the bottom.
     * @param {string} imagePath - Path to the background image.
     * @param {number} x - Horizontal position.
     */
    constructor(imagePath, x) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}
