/**
 * The playable character Pepe. Handles movement, jumping and animations.
 */
class Character extends MoveableObject {

    height = 270;
    y = 10;
    speed = 10;
    offset = { top: 100, bottom: 10, left: 20, right: 20 };
    isStompBouncing = false;

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_SLEEP = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = ['img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];
    world;

    IMAGES_DEAD = ['img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = ['img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    currentImage = 0;
    lastMoveTime = new Date().getTime();

    /**
     * Loads all character images and starts gravity and animation.
     */
    constructor() {
        super();
        this.loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    /**
     * Starts both the movement and graphics animation loops.
     */
    animate() {
        this.animateMovement();
        this.animateGraphics();
    }

    /**
     * Handles keyboard-driven movement and camera position.
     */
    animateMovement() {
    let id = setInterval(() => {
        if (!this.isStompBouncing) {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRightAction();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeftAction();
            }
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jumpAction();
        }
        if (this.isStompBouncing && !this.isAboveGround()) {
            this.isStompBouncing = false;
        }
        this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
    this.intervals.push(id);
}

    /**
     * Moves the character right and updates direction and idle timer.
     */
    moveRightAction() {
        this.x += this.speed;
        this.otherDirection = false;
        this.lastMoveTime = new Date().getTime();
    }

    /**
     * Moves the character left and updates direction and idle timer.
     */
    moveLeftAction() {
        this.x -= this.speed;
        this.otherDirection = true;
        this.lastMoveTime = new Date().getTime();
    }

    /**
     * Makes the character jump and plays the jump sound.
     */
    jumpAction() {
        this.speedY = 30;
        this.lastMoveTime = new Date().getTime();
        this.world.soundManager.play('jump');
    }

    /**
     * Selects and plays the correct animation based on the current state.
     */
    animateGraphics() {
    let id = setInterval(() => {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGround()) {
            this.playJumpFrame();
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        } else if (this.isLongIdle()) {
            this.playAnimation(this.IMAGES_SLEEP);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }, 100);
    this.intervals.push(id);
}

/**
 * Shows the jump frame matching the current fall speed, once per jump.
 */
playJumpFrame() {
    let progress = (30 - this.speedY) / 60;
    let index = Math.min(Math.floor(progress * this.IMAGES_JUMPING.length), this.IMAGES_JUMPING.length - 1);
    index = Math.max(index, 0);
    this.img = this.imageCache[this.IMAGES_JUMPING[index]];
}

    /**
     * Checks whether the character has been idle long enough to sleep.
     * @returns {boolean} True if idle for more than the threshold.
     */
    isLongIdle() {
        let timepassed = (new Date().getTime() - this.lastMoveTime) / 1000;
        return timepassed > 8;
    }
}
