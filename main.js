document.addEventListener('DOMContentLoaded', () => {
    // Initialize Three.js canvas for hero section
    initHeroCanvas();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Mobile menu toggle
    initMobileMenu();
    
    // FAQ accordion
    initFaqAccordion();
    
    // 3D perspective effect for chat bubble
    initChatBubbleEffect();
});

function initHeroCanvas() {
    // Create a simple Three.js scene for the hero section
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvas.appendChild(renderer.domElement);
    
    // Add floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create blue gradient particles
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.01,
        color: 0x16a34a, // Green color matching the primary color
        transparent: true,
        opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 5;
    
    // Animation
    const animate = () => {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        renderer.render(scene, camera);
    };
    
    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    animate();
}

function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        for (let i = 0; i < revealElements.length; i++) {
            const elementTop = revealElements[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                revealElements[i].classList.add('active');
            }
        }
    }
    
    // Run on page load
    checkReveal();
    
    // Run on scroll
    window.addEventListener('scroll', checkReveal);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            document.querySelector('.mobile-menu').classList.add('hidden');
        });
    });
}

function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

function initFaqAccordion() {
    const faqToggles = document.querySelectorAll('.faq-toggle');
    
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const faqItem = toggle.closest('.glass-card');
            
            // Close all other FAQs first
            document.querySelectorAll('.glass-card.faq-active').forEach(activeItem => {
                if (activeItem !== faqItem) {
                    activeItem.classList.remove('faq-active');
                }
            });
            
            // Toggle current FAQ
            faqItem.classList.toggle('faq-active');
        });
    });
}

function initChatBubbleEffect() {
    const bubbles = document.querySelectorAll('.chat-bubble');
    
    bubbles.forEach(bubble => {
        bubble.addEventListener('mousemove', (e) => {
            const bubbleRect = bubble.getBoundingClientRect();
            const bubbleX = bubbleRect.left + bubbleRect.width / 2;
            const bubbleY = bubbleRect.top + bubbleRect.height / 2;
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const rotateX = (mouseY - bubbleY) / 25;
            const rotateY = (bubbleX - mouseX) / 25;
            
            if (bubble.querySelector('.chat-bubble-inner')) {
                bubble.querySelector('.chat-bubble-inner').style.transform = `translateZ(20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });
        
        bubble.addEventListener('mouseleave', () => {
            if (bubble.querySelector('.chat-bubble-inner')) {
                bubble.querySelector('.chat-bubble-inner').style.transform = 'translateZ(20px) rotateX(0deg) rotateY(0deg)';
            }
        });
    });
}