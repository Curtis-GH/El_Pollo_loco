/**
 * Base class for all drawable objects. Handles image loading and rendering.
 */
class DrawableObject {
    x = 120;
    y = 280;
    img;
    imageCache = {};
    currentImage = 0;
    height = 150;
    width = 100;

    /**
     * Loads a single image and assigns it as the current image.
     * @param {string} path - Path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the current image onto the canvas if it is fully loaded.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        if (this.img && this.img.complete && this.img.naturalWidth > 0) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    /**
     * Loads multiple images into the image cache for animation.
     * @param {string[]} arr - Array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}
