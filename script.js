// ============================================
// PATEL WATCH - Premium Watch Store
// Complete JavaScript - Fully Tested
// ============================================

(function() {
    'use strict';
    
    console.log('⌚ Patel Watch - Initializing...');
    
    // === DOM Elements ===
    const preloader = document.querySelector('.preloader');
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const watchCards = document.querySelectorAll('.watch-card');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // === Preloader ===
    window.addEventListener('load', function() {
        setTimeout(function() {
            if (preloader) {
                preloader.classList.add('hidden');
            }
        }, 1500);
    });
    
    // Fallback: agar load event miss ho jaye
    setTimeout(function() {
        if (preloader && !preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
        }
    }, 3000);
    
    // === Navbar Scroll Effect ===
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
    
    // === Mobile Menu Toggle ===
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu on clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // === 3D Watch Card - Touch/Hover Toggle ===
    watchCards.forEach(function(card) {
        card.addEventListener('click', function(e) {
            // Only toggle on small screens
            if (window.innerWidth <= 768) {
                // Don't toggle if clicking on button or link inside card
                if (!e.target.closest('button') && !e.target.closest('a')) {
                    this.classList.toggle('tapped');
                }
            }
        });
    });
    
    // === Counter Animation ===
    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-count'));
        if (isNaN(target)) return;
        
        var duration = 2000;
        var step = target / (duration / 16);
        var current = 0;
        
        function updateCounter() {
            current += step;
            if (current < target) {
                el.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                el.textContent = target + '+';
            }
        }
        
        updateCounter();
    }
    
    // Intersection Observer for counters
    if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
        var counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(function(num) {
            counterObserver.observe(num);
        });
    } else if (statNumbers.length > 0) {
        // Fallback: animate all counters immediately
        statNumbers.forEach(function(num) {
            animateCounter(num);
        });
    }
    
    // === Collection Filter ===
    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');
            
            var filter = this.getAttribute('data-filter');
            
            // Filter cards
            watchCards.forEach(function(card, index) {
                var category = card.getAttribute('data-category');
                
                card.style.transition = 'all 0.4s ease';
                
                if (filter === 'all' || category === filter) {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                    card.style.display = 'block';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.85)';
                    setTimeout(function() {
                        if (card.style.opacity === '0') {
                            card.style.display = 'none';
                        }
                    }, 400);
                }
            });
        });
    });
    
    // === Initialize Swiper - Gallery ===
    function initGallerySlider() {
        var galleryEl = document.querySelector('.gallery-slider');
        if (galleryEl && typeof Swiper !== 'undefined') {
            try {
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
                            spaceBetween: 25,
                        },
                        1024: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                    }
                });
                console.log('✅ Gallery Slider initialized');
            } catch(e) {
                console.log('Gallery slider error:', e.message);
            }
        }
    }
    
    // === Initialize Swiper - Testimonials ===
    function initTestimonialSlider() {
        var testimonialEl = document.querySelector('.testimonial-slider');
        if (testimonialEl && typeof Swiper !== 'undefined') {
            try {
                new Swiper('.testimonial-slider', {
                    slidesPerView: 1,
                    spaceBetween: 20,
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
                            spaceBetween: 25,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 25,
                        },
                    }
                });
                console.log('✅ Testimonial Slider initialized');
            } catch(e) {
                console.log('Testimonial slider error:', e.message);
            }
        }
    }
    
    // === Initialize AOS ===
    function initAOS() {
        if (typeof AOS !== 'undefined') {
            try {
                AOS.init({
                    duration: 800,
                    easing: 'ease-out-cubic',
                    once: true,
                    offset: 50,
                });
                console.log('✅ AOS initialized');
            } catch(e) {
                console.log('AOS error:', e.message);
            }
        }
    }
    
    // === Three.js 3D Hero Background ===
    function initHeroCanvas() {
        var canvas = document.getElementById('hero-canvas');
        if (!canvas || typeof THREE === 'undefined') {
            console.log('Three.js or canvas not available');
            return;
        }
        
        try {
            var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            var renderer = new THREE.WebGLRenderer({ 
                canvas: canvas, 
                alpha: true,
                antialias: true 
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            
            // Create particles
            var particlesGeometry = new THREE.BufferGeometry();
            var particlesCount = 150;
            var posArray = new Float32Array(particlesCount * 3);
            
            for (var i = 0; i < particlesCount * 3; i += 3) {
                posArray[i] = (Math.random() - 0.5) * 12;
                posArray[i + 1] = (Math.random() - 0.5) * 12;
                posArray[i + 2] = (Math.random() - 0.5) * 8;
            }
            
            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            
            var particlesMaterial = new THREE.PointsMaterial({
                size: 0.025,
                color: 0xD4AF37,
                transparent: true,
                blending: THREE.AdditiveBlending
            });
            
            var particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particlesMesh);
            
            // Create floating rings
            var rings = [];
            for (var j = 0; j < 8; j++) {
                var geometry = new THREE.TorusGeometry(Math.random() * 1.5 + 0.5, 0.02, 16, 100);
                var material = new THREE.MeshBasicMaterial({
                    color: 0xD4AF37,
                    wireframe: true,
                    transparent: true,
                    opacity: 0.25
                });
                var ring = new THREE.Mesh(geometry, material);
                ring.position.set(
                    (Math.random() - 0.5) * 8,
                    (Math.random() - 0.5) * 7,
                    (Math.random() - 0.5) * 4 - 2
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
                    rotX: (Math.random() - 0.5) * 0.005,
                    rotY: (Math.random() - 0.5) * 0.005
                });
                scene.add(ring);
            }
            
            camera.position.z = 5;
            
            // Mouse interaction
            var mouseX = 0;
            var mouseY = 0;
            
            document.addEventListener('mousemove', function(e) {
                mouseX = (e.clientX / window.innerWidth) * 2 - 1;
                mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
            });
            
            // Animation loop
            function animate() {
                requestAnimationFrame(animate);
                
                // Rotate particles
                particlesMesh.rotation.y += 0.0004;
                particlesMesh.rotation.x += 0.0002;
                
                // Animate rings
                rings.forEach(function(r) {
                    r.mesh.position.x += r.speedX;
                    r.mesh.position.y += r.speedY;
                    r.mesh.rotation.x += r.rotX;
                    r.mesh.rotation.y += r.rotY;
                    
                    if (Math.abs(r.mesh.position.x) > 4) r.speedX *= -1;
                    if (Math.abs(r.mesh.position.y) > 3.5) r.speedY *= -1;
                });
                
                // Mouse parallax
                camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.04;
                camera.position.y += (mouseY * 1.2 - camera.position.y) * 0.04;
                camera.lookAt(scene.position);
                
                renderer.render(scene, camera);
            }
            
            animate();
            
            // Resize handler
            window.addEventListener('resize', function() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
            
            console.log('✅ 3D Hero initialized');
        } catch(e) {
            console.log('3D Hero error:', e.message);
        }
    }
    
    // === Smooth Scroll ===
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // === Parallax effect on hero ===
    window.addEventListener('scroll', function() {
        var scrolled = window.pageYOffset;
        var heroContent = document.querySelector('.hero-content');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = 'translateY(' + (scrolled * 0.25) + 'px)';
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });
    
    // === Keyboard - Close menu on Escape ===
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // === Initialize Everything ===
    function initAll() {
        initHeroCanvas();
        initGallerySlider();
        initTestimonialSlider();
        initAOS();
        
        console.log('%c✅ Patel Watch Website Ready!', 'color: #D4AF37; font-size: 16px;');
        console.log('%c🚀 Powered by RS App Store', 'color: #D4AF37;');
    }
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        // DOM already loaded
        initAll();
    }
    
})();