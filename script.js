// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {

    // Service Toggle Functionality
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const gallerySection = document.getElementById('gallery');
    const carGallerySection = document.getElementById('car-gallery');

    // Content for each service
    const content = {
        windows: {
            heroTitle: '<span class="title-line">Dirty Windows?</span><span class="title-accent">We Can Fix That.</span>',
            heroSubtitle: 'Professional window washing that brings the sparkle back to your home or business. Crystal clear views, guaranteed satisfaction.'
        },
        detailing: {
            heroTitle: '<span class="title-line">Dirty Car?</span><span class="title-accent">We\'ll Make It Shine.</span>',
            heroSubtitle: 'Premium car detailing that makes your vehicle look showroom-ready. From express washes to full ceramic coatings.'
        }
    };

    // Toggle click handler
    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const service = this.dataset.service;

            // Update active button
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Update content with animation
            updateContent(service);
        });
    });

    function updateContent(service) {
        // Fade out
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(20px)';

        setTimeout(() => {
            // Update content
            heroTitle.innerHTML = content[service].heroTitle;
            heroSubtitle.textContent = content[service].heroSubtitle;

            // Toggle gallery visibility
            if (service === 'windows') {
                if (gallerySection) gallerySection.style.display = 'block';
                if (carGallerySection) carGallerySection.style.display = 'none';
                currentWords = windowsWords;
                // Toggle checkbox groups
                const windowsCheckboxes = document.getElementById('windows-checkboxes');
                const detailingCheckboxes = document.getElementById('detailing-checkboxes');
                if (windowsCheckboxes) windowsCheckboxes.style.display = 'block';
                if (detailingCheckboxes) {
                    detailingCheckboxes.style.display = 'none';
                    // Clear detailing checkboxes
                    detailingCheckboxes.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
                }
                // Show windows services grid and comparison section
                const windowsServicesGrid = document.getElementById('windows-services-grid');
                if (windowsServicesGrid) windowsServicesGrid.style.display = 'grid';
                const comparisonSection = document.getElementById('comparison');
                if (comparisonSection) comparisonSection.style.display = 'block';
                // Hide car comparison section and columns gallery
                const carComparisonSection = document.getElementById('car-comparison');
                if (carComparisonSection) carComparisonSection.style.display = 'none';
                const columnsGallery = document.getElementById('columns-gallery');
                if (columnsGallery) columnsGallery.style.display = 'none';
                // Add windows hero background, remove detailing
                const heroSection = document.getElementById('hero-windows');
                if (heroSection) {
                    heroSection.classList.add('windows-hero');
                    heroSection.classList.remove('detailing-hero');
                }
            } else {
                if (gallerySection) gallerySection.style.display = 'none';
                if (carGallerySection) carGallerySection.style.display = 'block';
                currentWords = detailingWords;
                // Toggle checkbox groups
                const windowsCheckboxes = document.getElementById('windows-checkboxes');
                const detailingCheckboxes = document.getElementById('detailing-checkboxes');
                if (detailingCheckboxes) detailingCheckboxes.style.display = 'block';
                if (windowsCheckboxes) {
                    windowsCheckboxes.style.display = 'none';
                    // Clear windows checkboxes
                    windowsCheckboxes.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
                }
                // Hide windows services grid and comparison section on detailing page
                const windowsServicesGrid = document.getElementById('windows-services-grid');
                if (windowsServicesGrid) windowsServicesGrid.style.display = 'none';
                const comparisonSection = document.getElementById('comparison');
                if (comparisonSection) comparisonSection.style.display = 'none';
                // Show car comparison section and columns gallery
                const carComparisonSection = document.getElementById('car-comparison');
                if (carComparisonSection) carComparisonSection.style.display = 'block';
                const columnsGallery = document.getElementById('columns-gallery');
                if (columnsGallery) columnsGallery.style.display = 'block';
                // Switch to detailing hero background
                const heroSection = document.getElementById('hero-windows');
                if (heroSection) {
                    heroSection.classList.remove('windows-hero');
                    heroSection.classList.add('detailing-hero');
                }
            }

            // Reset rotating text to first word of new list
            currentWordIndex = 0;
            const element = document.getElementById('rotating-text');
            if (element) {
                element.textContent = currentWords[0];
            }

            // Fade in
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 300);
    }

    // Add transition styles dynamically
    heroTitle.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    heroSubtitle.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    // Rotating Text Animation - different words for each service
    const windowsWords = ['windows', 'tracks', 'sills', 'frames', 'screens', 'skylights', 'gutters'];
    const detailingWords = ['paint', 'wheels', 'seats', 'dashboard', 'floormats', 'carpet', 'windows'];
    let currentWords = windowsWords; // Start with windows words
    let currentWordIndex = 0;

    function rotateText() {
        currentWordIndex = (currentWordIndex + 1) % currentWords.length;
        const element = document.getElementById('rotating-text');

        if (element) {
            // Trigger animation by removing and re-adding the element
            element.style.animation = 'none';
            element.offsetHeight; // Force reflow
            element.textContent = currentWords[currentWordIndex];
            element.style.animation = 'slideUp 0.4s ease-out';
        }
    }

    // Start rotating every 2 seconds
    if (document.getElementById('rotating-text')) {
        setInterval(rotateText, 2000);
    }

    // Form submission handler
    const quoteForm = document.getElementById('quote-form');

    quoteForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);

        // Get all checked services
        const services = [];
        this.querySelectorAll('input[name="services"]:checked').forEach(cb => {
            services.push(cb.value);
        });

        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            services: services.join(', '),
            message: formData.get('message')
        };

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;

        try {
            const response = await fetch('/api/send-quote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // Success
                submitBtn.innerHTML = '<span>✓ Quote Requested!</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #34d399 100%)';
                this.reset();
            } else {
                // Error from server
                submitBtn.innerHTML = '<span>✕ Error - Try Again</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)';
            }
        } catch (error) {
            // Network error
            console.error('Form submission error:', error);
            submitBtn.innerHTML = '<span>✕ Error - Try Again</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)';
        }

        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.85)';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.step-card, .service-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Comparison Slider Functionality
    document.querySelectorAll('.comparison-slider').forEach(slider => {
        const range = slider.querySelector('.comparison-range');
        const beforeImage = slider.querySelector('.comparison-before');
        const handle = slider.querySelector('.comparison-handle');

        function updateSlider(value) {
            const percent = 100 - value;
            beforeImage.style.clipPath = `inset(0 ${percent}% 0 0)`;
            handle.style.left = `${value}%`;
        }

        range.addEventListener('input', (e) => {
            updateSlider(e.target.value);
        });

        // Initialize at 50%
        updateSlider(50);
    });
});
