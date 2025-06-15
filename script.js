// Typing animation
const typingText = document.getElementById('typingText');
const phrases = [
    'Backend Developer',
    'API Architect',
    'Problem Solver',
    'Quick Learner',
    'Tech Enthusiast',
    'Python Specialist',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, typingSpeed);
}

typeEffect();

const navbar = document.getElementById('navbar');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

function updateHomePadding() {
    const homeSection = document.getElementById('home');
    const navbarHeight = navbar.offsetHeight;
    homeSection.style.paddingTop = `${navbarHeight + 10}px`;
}

window.addEventListener('resize', updateHomePadding);
document.addEventListener('DOMContentLoaded', updateHomePadding);

// Hamburger menu functionality
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');

    // Add/remove scrolled class when mobile menu is active
    if (navLinks.classList.contains('active')) {
        navbar.classList.add('scrolled');
    } else {
        // Only remove scrolled class if not actually scrolled
            if (window.scrollY <= 100) {
                navbar.classList.remove('scrolled');
            }
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');

        // Remove scrolled class if not actually scrolled
            if (window.scrollY <= 100) {
                navbar.classList.remove('scrolled');
            }
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href')
        const target = document.querySelector(this.getAttribute('href'));
        if (href === "#home") {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-section').forEach(section => {
    observer.observe(section);
});

// Tech category animations
document.querySelectorAll('.tech-category').forEach((category, index) => {
    category.style.animationDelay = `${index * 0.2}s`;
});

// Particles animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Tech item hover effects
document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.1)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const windowHeight = window.innerHeight;

    if (hero) {
        // Parallax effect
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;

        // Blur effect based on scroll position
        const blurAmount = Math.min(scrolled / windowHeight * 10, 10);
        hero.style.filter = `blur(${blurAmount}px)`;

        // Fade out effect
        const opacity = Math.max(1 - (scrolled / windowHeight), 0);
        hero.style.opacity = opacity;
    }
});
