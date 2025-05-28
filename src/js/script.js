document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId.length > 1 && targetId.startsWith('#')) {
                e.preventDefault(); 
                const targetElement = document.querySelector(targetId);
            
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 70; 
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                  
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    console.warn(`Smooth scroll: Target element "${targetId}" not found.`);
                }
            }
        });
    });

    // Contact Form submission handler
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const projectTypeInput = document.getElementById('project-type');
            const messageInput = document.getElementById('message');
            
            if (nameInput.value.trim() && emailInput.value.trim() && projectTypeInput.value && messageInput.value.trim()) {
                const submitBtn = this.querySelector('.submit-button');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                setTimeout(() => {
                    submitBtn.textContent = 'Message Sent!';
                    submitBtn.style.background = 'linear-gradient(45deg, #4ade80, #22c55e)';
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = ''; 
                        this.reset(); 
                    }, 2500);
                }, 1500);
            } else {
                alert('Please fill out all fields in the contact form.');
            }
        });
    }

    // Parallax effect for floating cards
    const floatingCards = document.querySelectorAll('.floating-card');
    if (floatingCards.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            floatingCards.forEach((card, index) => {
                const parallaxIntensity = 0.05 + (index * 0.02); 
                const moveAmount = scrolled * parallaxIntensity;
                card.style.setProperty('--js-translate-y', `${moveAmount}px`);
            });
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px'
    };
    const intersectionCallback = (entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observerInstance.unobserve(entry.target); 
            }
        });
    };
    const fadeInObserver = new IntersectionObserver(intersectionCallback, observerOptions);

    // --- START OF MODIFICATIONS FOR STEP 1 ---

    // 1. Animate elements that DON'T need individual staggering (like section titles/descriptions)
    document.querySelectorAll('.about-container .section-title, .about-container .section-description, .contact-container .section-title, .contact-container .section-description, .contact-form').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)'; // Slightly less Y shift for text
        // Standard transition for these elements (no individual stagger based on index)
        element.style.transition = 'opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s'; // Added a small base delay
        fadeInObserver.observe(element);
    });

    // 2. Animate .feature-card and .skill-item WITH STAGGERING
    document.querySelectorAll('.feature-card, .skill-item').forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(25px)'; // Original Y shift for cards
        
        // Calculate the delay for staggering
        const staggerDelay = index * 0.15; // 0.15s delay between each item. Adjust 0.15 as needed.

        // Apply the transition, including the calculated staggerDelay for the transition-delay
        element.style.transition = `opacity 0.7s cubic-bezier(0.645, 0.045, 0.355, 1) ${staggerDelay}s, transform 0.7s cubic-bezier(0.645, 0.045, 0.355, 1) ${staggerDelay}s`;
        
        fadeInObserver.observe(element);
    });

    // --- END OF MODIFICATIONS FOR STEP 1 ---


    // --- Mobile Navigation (Burger Menu) ---
    // (Burger menu code remains commented out as before)
    /*
    ... (burger menu code) ...
    */
});

    // --- Mobile Navigation (Burger Menu) ---
    // This is a basic setup. You'll need to add the burger icon to your HTML's .navbar
    // Example HTML for burger: <button class="burger-menu" aria-label="Toggle menu"><i class="fas fa-bars"></i></button>
    // Place it inside .nav-right or somewhere suitable in .nav-container

    /*
    const burgerMenuButton = document.createElement('button');
    burgerMenuButton.classList.add('burger-menu');
    burgerMenuButton.setAttribute('aria-label', 'Toggle menu');
    burgerMenuButton.innerHTML = '<i class="fas fa-bars"></i>';

    const navRight = document.querySelector('.nav-right');
    const navLinksUl = document.querySelector('.navbar .nav-links');

    if (navRight && navLinksUl) {
        // Insert burger before the filter icon on mobile, or just append to nav-right
        // navRight.insertBefore(burgerMenuButton, navRight.querySelector('.filter-icon')); 
        
        // For simplicity, let's append it. You can adjust placement with CSS.
        // Check if window width is small enough to warrant a burger menu
        if (window.innerWidth <= 992) { // Matches CSS breakpoint for hiding .nav-links
            navRight.appendChild(burgerMenuButton); // Add burger only on small screens

            burgerMenuButton.addEventListener('click', () => {
                navLinksUl.classList.toggle('active');
                burgerMenuButton.classList.toggle('active'); // For styling the burger icon (e.g., to an X)
                // Toggle ARIA expanded state
                const isExpanded = navLinksUl.classList.contains('active');
                burgerMenuButton.setAttribute('aria-expanded', isExpanded);
            });

            // Add styles for .nav-links.active and .burger-menu in your CSS
            // e.g.
            // .nav-links.active { display: flex; flex-direction: column; position: absolute; ... }
            // .burger-menu i.fa-bars { ... }
            // .burger-menu.active i.fa-bars::before { content: "\f00d"; } // Change to X icon
        }
    }
    */
    // Note: The burger menu JS above is commented out. 
    // To enable it:
    // 1. Uncomment the JS block.
    // 2. Add CSS for the .burger-menu and .nav-links.active states.
    // 3. The JS dynamically adds the burger button. You might prefer to add it directly in HTML.

//});