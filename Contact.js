/**
 * HYTROVEX CONTACT LOGIC
 * Features: Flashlight Reveal, Mobile Menu, and Dynamic Package Glow
 */

/**
 * Applies a dynamic metallic glow to the dropdown based on selection
 * This function is called both on manual change and page load.
 */
function applyPackageGlow(value) {
    const dropdown = document.getElementById('subject');
    if (!dropdown) return;

    // metallic theme colors matching the Service page
    const colors = {
        bronze: { border: '#cd7f32', glow: 'rgba(205, 127, 50, 0.6)' },
        silver: { border: '#c0c0c0', glow: 'rgba(192, 192, 192, 0.6)' },
        gold:   { border: '#ffd700', glow: 'rgba(255, 215, 0, 0.6)' },
        default: { border: 'rgba(138, 43, 226, 0.3)', glow: 'transparent' }
    };

    const theme = colors[value] || colors.default;

    // Apply the metallic styles
    dropdown.style.borderColor = theme.border;
    dropdown.style.boxShadow = `0 0 15px ${theme.glow}`;

    // Re-trigger the pulse animation if a package is selected
    if (['bronze', 'silver', 'gold'].includes(value)) {
        dropdown.style.animation = 'none';
        // Small timeout allows the browser to "reset" the animation
        setTimeout(() => {
            dropdown.style.animation = 'inputPulse 2s infinite';
        }, 10);
    } else {
        dropdown.style.animation = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const revealLayer = document.getElementById('reveal-layer');
    const glow = document.getElementById('cursor-glow');
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    // 1. FLASHLIGHT REVEAL LOGIC
    // Tracks mouse movement to update the mask position
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        const maskStyle = `radial-gradient(circle 180px at ${x}px ${y}px, black 0%, transparent 100%)`;

        if (revealLayer) {
            revealLayer.style.webkitMaskImage = maskStyle;
            revealLayer.style.maskImage = maskStyle;
        }
        if (glow) {
            glow.style.left = x + 'px';
            glow.style.top = y + 'px';
        }
    });

    // 2. MOBILE MENU TOGGLE
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents click from bubbling to document
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking anywhere else on the screen
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        }
    });

    // 3. AUTO-SELECT PACKAGE FROM URL
    // Detects "?package=gold" etc. and updates the UI immediately
    const urlParams = new URLSearchParams(window.location.search);
    const selectedPackage = urlParams.get('package');

    if (selectedPackage) {
        const dropdown = document.getElementById('subject');
        if (dropdown) {
            dropdown.value = selectedPackage;
            // Apply the metallic glow immediately on load
            applyPackageGlow(selectedPackage);
        }
    }
});