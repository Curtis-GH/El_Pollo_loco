let canvas;
let world;
let keyboard = new Keyboard();
let soundManager = new SoundManager();

function init() {
    canvas = document.getElementById('canvas');
    updateMuteButton();
    document.getElementById('volume-slider').value = soundManager.volume;
    initTouchButtons();
    initDialogBackdrop();
}

function changeVolume(value) {
    soundManager.setVolume(parseFloat(value));
}

function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    world = new World(canvas, keyboard, soundManager);
    soundManager.playBackground();
}

function restartGame() {
    document.getElementById('gameover-screen').classList.add('hidden');
    document.getElementById('win-screen').classList.add('hidden');
    world = new World(canvas, keyboard, soundManager);
    soundManager.playBackground();
}

function goToStart() {
    document.getElementById('gameover-screen').classList.add('hidden');
    document.getElementById('win-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
    soundManager.stopAll();
}

function toggleMute() {
    soundManager.toggleMute();
    updateMuteButton();
}

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
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) keyboard.RIGHT = true;
    if (e.keyCode == 37) keyboard.LEFT = true;
    if (e.keyCode == 38) keyboard.UP = true;
    if (e.keyCode == 40) keyboard.DOWN = true;
    if (e.keyCode == 32) keyboard.SPACE = true;
    if (e.keyCode == 68) keyboard.D = true;
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) keyboard.RIGHT = false;
    if (e.keyCode == 37) keyboard.LEFT = false;
    if (e.keyCode == 38) keyboard.UP = false;
    if (e.keyCode == 40) keyboard.DOWN = false;
    if (e.keyCode == 32) keyboard.SPACE = false;
    if (e.keyCode == 68) keyboard.D = false;
});