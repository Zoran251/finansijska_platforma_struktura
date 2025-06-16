/**
 * Universal Responsive JavaScript for Golden Balance App
 * Handles mobile navigation, touch gestures, and responsive behavior
 */

class ResponsiveHandler {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileNavigation();
        this.setupResponsiveImages();
        this.setupTouchGestures();
        this.setupResponsiveTables();
        this.setupViewportAdjustments();
        this.setupAccessibility();
    }

    setupMobileNavigation() {
        // Create mobile menu toggle if it doesn't exist
        const navbar = document.querySelector('.navbar, .nav-container');
        if (!navbar) return;

        let mobileToggle = document.querySelector('.mobile-menu-toggle, .nav-toggle');
        if (!mobileToggle) {
            mobileToggle = document.createElement('button');
            mobileToggle.className = 'mobile-menu-toggle';
            mobileToggle.innerHTML = `
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            `;
            mobileToggle.setAttribute('aria-label', 'Toggle mobile menu');
            mobileToggle.setAttribute('aria-expanded', 'false');
            navbar.appendChild(mobileToggle);
        }

        const navMenu = document.querySelector('.nav-menu, .sidebar-menu');
        if (!navMenu) return;

        // Toggle mobile menu
        mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const isActive = navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', isActive);
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    setupResponsiveImages() {
        // Add lazy loading and responsive behavior to images
        const images = document.querySelectorAll('img');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => {
                if (img.dataset.src) {
                    imageObserver.observe(img);
                }
            });
        }
    }

    setupTouchGestures() {
        if (!('ontouchstart' in window)) return;

        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe();
        }, { passive: true });

        const handleSwipe = () => {
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            const minSwipeDistance = 50;

            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    this.handleSwipeRight();
                } else {
                    this.handleSwipeLeft();
                }
            }
        };

        this.handleSwipe = handleSwipe;
    }

    handleSwipeRight() {
        // Open mobile menu on right swipe (if closed)
        const navMenu = document.querySelector('.nav-menu, .sidebar-menu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle, .nav-toggle');
        
        if (navMenu && !navMenu.classList.contains('active') && window.innerWidth <= 768) {
            navMenu.classList.add('active');
            if (mobileToggle) {
                mobileToggle.classList.add('active');
                mobileToggle.setAttribute('aria-expanded', 'true');
            }
            document.body.style.overflow = 'hidden';
        }
    }

    handleSwipeLeft() {
        // Close mobile menu on left swipe (if open)
        const navMenu = document.querySelector('.nav-menu, .sidebar-menu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle, .nav-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
            document.body.style.overflow = '';
        }
    }

    setupResponsiveTables() {
        const tables = document.querySelectorAll('table');
        
        tables.forEach(table => {
            if (!table.parentElement.classList.contains('table-responsive')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'table-responsive';
                table.parentNode.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            }
        });
    }

    setupViewportAdjustments() {
        // Handle viewport height on mobile browsers
        const setViewportHeight = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
        window.addEventListener('orientationchange', () => {
            setTimeout(setViewportHeight, 100);
        });
    }

    setupAccessibility() {
        // Enhance focus management for mobile
        const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        // Add touch-friendly focus indicators
        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.add('focus-visible');
            });

            element.addEventListener('blur', () => {
                element.classList.remove('focus-visible');
            });
        });

        // Handle skip links
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(skipLink.getAttribute('href'));
                if (target) {
                    target.focus();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    // Utility methods
    isMobile() {
        return window.innerWidth <= 768;
    }

    isTablet() {
        return window.innerWidth > 768 && window.innerWidth <= 1024;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    // Responsive utility for dynamic content
    updateResponsiveClasses() {
        const body = document.body;
        body.classList.toggle('is-mobile', this.isMobile());
        body.classList.toggle('is-tablet', this.isTablet());
        body.classList.toggle('is-desktop', this.isDesktop());
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const responsiveHandler = new ResponsiveHandler();
    
    // Update classes on resize
    window.addEventListener('resize', () => {
        responsiveHandler.updateResponsiveClasses();
    });
    
    // Initial class update
    responsiveHandler.updateResponsiveClasses();
    
    // Make it globally available
    window.responsiveHandler = responsiveHandler;
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResponsiveHandler;
}
