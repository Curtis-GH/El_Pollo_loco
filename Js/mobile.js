/**
 * Binds touch and mouse events for a button to a keyboard flag.
 * @param {string} id - The button element ID.
 * @param {string} key - The keyboard property to toggle.
 */
function bindTouchButton(id, key) {
    let btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener('touchstart', (e) => { e.preventDefault(); keyboard[key] = true; });
    btn.addEventListener('touchend', (e) => { e.preventDefault(); keyboard[key] = false; });
    btn.addEventListener('mousedown', () => keyboard[key] = true);
    btn.addEventListener('mouseup', () => keyboard[key] = false);
    btn.addEventListener('mouseleave', () => keyboard[key] = false);
}

/**
 * Initializes all mobile touch buttons.
 */
function initTouchButtons() {
    bindTouchButton('btn-left', 'LEFT');
    bindTouchButton('btn-right', 'RIGHT');
    bindTouchButton('btn-jump', 'SPACE');
    bindTouchButton('btn-throw', 'D');
    disableContextMenu();
}

/**
 * Disables the context menu on touch buttons (long-press).
 */
function disableContextMenu() {
    document.querySelectorAll('.touch-btn').forEach(btn => {
        btn.addEventListener('contextmenu', (e) => e.preventDefault());
    });
}
