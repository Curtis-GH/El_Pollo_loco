let canvas;
let world;
let keyboard = new Keyboard();
let soundManager = new SoundManager();

/**
 * Initializes the canvas, UI controls and touch buttons on page load.
 */
function init() {
    canvas = document.getElementById('canvas');
    updateMuteButton();
    document.getElementById('volume-slider').value = soundManager.volume;
    initTouchButtons();
    initDialogBackdrop();
}

/**
 * Changes the game volume from the slider input.
 * @param {string} value - The slider value (0-1) as a string.
 */
function changeVolume(value) {
    soundManager.setVolume(parseFloat(value));
}

/**
 * Hides the start screen and starts a new game with background music.
 */
function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    world = new World(canvas, keyboard, soundManager);
    soundManager.playBackground();
}

/**
 * Hides the end screens and starts a fresh game without a page reload.
 */
function restartGame() {
    document.getElementById('gameover-screen').classList.add('hidden');
    document.getElementById('win-screen').classList.add('hidden');
    world = new World(canvas, keyboard, soundManager);
    soundManager.playBackground();
}

/**
 * Returns to the start screen and stops all sounds.
 */
function goToStart() {
    document.getElementById('gameover-screen').classList.add('hidden');
    document.getElementById('win-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
    soundManager.stopAll();
}

/**
 * Toggles mute state and updates the mute button icon.
 */
function toggleMute() {
    soundManager.toggleMute();
    updateMuteButton();
}

/**
 * Updates the mute button icon to match the current mute state.
 */
function updateMuteButton() {
    let btn = document.getElementById('mute-button');
    btn.textContent = soundManager.isMuted ? '🔇' : '🔊';
}

/**
 * Opens the controls dialog.
 */
function openControls() {
    document.getElementById('controls-dialog').showModal();
}

/**
 * Closes the controls dialog.
 */
function closeControls() {
    document.getElementById('controls-dialog').close();
}

/**
 * Closes the dialog when clicking on the backdrop.
 */
function initDialogBackdrop() {
    let dialog = document.getElementById('controls-dialog');
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) dialog.close();
    });
}

/**
 * Sets keyboard flags to true on keydown.
 */
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) keyboard.RIGHT = true;
    if (e.keyCode == 37) keyboard.LEFT = true;
    if (e.keyCode == 38) keyboard.UP = true;
    if (e.keyCode == 40) keyboard.DOWN = true;
    if (e.keyCode == 32) keyboard.SPACE = true;
    if (e.keyCode == 68) keyboard.D = true;
});

/**
 * Resets keyboard flags to false on keyup.
 */
window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) keyboard.RIGHT = false;
    if (e.keyCode == 37) keyboard.LEFT = false;
    if (e.keyCode == 38) keyboard.UP = false;
    if (e.keyCode == 40) keyboard.DOWN = false;
    if (e.keyCode == 32) keyboard.SPACE = false;
    if (e.keyCode == 68) keyboard.D = false;
});
