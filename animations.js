// Enhanced animations and interactive effects
document.addEventListener('DOMContentLoaded', function() {
    
    // Staggered animation for gallery items
    function staggerGalleryAnimation() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    // Staggered animation for product categories
    function staggerProductAnimation() {
        const productCategories = document.querySelectorAll('.product-category');
        productCategories.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.15}s`;
        });
    }
    
    // Floating elements animation for all sections
    function createFloatingElements() {
        const sections = ['.hero', '.gallery', '.products', '.reviews', '.about', '.contact'];
        
        sections.forEach((sectionSelector, sectionIndex) => {
            const section = document.querySelector(sectionSelector);
            if (!section) return;
            
            const elementCount = sectionSelector === '.hero' ? 8 : 4;
            
            for (let i = 0; i < elementCount; i++) {
                const floatingElement = document.createElement('div');
                floatingElement.className = 'floating-element';
                
                const colors = [
                    'rgba(214, 51, 132, 0.2)',
                    'rgba(120, 119, 198, 0.2)',
                    'rgba(255, 193, 7, 0.2)',
                    'rgba(76, 175, 80, 0.2)'
                ];
                
                floatingElement.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 15 + 8}px;
                    height: ${Math.random() * 15 + 8}px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    border-radius: ${Math.random() > 0.5 ? '50%' : '20%'};
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: floatRandom${sectionIndex} ${Math.random() * 4 + 5}s ease-in-out infinite;
                    animation-delay: ${Math.random() * 3}s;
                    pointer-events: none;
                    z-index: 1;
                `;
                section.appendChild(floatingElement);
            }
        });
    }
    
    // Parallax scroll effect
    function setupParallax() {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero::before');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
    
    // Button ripple effect
    function addRippleEffect() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
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
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    // Text typing animation
    function typeWriterEffect() {
        const heroTitle = document.querySelector('.hero h2');
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = setInterval(() => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
            }
        }, 100);
    }
    
    // Initialize all animations
    setTimeout(() => {
        staggerGalleryAnimation();
        staggerProductAnimation();
        createFloatingElements();
        setupParallax();
        addRippleEffect();
        // typeWriterEffect(); // Uncomment for typing effect
    }, 100);
});

// Add CSS for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatRandom0 {
        0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.7; }
        25% { transform: translateY(-25px) translateX(15px) rotate(90deg); opacity: 1; }
        50% { transform: translateY(-10px) translateX(-20px) rotate(180deg); opacity: 0.5; }
        75% { transform: translateY(-35px) translateX(8px) rotate(270deg); opacity: 0.8; }
    }
    
    @keyframes floatRandom1 {
        0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.6; }
        33% { transform: translateY(-15px) translateX(12px) scale(1.2); opacity: 0.9; }
        66% { transform: translateY(-8px) translateX(-18px) scale(0.8); opacity: 0.4; }
    }
    
    @keyframes floatRandom2 {
        0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 0.5; }
        50% { transform: translateY(-20px) rotate(180deg) scale(1.3); opacity: 0.8; }
    }
    
    @keyframes floatRandom3 {
        0%, 100% { transform: translateX(0px) translateY(0px) rotate(0deg); opacity: 0.7; }
        25% { transform: translateX(-10px) translateY(-15px) rotate(45deg); opacity: 1; }
        75% { transform: translateX(10px) translateY(-25px) rotate(-45deg); opacity: 0.6; }
    }
    
    @keyframes floatRandom4 {
        0%, 100% { transform: scale(1) rotate(0deg) translateY(0px); opacity: 0.6; }
        50% { transform: scale(1.4) rotate(180deg) translateY(-30px); opacity: 0.9; }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .cta-buttons {
        animation: slideInUp 1s ease-out 0.6s both;
    }
    
    .nav-links a {
        transition: all 0.3s ease;
    }
    
    .nav-links a:hover {
        transform: translateY(-2px);
        text-shadow: 0 2px 4px rgba(214, 51, 132, 0.3);
    }
    
    /* Ensure content is above background animations */
    .gallery > *, .products > *, .about > *, .contact > * {
        position: relative;
        z-index: 2;
    }
`;
document.head.appendChild(style);