document.addEventListener('DOMContentLoaded', () => {
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Enhanced Theme Toggle with System Preference Detection
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Check system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Function to set theme
    const setTheme = (theme) => {
        document.body.classList.toggle('dark-theme', theme === 'dark');
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon', theme !== 'dark');
        icon.classList.toggle('fa-sun', theme === 'dark');
        localStorage.setItem('theme', theme);
    };

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDarkScheme.matches) {
        setTheme('dark');
    }

    // Theme toggle handler
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-theme');
        setTheme(isDark ? 'light' : 'dark');
    });

    // Listen for system theme changes
    prefersDarkScheme.addListener((e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your message!');
            contactForm.reset();
        });
    }

    // Initialize vanilla-tilt for contact cards
    VanillaTilt.init(document.querySelectorAll(".contact-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });

    // Skill planets animation
    document.querySelectorAll('.skill-planet').forEach(planet => {
        planet.addEventListener('mouseover', function() {
            this.style.animationPlayState = 'paused';
        });
        
        planet.addEventListener('mouseout', function() {
            this.style.animationPlayState = 'running';
        });
    });

    // Initialize skill tags progress
    initSkillTags();
});

// Generate particles for hero section
function createParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random initial position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration and delay
        particle.style.animationDuration = `${Math.random() * 4 + 6}s`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        
        particlesContainer.appendChild(particle);
    }
}

document.addEventListener('DOMContentLoaded', createParticles);

// Create animated code background
function createCodeBackground() {
    const codeLines = [
        "const developer = new FullStackDeveloper();",
        "while(true) { learnNewTechnologies(); }",
        "function solveProblems() { return innovative_solutions; }",
        "if(coffee.isEmpty()) { refill(); }",
        "git commit -m 'Building amazing things'",
        "class Life { constructor() { this.mode = 'coding'; } }"
    ];

    const codeBackground = document.getElementById('codeBackground');
    let delay = 0;

    codeLines.forEach((line, index) => {
        const codeLine = document.createElement('div');
        codeLine.className = 'code-line';
        codeLine.textContent = line;
        codeLine.style.top = `${(index * 40) + Math.random() * 60}px`;
        codeLine.style.animationDelay = `${delay}s`;
        codeBackground.appendChild(codeLine);
        delay += 3;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createCodeBackground();
    // ...existing code...
});

// Particle System
function initParticleSystem() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = 'rgba(74, 144, 226, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function createParticles() {
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animateParticles);
    }

    createParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Cursor glow effect
function initCursorGlow() {
    const cursor = document.querySelector('.cursor-glow');
    cursor.style.display = 'block';

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

// Matrix Rain Effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    document.querySelector('.matrix-rain').appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 33);
}

// Neural Network Visualization
function initNeuralNetwork() {
    const canvas = document.getElementById('networkCanvas');
    const ctx = canvas.getContext('2d');
    const neurons = [];
    const connections = [];

    // Initialize neurons and connections
    // Add animation logic here
}

document.addEventListener('DOMContentLoaded', () => {
    initParticleSystem();
    initCursorGlow();
    createMatrixRain();
    initNeuralNetwork();
    // ...existing code...
});

// Add glow effect for about cards
document.querySelectorAll('.map-node').forEach(node => {
    node.addEventListener('mousemove', (e) => {
        const rect = node.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / node.offsetWidth) * 100;
        const y = ((e.clientY - rect.top) / node.offsetHeight) * 100;
        node.querySelector('.glow-effect').style.setProperty('--x', `${x}%`);
        node.querySelector('.glow-effect').style.setProperty('--y', `${y}%`);
    });
});

// Add interactive effects for about cards
document.querySelectorAll('.map-node').forEach(node => {
    // Add particles
    const particles = document.createElement('div');
    particles.className = 'particles';
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.setProperty('--tx', `${(Math.random() - 0.5) * 100}px`);
        particle.style.setProperty('--ty', `${(Math.random() - 0.5) * 100}px`);
        particles.appendChild(particle);
    }
    node.appendChild(particles);

    // Add hover glow effect
    node.addEventListener('mousemove', (e) => {
        const rect = node.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / node.offsetWidth) * 100;
        const y = ((e.clientY - rect.top) / node.offsetHeight) * 100;
        node.style.setProperty('--x', `${x}%`);
        node.style.setProperty('--y', `${y}%`);
    });
});

// Enhanced section highlighting and smooth scrolling
function initNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Smooth scrolling with offset
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const offset = 20; // Adjust this value based on your needs
            
            const targetPosition = targetSection.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Active section highlighting
    function highlightNavigation() {
        const scrollPosition = window.scrollY + 100; // Adjust threshold as needed

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Throttle scroll event for better performance
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                highlightNavigation();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // Initial highlight
    highlightNavigation();
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', initNavigation);

// Initialize skill tags progress
function initSkillTags() {
    const tags = document.querySelectorAll('.tag');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const tag = entry.target;
                const level = tag.dataset.level;
                const progress = tag.querySelector('.tag-progress');
                progress.style.width = `${level}%`;
            }
        });
    }, { threshold: 0.5 });

    tags.forEach(tag => observer.observe(tag));
}

document.addEventListener('DOMContentLoaded', () => {
    initSkillTags();
    // ...existing code...
});

// Initialize skill progress bars
function initializeSkillBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItem = entry.target;
                const level = skillItem.dataset.level;
                const progressBar = skillItem.querySelector('.skill-progress');
                progressBar.style.width = `${level}%`;
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-item').forEach(item => {
        observer.observe(item);
    });
}

// Add hover effect for skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / card.offsetWidth) * 100;
        const y = ((e.clientY - rect.top) / card.offsetHeight) * 100;
        card.style.setProperty('--x', `${x}%`);
        card.style.setProperty('--y', `${y}%`);
    });
});

document.addEventListener('DOMContentLoaded', initializeSkillBars);
