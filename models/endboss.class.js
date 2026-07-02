/**
 * The endboss enemy. Chases the character after first contact
 * and spawns chase chickens once when the attack starts.
 */
class Endboss extends MoveableObject {

    height = 400;
    width = 250;
    y = 50;
    offset = { top: 60, bottom: 20, left: 30, right: 30 };
    energy = 100;
    speed = 3;
    isEndbossDead = false;
    hadFirstContact = false;
    world;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    /**
     * Loads all endboss images and positions the boss at the level end.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500;
    }

    /**
     * Starts the animation and movement loops.
     */
    animate() {
        this.animateGraphics();
        this.animateMovement();
    }

    /**
     * Plays hurt, walk or alert animation depending on the current state.
     */
    animateGraphics() {
        let id = setInterval(() => {
            if (this.isEndbossDead) return;
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.hadFirstContact) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 200);
        this.intervals.push(id);
    }

    /**
     * Checks the trigger, moves once activated and spawns chase chickens once.
     */
    animateMovement() {
        let id = setInterval(() => {
            if (this.isEndbossDead) return;
            this.checkFirstContact();
            if (this.hadFirstContact) {
                this.moveTowardsCharacter();
            }
        }, 1000 / 60);
        this.intervals.push(id);
    }

    /**
     * Activates the boss and spawns chase chickens once the character is close.
     */
    checkFirstContact() {
        if (!this.hadFirstContact && this.world.character.x > 1900) {
            this.hadFirstContact = true;
            this.world.spawnChaseChickens();
        }
    }

    /**
     * Moves the boss towards the character and faces the right direction.
     */
    moveTowardsCharacter() {
    this.speed = this.getCurrentSpeed();
    if (this.world.character.x < this.x) {
        this.x -= this.speed;
        this.otherDirection = false;
    } else {
        this.x += this.speed;
        this.otherDirection = true;
    }
}

    /**
     * Applies damage to the endboss and triggers death at zero energy.
     */
    hitBoss() {
        this.energy -= 20;
        if (this.energy <= 0) {
            this.energy = 0;
            this.die();
        } else {
            this.lastHit = new Date().getTime();
        }
    }
    /**
 * Calculates speed based on remaining energy, capped at 5.
 * @returns {number} Current movement speed.
 */
    getCurrentSpeed() {
        let calculated = 3 + Math.floor((100 - this.energy) / 20);
        return Math.min(calculated, 5);
    }

    /**
     * Checks whether the endboss was recently hurt (within one second).
     * @returns {boolean} True if hurt less than one second ago.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Marks the endboss as dead and plays the death animation.
     */
    die() {
        this.isEndbossDead = true;
        this.clearIntervals();
        this.playDeadAnimation();
    }

    /**
     * Plays the death animation frames once, then stops.
     */
    playDeadAnimation() {
        let i = 0;
        let id = setInterval(() => {
            if (i < this.IMAGES_DEAD.length) {
                this.img = this.imageCache[this.IMAGES_DEAD[i]];
                i++;
            } else {
                clearInterval(id);
            }
        }, 200);
    }

    /**
     * Checks whether the endboss is dead.
     * @returns {boolean} True if the endboss has died.
     */
    isDead() {
        return this.isEndbossDead;
    }
}