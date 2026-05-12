/**
 * HytroVex Interactive Flashlight Background
 * Effect: Mouse reveals 'tech.jpeg' through a pitch-black overlay.
 */

const revealLayer = document.getElementById('reveal-layer');
const glow = document.getElementById('cursor-glow');
const navMenu = document.getElementById('nav-menu');
const mobileMenu = document.getElementById('mobile-menu');

/**
 * Update the flashlight position on mouse move
 */
document.addEventListener('mousemove', (e) => {
    // Get cursor coordinates
    const x = e.clientX;
    const y = e.clientY;

    /**
     * 1. THE REVEAL MASK
     * We update the radial gradient mask on the reveal layer.
     * 'black 0%' means fully opaque (reveals the image).
     * 'transparent 100%' means the mask fades out (image stays hidden).
     */
    const maskSize = 180; // Adjust this to make the flashlight hole bigger/smaller
    const maskStyle = `radial-gradient(circle ${maskSize}px at ${x}px ${y}px, black 0%, transparent 100%)`;

    // Apply for both standard and webkit browsers
    if (revealLayer) {
        revealLayer.style.webkitMaskImage = maskStyle;
        revealLayer.style.maskImage = maskStyle;
    }

    /**
     * 2. THE CURSOR GLOW
     * Positions the decorative glow div exactly under the mouse.
     */
    if (glow) {
        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;
    }
});

/**
 * Mobile Navigation Toggle
 */
if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Optional: Animate hamburger bars to 'X'
        const spans = mobileMenu.querySelectorAll('span');
        mobileMenu.classList.toggle('open');
    });
}

/**
 * Smooth reveal on page load
 * This ensures the image doesn't 'pop' in abruptly.
 */
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    console.log("HytroVex UI Initialized: Blue/Purple Theme.");
});