// Enhanced navigation with active states
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    // Smooth scrolling and active state management
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        
        // Add ripple effect on click
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                transform: scale(0);
                animation: navRipple 0.6s linear;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Set active state based on scroll position
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Set initial active state
    updateActiveNav();
});

// Mobile menu toggle
function createMobileMenu() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Create hamburger menu button
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.setAttribute('aria-label', 'Toggle menu');
    
    nav.appendChild(menuToggle);
    
    // Toggle menu on click
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on links
    navLinks.addEventListener('click', function() {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
}

// Initialize mobile menu
createMobileMenu();

// Gallery image loading and error handling
function setupGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    galleryItems.forEach((img, index) => {
        // Add loading placeholder
        img.style.backgroundColor = '#f0f0f0';
        
        // Handle image load error
        img.addEventListener('error', function() {
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.color = '#999';
            this.style.fontSize = '14px';
            this.innerHTML = 'Photo Coming Soon';
            this.style.backgroundColor = '#f8f9fa';
        });
        
        // Add fade-in effect when image loads
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
    });
}

// Initialize gallery
setupGallery();

// Contact button click tracking for Instagram
function setupContactButtons() {
    const instagramBtns = document.querySelectorAll('.instagram-btn');
    
    instagramBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Instagram link is ready to use
            console.log('Redirecting to Instagram: @crochet.by.mumma');
        });
    });
}

// Initialize contact buttons
setupContactButtons();

// Scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe gallery items, product categories, testimonials, review cards, and contact cards
    const animateElements = document.querySelectorAll('.gallery-item, .product-category, .testimonial-item, .review-card, .contact-card, .about-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll animations
setupScrollAnimations();

// Header scroll effect
function setupHeaderScroll() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    });
}

// Initialize header scroll effect
setupHeaderScroll();

// Loading screen
function showLoadingComplete() {
    document.body.classList.add('loaded');
}

// Show loading complete after page loads
window.addEventListener('load', showLoadingComplete);