/**
 * Status bar for health, coins, bottles and endboss energy.
 */
class StatusBar extends DrawableObject {

    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];

    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

    IMAGES_ENDBOSS = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
    ];

    percentage = 100;

    /**
     * Loads the images for the given bar type and sets the initial value.
     * @param {string} type - Bar type: 'health', 'coin', 'bottle' or 'endboss'.
     * @param {number} x - Horizontal position.
     * @param {number} y - Vertical position.
     */
    constructor(type, x, y) {
        super();
        if (type === 'health') this.loadImages(this.IMAGES_HEALTH);
        if (type === 'coin') this.loadImages(this.IMAGES_COIN);
        if (type === 'bottle') this.loadImages(this.IMAGES_BOTTLE);
        if (type === 'endboss') this.loadImages(this.IMAGES_ENDBOSS);
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 60;
        if (type === 'health' || type === 'endboss') {
            this.setPercentage(100);
        } else {
            this.setPercentage(0);
        }
    }

    /**
     * Sets the bar percentage and updates the displayed image.
     * @param {number} percentage - The new percentage value (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let images = this.getImages();
        let path = images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Returns the image array matching this bar's type.
     * @returns {string[]} The image path array.
     */
    getImages() {
        if (this.type === 'health') return this.IMAGES_HEALTH;
        if (this.type === 'coin') return this.IMAGES_COIN;
        if (this.type === 'bottle') return this.IMAGES_BOTTLE;
        if (this.type === 'endboss') return this.IMAGES_ENDBOSS;
    }

    /**
     * Resolves the image index from the current percentage.
     * @returns {number} Index between 0 and 5.
     */
    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
