class SmallChicken extends MoveableObject {
    y = 390;
    height = 45;
    width = 60;
    currentImage = 0;
    offset = { top: 5, bottom: 5, left: 5, right: 5 };
    isChickenDead = false;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGE_DEAD);
        this.x = 200 + Math.random() * 1800;
        this.speed = 0.2 + Math.random() * 0.6;
    }

    animate() {
        this.moveLeft();
        let id = setInterval(() => {
            if (!this.isChickenDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 8);
        this.intervals.push(id);
    }

    die() {
        this.isChickenDead = true;
        this.loadImage(this.IMAGE_DEAD);
        this.clearIntervals();
    }
}