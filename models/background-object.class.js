class BackgroundObject extends MoveableObject {
    width = 720;
    height = 400;

    constructor(imagePath, x, y) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}