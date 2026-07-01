/**
 * Holds all objects of a level: enemies, clouds, background, coins, bottles.
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2200;

    /**
     * Stores all level object arrays.
     * @param {MoveableObject[]} enemies - Enemy objects.
     * @param {Cloud[]} clouds - Cloud objects.
     * @param {BackgroundObject[]} backgroundObjects - Background layers.
     * @param {Coin[]} coins - Collectible coins.
     * @param {Bottle[]} bottles - Collectible bottles.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}
