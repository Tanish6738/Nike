// EcoLux - Interactive JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Navigation hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background opacity on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            if (scrollY > 100) {
                navbar.style.background = 'rgba(30, 58, 36, 0.98)';
            } else {
                navbar.style.background = 'rgba(30, 58, 36, 0.95)';
            }
        });
    }    // Enhanced scroll-triggered animations with mobile optimizations
    const observerOptions = {
        threshold: window.innerWidth <= 768 ? 0.05 : 0.1, // Lower threshold for mobile
        rootMargin: window.innerWidth <= 768 ? '0px 0px -30px 0px' : '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered animation for mobile
                if (window.innerWidth <= 768) {
                    const siblings = Array.from(entry.target.parentNode.children);
                    const index = siblings.indexOf(entry.target);
                    const delay = index * 100; // 100ms stagger
                    
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                        
                        // Add mobile-specific effects
                        if (entry.target.classList.contains('material-card')) {
                            entry.target.style.willChange = 'transform, opacity';
                        }
                    }, delay);
                } else {
                    entry.target.classList.add('animate');
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.material-card, .collection-card, .craft-block, .ethos-pillar');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Testimonials slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current testimonial and activate dot
        if (testimonials[index]) {
            testimonials[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }

    // Auto-advance testimonials
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    // Set up testimonial auto-advance
    if (testimonials.length > 0) {
        setInterval(nextTestimonial, 5000); // Change every 5 seconds
        
        // Add click handlers to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentTestimonial = index;
                showTestimonial(currentTestimonial);
            });
        });
    }    // Material cards enhanced mobile interactions
    const materialCards = document.querySelectorAll('.material-card');
    materialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) scale(1)';
        });

        // Enhanced mobile touch interactions
        if (window.innerWidth <= 768) {
            card.addEventListener('touchstart', function(e) {
                e.preventDefault();
                this.classList.add('mobile-active');
                this.style.transform = 'translateY(-5px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
                this.style.transition = 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                
                // Add pulse animation
                this.style.animation = 'mobileCardPulse 1s ease-out';
            }, { passive: false });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('mobile-active');
                    this.style.transform = 'translateY(0) scale(1)';
                    this.style.boxShadow = '';
                    this.style.animation = '';
                    this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }, 150);
            }, { passive: true });
        }
    });    // Collection cards enhanced mobile interactions
    const collectionCards = document.querySelectorAll('.collection-card');
    collectionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.collection-image');
            if (image) {
                image.style.transform = 'scale(1.15)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.collection-image');
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });

        // Enhanced mobile interactions for collection cards
        if (window.innerWidth <= 768) {
            card.addEventListener('touchstart', function(e) {
                this.style.transform = 'scale(0.98)';
                this.style.transition = 'transform 0.1s ease';
                
                const image = this.querySelector('.collection-image');
                if (image) {
                    image.style.transform = 'scale(1.12)';
                    image.style.filter = 'brightness(1.1)';
                }
            }, { passive: true });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                    this.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    
                    const image = this.querySelector('.collection-image');
                    if (image) {
                        image.style.transform = 'scale(1.1)';
                        image.style.filter = '';
                    }
                }, 100);
            }, { passive: true });
        }
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Show success message
                const button = this.querySelector('button');
                const originalText = button.textContent;
                button.textContent = 'Subscribed!';
                button.style.background = '#32CD32';
                
                // Reset form
                this.querySelector('input[type="email"]').value = '';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                }, 3000);
            }
        });
    }

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroSection && heroBg) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroBg.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }

    // CTA button interactions
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 20px 50px rgba(184, 134, 11, 0.5)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-3px) scale(1)';
            this.style.boxShadow = '0 15px 40px rgba(184, 134, 11, 0.4)';
        });
    });

    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const firstSection = document.querySelector('#innovation');
            if (firstSection) {
                firstSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
        
        // Hide scroll indicator after scrolling
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            if (scrollY > 200) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }

    // Material texture animation on scroll
    const textureElements = document.querySelectorAll('.texture-bg');
    const textureObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'textureShimmer 2s ease-in-out';
            }
        });
    }, { threshold: 0.3 });

    textureElements.forEach(texture => {
        textureObserver.observe(texture);
    });

    // Add texture shimmer animation via CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes textureShimmer {
            0% { filter: brightness(1); }
            50% { filter: brightness(1.2) contrast(1.1); }
            100% { filter: brightness(1); }
        }
    `;
    document.head.appendChild(style);    // Enhanced mobile experience
    if (window.innerWidth <= 768) {
        // Optimize animations for mobile
        const mobileElements = document.querySelectorAll('.material-card, .collection-card, .ethos-pillar');
        mobileElements.forEach(element => {
            element.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease, box-shadow 0.3s ease';
        });

        // Enhanced touch interactions
        document.addEventListener('touchstart', function() {}, { passive: true });
        
        // Add mobile-specific touch feedback
        const interactiveElements = document.querySelectorAll('.cta-button, .nav-link, .material-card, .collection-card, .ethos-pillar, .learn-more, .collection-cta, .social-link');
        
        interactiveElements.forEach(element => {
            // Touch start feedback
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
                this.style.transition = 'transform 0.1s ease';
            }, { passive: true });
            
            // Touch end restoration
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }, 100);
            }, { passive: true });
            
            // Touch cancel restoration (for interrupted touches)
            element.addEventListener('touchcancel', function() {
                this.style.transform = '';
                this.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }, { passive: true });
        });

        // Enhanced mobile hamburger menu
        const hamburger = document.querySelector('.hamburger');
        if (hamburger) {
            hamburger.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.9)';
            }, { passive: true });
            
            hamburger.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            }, { passive: true });
        }

        // Mobile scroll enhancements
        let isScrolling = false;
        const scrollElements = document.querySelectorAll('.material-card, .collection-card, .craft-block, .ethos-pillar');
        
        window.addEventListener('scroll', debounce(function() {
            if (!isScrolling) {
                isScrolling = true;
                
                scrollElements.forEach(element => {
                    const rect = element.getBoundingClientRect();
                    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                    
                    if (isVisible && !element.classList.contains('animate')) {
                        // Add staggered animation delays
                        const delay = Array.from(element.parentNode.children).indexOf(element) * 100;
                        setTimeout(() => {
                            element.classList.add('animate');
                        }, delay);
                    }
                });
                
                setTimeout(() => {
                    isScrolling = false;
                }, 100);
            }
        }, 16), { passive: true });

        // Mobile-specific swipe gestures for testimonials
        const testimonialsContainer = document.querySelector('.testimonials-slider');
        if (testimonialsContainer) {
            let startX = 0;
            let startY = 0;
            let threshold = 50; // minimum distance for swipe
            
            testimonialsContainer.addEventListener('touchstart', function(e) {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            }, { passive: true });
            
            testimonialsContainer.addEventListener('touchend', function(e) {
                const endX = e.changedTouches[0].clientX;
                const endY = e.changedTouches[0].clientY;
                const deltaX = endX - startX;
                const deltaY = endY - startY;
                
                // Check if horizontal swipe is dominant
                if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
                    if (deltaX > 0) {
                        // Swipe right - previous testimonial
                        currentTestimonial = currentTestimonial > 0 ? currentTestimonial - 1 : testimonials.length - 1;
                    } else {
                        // Swipe left - next testimonial
                        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                    }
                    showTestimonial(currentTestimonial);
                }
            }, { passive: true });
        }

        // Mobile haptic feedback simulation
        function simulateHaptic() {
            if (navigator.vibrate) {
                navigator.vibrate(50); // 50ms vibration
            }
        }

        // Add haptic feedback to important interactions
        document.querySelectorAll('.cta-button, .hamburger, .nav-link').forEach(element => {
            element.addEventListener('touchend', simulateHaptic, { passive: true });
        });

        // Mobile-optimized parallax alternative
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            let ticking = false;
            
            function updateHeroTransform() {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.3;
                
                if (heroSection.querySelector('.hero-bg')) {
                    heroSection.querySelector('.hero-bg').style.transform = `translateY(${rate}px)`;
                }
                
                ticking = false;
            }
            
            window.addEventListener('scroll', function() {
                if (!ticking) {
                    requestAnimationFrame(updateHeroTransform);
                    ticking = true;
                }
            }, { passive: true });
        }

        // Enhanced mobile navigation close on outside tap
        document.addEventListener('touchstart', function(e) {
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            
            if (navMenu && navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }, { passive: true });

        console.log('Enhanced mobile interactions initialized');
    }

    // Performance optimization: Debounce scroll events
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

    // Apply debounced scroll handlers
    const debouncedScrollHandler = debounce(function() {
        // Navbar background
        const scrollY = window.scrollY;
        if (navbar) {
            if (scrollY > 100) {
                navbar.style.background = 'rgba(30, 58, 36, 0.98)';
            } else {
                navbar.style.background = 'rgba(30, 58, 36, 0.95)';
            }
        }

        // Scroll indicator
        if (scrollIndicator) {
            if (scrollY > 200) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        }

        // Parallax effect
        if (heroBg) {
            const parallaxSpeed = 0.5;
            heroBg.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
        }
    }, 10);

    window.addEventListener('scroll', debouncedScrollHandler);

    // Initialize page
    console.log('EcoLux landing page initialized successfully');
    
    // Add loading class removal for smooth entrance
    document.body.classList.add('loaded');

    // Beautiful Cursor Follower (Desktop Only)
    initCursorFollower();

    // Keyboard accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
});

// Additional utility functions
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Preload critical assets
function preloadAssets() {
    const criticalElements = [
        '.hero-bg',
        '.material-image',
        '.collection-image'
    ];
    
    criticalElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            const computedStyle = window.getComputedStyle(element);
            const backgroundImage = computedStyle.backgroundImage;
            if (backgroundImage && backgroundImage !== 'none') {
                const img = new Image();
                const url = backgroundImage.slice(4, -1).replace(/"/g, "");
                img.src = url;
            }
        });
    });
}

// Beautiful Cursor Follower (Desktop Only)
function initCursorFollower() {
    // Only initialize on desktop devices with fine pointer
    if (window.innerWidth < 1024 || !window.matchMedia('(pointer: fine)').matches) {
        return;
    }

    const cursorFollower = document.querySelector('.cursor-follower');
    const cursorTrail = document.querySelector('.cursor-trail');
    
    if (!cursorFollower || !cursorTrail) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let trailElements = [];
    
    // Create multiple trail elements for smooth effect
    for (let i = 0; i < 5; i++) {
        const trail = cursorTrail.cloneNode(true);
        trail.style.opacity = (0.3 - i * 0.05).toString();
        trail.style.transform = `scale(${1 - i * 0.15})`;
        document.body.appendChild(trail);
        trailElements.push(trail);
    }

    // Mouse move handler
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update trail positions with delay
        trailElements.forEach((trail, index) => {
            setTimeout(() => {
                trail.style.left = mouseX + 'px';
                trail.style.top = mouseY + 'px';
            }, index * 50);
        });
    });

    // Smooth cursor follower animation
    function animateCursor() {
        // Smooth following with easing
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursorFollower.style.left = cursorX + 'px';
        cursorFollower.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .material-card, .collection-card, .ethos-pillar');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('cursor-hover');
            
            // Special effects for premium elements
            if (element.classList.contains('cta-button') || 
                element.classList.contains('collection-card') ||
                element.classList.contains('material-card')) {
                cursorFollower.classList.add('cursor-pulse');
            }
        });
        
        element.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('cursor-hover', 'cursor-pulse');
        });
        
        element.addEventListener('mousedown', () => {
            cursorFollower.classList.add('cursor-click');
        });
        
        element.addEventListener('mouseup', () => {
            cursorFollower.classList.remove('cursor-click');
        });
    });

    // Magnetic effect for premium elements
    const magneticElements = document.querySelectorAll('.cta-button, .nav-logo');
    
    magneticElements.forEach(element => {
        element.classList.add('cursor-magnetic');
        
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 100;
            
            if (distance < maxDistance) {
                const strength = (maxDistance - distance) / maxDistance;
                const moveX = x * strength * 0.3;
                const moveY = y * strength * 0.3;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0px, 0px)';
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursorFollower.style.opacity = '0';
        trailElements.forEach(trail => {
            trail.style.opacity = '0';
        });
    });

    document.addEventListener('mouseenter', () => {
        cursorFollower.style.opacity = '0.8';
        trailElements.forEach((trail, index) => {
            trail.style.opacity = (0.3 - index * 0.05).toString();
        });
    });

    // Scroll-based effects
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        cursorFollower.classList.add('cursor-pulse');
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            cursorFollower.classList.remove('cursor-pulse');
        }, 1000);
    });

    // Text selection effect
    document.addEventListener('selectstart', () => {
        cursorFollower.classList.add('cursor-click');
    });

    document.addEventListener('selectend', () => {
        cursorFollower.classList.remove('cursor-click');
    });

    console.log('Cursor follower initialized for desktop');
}