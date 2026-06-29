class Coin extends MoveableObject {
    width = 80;
    height = 80;

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    constructor(x, y) {
        super();
        this.loadImages(this.IMAGES_COIN);
        this.loadImage(this.IMAGES_COIN[0]);
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        let id = setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 300);
        this.intervals.push(id);
    }
}