/**
 * Manages all game sounds, muting, volume and localStorage persistence.
 */
class SoundManager {
    sounds = {
        background: new Audio('audio/background.mp3'),
        walk: new Audio('audio/walk.mp3'),
        jump: new Audio('audio/jump.mp3'),
        coin: new Audio('audio/coin.wav'),
        throw: new Audio('audio/throw.mp3'),
        hit: new Audio('audio/hit.wav'),
        chickenDie: new Audio('audio/chicken-die.mp3'),
        endbossHit: new Audio('audio/endboss-hit.mp3'),
        bottle: new Audio('audio/bottle.mp3'),
        win: new Audio('audio/win.mp3'),
        gameover: new Audio('audio/gameover.mp3'),
    };

    isMuted = false;
    volume = 0.5;

    /**
     * Restores mute and volume state from localStorage and applies them.
     */
    constructor() {
        this.isMuted = localStorage.getItem('muted') === 'true';
        let savedVolume = localStorage.getItem('volume');
        this.volume = savedVolume !== null ? parseFloat(savedVolume) : 0.5;
        this.sounds.background.loop = true;
        this.applyVolume();
        this.applyMute();
    }

    /**
     * Plays a sound from the start unless muted.
     * @param {string} name - The key of the sound to play.
     */
    play(name) {
        if (this.isMuted) return;
        let sound = this.sounds[name];
        if (!sound) return;
        sound.currentTime = 0;
        sound.play();
    }

    /**
     * Plays the endboss hit sound limited to one second.
     */
    playEndbossHit() {
        if (this.isMuted) return;
        let sound = this.sounds.endbossHit;
        sound.currentTime = 0;
        sound.play();
        setTimeout(() => sound.pause(), 1000);
    }

    /**
     * Starts the looping background music unless muted.
     */
    playBackground() {
        if (this.isMuted) return;
        this.sounds.background.play();
    }

    /**
     * Stops all sounds and resets them to the start.
     */
    stopAll() {
        Object.values(this.sounds).forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    }

    /**
     * Toggles the mute state and stores it in localStorage.
     * @returns {boolean} The new mute state.
     */
    toggleMute() {
        this.isMuted = !this.isMuted;
        localStorage.setItem('muted', this.isMuted);
        this.applyMute();
        return this.isMuted;
    }

    /**
     * Applies the current mute state to the sounds.
     */
    applyMute() {
        if (this.isMuted) {
            this.stopAll();
        } else {
            this.playBackground();
        }
    }

    /**
     * Sets the global volume, stores it and applies it.
     * @param {number} value - Volume between 0 and 1.
     */
    setVolume(value) {
        this.volume = value;
        localStorage.setItem('volume', value);
        this.applyVolume();
    }

    /**
     * Applies the current volume to all sounds (background quieter).
     */
    applyVolume() {
        Object.entries(this.sounds).forEach(([name, sound]) => {
            sound.volume = name === 'background' ? this.volume * 0.4 : this.volume;
        });
    }
}
