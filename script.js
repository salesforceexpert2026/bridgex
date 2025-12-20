// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MOBILE MENU TOGGLE ==========
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const navDropdown = document.getElementById('navDropdown');
    const dropdownMenu = document.getElementById('dropdownMenu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // ========== MOBILE DROPDOWN TOGGLE ==========
    const dropdownToggle = document.querySelector('.dropdown-toggle');

    if (dropdownToggle && navDropdown) {
        dropdownToggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                navDropdown.classList.toggle('active');
            }
        });
    }

    // ========== CLOSE DROPDOWN ON LINK CLICK ==========
    document.querySelectorAll('.dropdown-link').forEach(function(link) {
        link.addEventListener('click', function() {
            if (dropdownMenu) {
                dropdownMenu.classList.add('hide');
                setTimeout(function() {
                    dropdownMenu.classList.remove('hide');
                }, 5000);
            }
            if (navDropdown) {
                navDropdown.classList.remove('active');
            }
            if (navLinks) {
                navLinks.classList.remove('active');
            }
            if (mobileMenuBtn) {
                var icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // ========== NAVBAR SCROLL EFFECT ==========
    var navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.padding = '0';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.padding = '5px 0';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // ========== BACK TO TOP BUTTON ==========
    var backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ========== SMOOTH SCROLL FOR NAV LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                var target = document.querySelector(href);
                if (target) {
                    var offsetTop = target.offsetTop - 100;
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                    
                    // Close mobile menu
                    if (navLinks) navLinks.classList.remove('active');
                    if (mobileMenuBtn) {
                        var icon = mobileMenuBtn.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                    if (navDropdown) navDropdown.classList.remove('active');
                }
            }
        });
    });

    // ========== CONTACT FORM HANDLING ==========
    var contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var name = document.getElementById('name').value;
            
            var successMsg = document.createElement('div');
            successMsg.className = 'form-success';
            successMsg.innerHTML = '<i class="fas fa-check-circle"></i><p>Thank you ' + name + '! Your message has been sent successfully. We\'ll get back to you soon!</p>';
            successMsg.style.cssText = 'background: #10b981; color: white; padding: 20px; border-radius: 10px; text-align: center; margin-top: 20px;';
            
            contactForm.appendChild(successMsg);
            contactForm.reset();
            
            setTimeout(function() {
                successMsg.remove();
            }, 5000);
        });
    }

    // ========== NEWSLETTER FORM ==========
    var newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            this.innerHTML = '<p style="color: #10b981; font-weight: 500;"><i class="fas fa-check"></i> Subscribed successfully!</p>';
        });
    }

    // ========== SCROLL ANIMATIONS ==========
    function animateOnScroll() {
        var elements = document.querySelectorAll('.service-card, .portfolio-item, .feature, .industry-card');
        
        elements.forEach(function(element) {
            var elementTop = element.getBoundingClientRect().top;
            var windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    document.querySelectorAll('.service-card, .portfolio-item, .feature, .industry-card').forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

});
