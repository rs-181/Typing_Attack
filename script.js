// ============================================
// PATEL WATCH - Premium Watch Store
// Complete JavaScript Functionality
// ============================================

// === DOM Elements ===
const preloader = document.querySelector('.preloader');
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const filterBtns = document.querySelectorAll('.filter-btn');
const watchCards = document.querySelectorAll('.watch-card');
const statNumbers = document.querySelectorAll('.stat-number');

// === Preloader ===
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.cursor = 'default';
    }, 2000);
});

// === Navbar Scroll Effect ===
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// === Mobile Menu Toggle ===
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Animate hamburger
    const spans = navToggle.querySelectorAll('span');
    if (navToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// === Custom Cursor ===
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Cursor hover effects
document.querySelectorAll('a, button, .btn, .watch-card, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        cursorFollower.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursorFollower.classList.remove('active');
    });
});

// === Three.js 3D Hero Background ===
function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        alpha: true,
        antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 15;
        posArray[i + 1] = (Math.random() - 0.5) * 15;
        posArray[i + 2] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0xD4AF37,
        transparent: true,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Create floating rings
    const rings = [];
    for (let i = 0; i < 10; i++) {
        const geometry = new THREE.TorusGeometry(Math.random() * 2 + 0.5, 0.02, 16, 100);
        const material = new THREE.MeshBasicMaterial({
            color: 0xD4AF37,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        const ring = new THREE.Mesh(geometry, material);
        ring.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 5 - 3
        );
        ring.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        rings.push({
            mesh: ring,
            speedX: (Math.random() - 0.5) * 0.003,
            speedY: (Math.random() - 0.5) * 0.003,
            speedZ: (Math.random() - 0.5) * 0.003,
            rotX: (Math.random() - 0.5) * 0.005,
            rotY: (Math.random() - 0.5) * 0.005
        });
        scene.add(ring);
    }
    
    camera.position.z = 5;
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate particles
        particlesMesh.rotation.y += 0.0005;
        particlesMesh.rotation.x += 0.0002;
        
        // Animate rings
        rings.forEach(ring => {
            ring.mesh.position.x += ring.speedX;
            ring.mesh.position.y += ring.speedY;
            ring.mesh.position.z += ring.speedZ;
            ring.mesh.rotation.x += ring.rotX;
            ring.mesh.rotation.y += ring.rotY;
            
            // Bounce rings
            if (Math.abs(ring.mesh.position.x) > 5) ring.speedX *= -1;
            if (Math.abs(ring.mesh.position.y) > 4) ring.speedY *= -1;
            if (Math.abs(ring.mesh.position.z) > 3) ring.speedZ *= -1;
        });
        
        // Mouse parallax
        camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 1.5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// === Counter Animation ===
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            el.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            el.textContent = target + '+';
        }
    };
    
    updateCounter();
}

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(num => counterObserver.observe(num));

// === Collection Filter ===
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        // Filter cards with animation
        watchCards.forEach(card => {
            card.style.transition = 'all 0.5s ease';
            
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
                card.style.display = 'block';
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    if (card.style.opacity === '0') {
                        card.style.display = 'none';
                    }
                }, 500);
            }
        });
    });
});

// === Gallery Slider (Swiper) ===
function initGallerySlider() {
    if (document.querySelector('.gallery-slider')) {
        new Swiper('.gallery-slider', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.gallery-slider .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.gallery-slider .swiper-button-next',
                prevEl: '.gallery-slider .swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 1.5,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
            }
        });
    }
}

// === Testimonial Slider ===
function initTestimonialSlider() {
    if (document.querySelector('.testimonial-slider')) {
        new Swiper('.testimonial-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.testimonial-slider .swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            }
        });
    }
}

// === Initialize AOS ===
function initAOS() {
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
    });
}

// === Smooth Scroll for all anchor links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// === Parallax effect on scroll ===
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax for hero
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// === Initialize Everything ===
document.addEventListener('DOMContentLoaded', () => {
    initHeroCanvas();
    initGallerySlider();
    initTestimonialSlider();
    initAOS();
    
    console.log('%c⌚ Patel Watch - Premium Website Ready %c✨', 
        'color: #D4AF37; font-size: 20px;', 
        'color: #fff;');
    console.log('%c🚀 Powered by RS App Store %c| %crs-appstore.blogspot.com', 
        'color: #D4AF37;', '', 'color: #aaa;');
});

// === Keyboard Navigation ===
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});