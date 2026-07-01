/**
 * The endboss enemy. Stronger than normal chickens with hurt and death states.
 */
class Endboss extends MoveableObject {

    height = 400;
    width = 250;
    y = 50;
    offset = { top: 60, bottom: 20, left: 30, right: 30 };
    energy = 100;
    isEndbossDead = false;

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
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500;
    }

    /**
     * Plays the alert animation, switching to hurt when recently hit.
     */
    animate() {
        let id = setInterval(() => {
            if (this.isEndbossDead) return;
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 200);
        this.intervals.push(id);
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
