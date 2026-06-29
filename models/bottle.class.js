class Bottle extends MoveableObject {
    width = 80;
    height = 80;

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    constructor(x, y) {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImage(this.IMAGES_BOTTLE[0]);
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        let id = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 300);
        this.intervals.push(id);
    }
}