// ========== MOBILE MENU TOGGLE ==========
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Toggle icon between bars and X
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
    });
});

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.padding = '10px 0';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.padding = '15px 0';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// ========== STATS COUNTER ANIMATION ==========
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target;
                // Add + sign for support hours
                if (target === 24) {
                    stat.textContent = '24/7';
                } else if (target >= 10) {
                    stat.textContent = target + '+';
                }
            }
        };
        
        updateNumber();
    });
}

// Trigger stats animation when section is visible
const statsSection = document.querySelector('.stats');

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            animateStats();
            statsAnimated = true;
        }
    });
}, { threshold: 0.5 });

statsObserver.observe(statsSection);

// ========== TESTIMONIAL SLIDER ==========
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
let currentTestimonial = 0;
let testimonialInterval;

function showTestimonial(index) {
    testimonials.forEach((t, i) => {
        t.classList.remove('active');
        dots[i].classList.remove('active');
    });
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Auto-rotate testimonials
function startTestimonialSlider() {
    testimonialInterval = setInterval(nextTestimonial, 5000);
}

startTestimonialSlider();

// Click on dots to change testimonial
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(testimonialInterval);
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
        startTestimonialSlider();
    });
});

// ========== BACK TO TOP BUTTON ==========
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== SMOOTH SCROLL FOR NAV LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========== CONTACT FORM HANDLING ==========
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };
    
    // Here you would normally send the data to a server
    // For now, we'll show a success message
    
    // Create success message
    const successMsg = document.createElement('div');
    successMsg.className = 'form-success';
    successMsg.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Thank you ${formData.name}! Your message has been sent successfully. We'll get back to you soon!</p>
    `;
    successMsg.style.cssText = `
        background: #10b981;
        color: white;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        margin-top: 20px;
        animation: fadeIn 0.5s ease;
    `;
    
    // Add success message
    contactForm.appendChild(successMsg);
    
    // Reset form
    contactForm.reset();
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMsg.remove();
    }, 5000);
});

// ========== NEWSLETTER FORM ==========
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        
        // Show success
        this.innerHTML = `
            <p style="color: #10b981; font-weight: 500;">
                <i class="fas fa-check"></i> Subscribed successfully!
            </p>
        `;
    });
}

// ========== SCROLL ANIMATIONS ==========
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .team-member, .feature');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animated elements
document.querySelectorAll('.service-card, .portfolio-item, .team-member, .feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
});

// Run on scroll
window.addEventListener('scroll', animateOnScroll);

// Run once on load
window.addEventListener('load', animateOnScroll);

// ========== ACTIVE NAV LINK ON SCROLL ==========
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-links a[href*=' + sectionId + ']')?.classList.add('active');
        } else {
            document.querySelector('.nav-links a[href*=' + sectionId + ']')?.classList.remove('active');
        }
    });
});

// ========== PAGE LOAD ANIMATION ==========
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Initially hide body for smooth load
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
