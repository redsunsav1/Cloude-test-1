/**
 * Эстет Клиник - Main JavaScript
 * Animations and interactions for the dental clinic website
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initScrollAnimations();
    initHeaderScroll();
    initMobileMenu();
    initCounterAnimation();
    initSmoothScroll();
});

/**
 * Scroll-based animations using Intersection Observer
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for elements in the same section
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add staggered delays to grid items
    const serviceCards = document.querySelectorAll('.service-card.animate-on-scroll');
    serviceCards.forEach((card, index) => {
        card.dataset.delay = index * 100;
    });

    const visualCards = document.querySelectorAll('.visual-card');
    visualCards.forEach((card, index) => {
        card.dataset.delay = index * 150;
    });

    // Observe all animated elements
    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Header scroll effect - adds shadow on scroll
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll direction
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            toggle.classList.toggle('active');

            // Animate hamburger to X
            const spans = toggle.querySelectorAll('span');
            if (toggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                toggle.classList.remove('active');

                const spans = toggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            });
        });
    }
}

/**
 * Animated counter for statistics
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    const observerOptions = {
        root: null,
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

/**
 * Animate a single counter element
 */
function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString('ru-RU');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString('ru-RU');
            // Add + sign for large numbers
            if (target >= 1000) {
                element.textContent += '+';
            }
        }
    };

    requestAnimationFrame(updateCounter);
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Parallax effect for hero section (optional enhancement)
 */
function initParallax() {
    const heroBg = document.querySelector('.hero-bg');

    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;

            heroBg.style.transform = `translateY(${rate}px)`;
        });
    }
}

/**
 * Add loading animation
 */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

/**
 * Cursor follower effect (optional - commented out by default)
 */
/*
function initCursorFollower() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Enlarge on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('enlarged'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('enlarged'));
    });
}
*/

/**
 * Form validation (if contact form is added)
 */
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    // Email validation
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            isValid = false;
            emailInput.classList.add('error');
        }
    }

    return isValid;
}

/**
 * Debounce utility function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle utility function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
