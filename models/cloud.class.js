/**
 * Background cloud that drifts to the left.
 */
class Cloud extends MoveableObject {
    y = 20;
    height = 250;
    width = 500;
    speed = 0.15;

    /**
     * Loads the cloud image, sets a random position and starts moving.
     */
    constructor() {
        super();
        this.loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }

    /**
     * Starts the leftward movement.
     */
    animate() {
        this.moveLeft();
    }
}
