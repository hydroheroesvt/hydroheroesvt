// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {

    // Service Toggle Functionality
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroBadgeText = document.getElementById('hero-badge-text');
    const aboutTeaserTitle = document.getElementById('about-teaser-title');
    const aboutTeaserImage = document.getElementById('about-teaser-image');
    const gallerySection = document.getElementById('gallery');
    const carGallerySection = document.getElementById('car-gallery');

    // Content for each service
    const content = {
        windows: {
            heroBadge: 'Top Rated Window Cleaners in the Upper Valley',
            heroTitle: '<span class="title-line">Dirty Windows?</span><span class="title-accent">We Can Fix That.</span>',
            heroSubtitle: 'Professional window washing that brings the sparkle back to your home or business. Crystal clear views, guaranteed satisfaction.',
            aboutTeaserTitle: 'More Than Just Window Cleaners',
            aboutTeaserImage: 'images/teaser_windows.jpg'
        },
        detailing: {
            heroBadge: 'Top Rated Car Detailers in the Upper Valley',
            heroTitle: '<span class="title-accent" style="display:inline;">We\'ll Make It Shine.</span>',
            heroSubtitle: 'Premium car detailing that makes your vehicle look showroom-ready. From express washes to full ceramic coatings.',
            aboutTeaserTitle: 'More Than Just Car Detailers',
            aboutTeaserImage: 'images/teaser_car.jpg'
        }
    };

    // Determine initial service from URL path
    function getServiceFromPath() {
        const path = window.location.pathname;
        if (path === '/detailing') return 'detailing';
        return 'windows';
    }

    // Activate a service (update toggle buttons + content), optionally push URL
    function activateService(service, pushUrl, scrollToTop) {
        // Update active button
        toggleButtons.forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`.toggle-btn[data-service="${service}"]`);
        if (activeBtn) activeBtn.classList.add('active');

        if (scrollToTop) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Push URL state
        if (pushUrl) {
            const newPath = service === 'detailing' ? '/detailing' : '/windows';
            history.pushState({ service: service }, '', newPath);
        }

        // Update page title and meta description
        const titleEl = document.querySelector('title');
        const metaDesc = document.querySelector('meta[name="description"]');
        if (service === 'detailing') {
            if (titleEl) titleEl.textContent = 'Hydro Heroes | Professional Car Detailing';
            if (metaDesc) metaDesc.setAttribute('content', 'Hydro Heroes provides premium car detailing services in Vermont. From express washes to full ceramic coatings. Get a free quote today!');
        } else {
            if (titleEl) titleEl.textContent = 'Hydro Heroes | Professional Window Washing';
            if (metaDesc) metaDesc.setAttribute('content', 'Hydro Heroes provides premium window washing services in Vermont. Crystal clear views, guaranteed satisfaction. Get a free quote today!');
        }

        // Update content with animation
        updateContent(service);
    }

    // Toggle click handler
    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const service = this.dataset.service;
            activateService(service, true, true);
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function (e) {
        const service = (e.state && e.state.service) ? e.state.service : getServiceFromPath();
        activateService(service, false, false);
    });

    // On initial page load, activate the correct service based on URL
    const initialService = getServiceFromPath();
    if (initialService === 'detailing') {
        // Replace current history state so back button works from here
        history.replaceState({ service: 'detailing' }, '', '/detailing');
        activateService('detailing', false, false);
    } else {
        history.replaceState({ service: 'windows' }, '', window.location.pathname === '/windows' ? '/windows' : window.location.pathname);
    }

    function updateContent(service) {
        // Fade out
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(20px)';
        if (heroBadgeText) {
            heroBadgeText.style.opacity = '0';
            heroBadgeText.style.transform = 'translateY(20px)';
        }

        if (aboutTeaserTitle) {
            aboutTeaserTitle.style.opacity = '0';
            aboutTeaserTitle.style.transform = 'translateY(20px)';
        }

        if (aboutTeaserImage) {
            aboutTeaserImage.style.opacity = '0';
            aboutTeaserImage.style.transform = 'scale(0.95)';
        }

        setTimeout(() => {
            // Update content
            if (heroBadgeText) {
                heroBadgeText.textContent = content[service].heroBadge;
            }
            heroTitle.innerHTML = content[service].heroTitle;
            heroSubtitle.textContent = content[service].heroSubtitle;

            if (aboutTeaserTitle) {
                aboutTeaserTitle.textContent = content[service].aboutTeaserTitle;
                aboutTeaserTitle.style.opacity = '1';
                aboutTeaserTitle.style.transform = 'translateY(0)';
            }

            if (aboutTeaserImage) {
                aboutTeaserImage.src = content[service].aboutTeaserImage;
                aboutTeaserImage.style.opacity = '1';
                aboutTeaserImage.style.transform = 'scale(1)';
            }

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
                // Show comparison section
                const comparisonSection = document.getElementById('comparison');
                if (comparisonSection) comparisonSection.style.display = 'block';
                // Hide car comparison section and columns gallery
                const carComparisonSection = document.getElementById('car-comparison');
                if (carComparisonSection) carComparisonSection.style.display = 'none';
                const columnsGallery = document.getElementById('columns-gallery');
                if (columnsGallery) columnsGallery.style.display = 'none';
                // Show windows columns gallery
                const windowsColumnsGallery = document.getElementById('windows-columns-gallery');
                if (windowsColumnsGallery) windowsColumnsGallery.style.display = 'block';
                // Add windows hero background, remove detailing
                const heroSection = document.getElementById('hero-windows');
                if (heroSection) {
                    heroSection.classList.add('windows-hero');
                    heroSection.classList.remove('detailing-hero');
                }

                // Show windows FAQ, hide detailing FAQ
                const faqWindows = document.getElementById('faq-windows');
                const faqDetailing = document.getElementById('faq-detailing');
                if (faqWindows) faqWindows.style.display = 'block';
                if (faqDetailing) faqDetailing.style.display = 'none';

                // Update quote button URLs for windows
                updateQuoteLinks('windows');
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
                // Hide comparison section on detailing page
                const comparisonSection = document.getElementById('comparison');
                if (comparisonSection) comparisonSection.style.display = 'none';
                // Show car comparison section and columns gallery
                const carComparisonSection = document.getElementById('car-comparison');
                if (carComparisonSection) carComparisonSection.style.display = 'block';
                const columnsGallery = document.getElementById('columns-gallery');
                if (columnsGallery) columnsGallery.style.display = 'block';
                // Hide windows columns gallery
                const windowsColumnsGallery = document.getElementById('windows-columns-gallery');
                if (windowsColumnsGallery) windowsColumnsGallery.style.display = 'none';
                // Switch to detailing hero background
                const heroSection = document.getElementById('hero-windows');
                if (heroSection) {
                    heroSection.classList.remove('windows-hero');
                    heroSection.classList.add('detailing-hero');
                }

                // Show detailing FAQ, hide windows FAQ
                const faqWindows = document.getElementById('faq-windows');
                const faqDetailing = document.getElementById('faq-detailing');
                if (faqWindows) faqWindows.style.display = 'none';
                if (faqDetailing) faqDetailing.style.display = 'block';
            }

            // Update quote button URLs based on active service
            updateQuoteLinks(service);

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
            if (heroBadgeText) {
                heroBadgeText.style.opacity = '1';
                heroBadgeText.style.transform = 'translateY(0)';
            }
        }, 300);
    }

    heroTitle.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    heroSubtitle.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    if (heroBadgeText) {
        heroBadgeText.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }
    if (aboutTeaserTitle) {
        aboutTeaserTitle.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }
    if (aboutTeaserImage) {
        aboutTeaserImage.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }

    // ===== TIMELINE ANIMATION (About Page) =====
    const timelineContainer = document.querySelector('.timeline-container');
    const timelineProgress = document.getElementById('timeline-progress');
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (timelineContainer && timelineProgress) {
        const updateTimeline = () => {
            const rect = timelineContainer.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate absolute positions relative to document
            const elementTop = rect.top + window.scrollY;
            const elementBottom = elementTop + rect.height;
            const currentScroll = window.scrollY;

            // Trigger points based on user request (Aceternity style)
            // Start: When element top is 10% down the viewport (appearing at top)
            const startScroll = elementTop - (windowHeight * 0.1);
            // End: When element bottom is 50% down the viewport (middle of screen)
            const endScroll = elementBottom - (windowHeight * 0.5);

            const totalDistance = endScroll - startScroll;
            const scrolledDistance = currentScroll - startScroll;

            // Calculate progress 0 to 1
            let progress = 0;
            if (totalDistance > 0) {
                progress = scrolledDistance / totalDistance;
            }

            // Clamp between 0 and 1
            // Clamp between 0 and 1
            progress = Math.min(1, Math.max(0, progress));

            // Calculate opacity: Fade in during the first 10% of the progress
            let opacity = progress < 0.1 ? progress * 10 : 1;
            opacity = Math.min(1, Math.max(0, opacity));

            // Update height and opacity
            timelineProgress.style.height = `${progress * 100}%`;
            timelineProgress.style.opacity = `${opacity}`;

            // Highlighting dots
            timelineItems.forEach(item => {
                const itemTop = item.getBoundingClientRect().top;
                // Activate dot when it's in the upper half of screen
                if (itemTop < windowHeight * 0.6) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        };

        window.addEventListener('scroll', updateTimeline);
        window.addEventListener('resize', updateTimeline);
        // Initial call
        updateTimeline();
    }

    // Function to update all quote button URLs based on active service
    function updateQuoteLinks(service) {
        const quoteUrl = service === 'detailing' ? '/quote?service=detailing' : '/quote';

        // Update all quote links on the page
        document.querySelectorAll('a[href^="/quote"]').forEach(link => {
            link.href = quoteUrl;
        });
    }

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

    // Start rotating every 1.5 seconds
    if (document.getElementById('rotating-text')) {
        setInterval(rotateText, 1250);
    }

    // Form submission handler (only if form exists on page)
    const quoteForm = document.getElementById('quote-form');

    if (quoteForm) {
        quoteForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);

            // Get all checked services
            const services = [];
            this.querySelectorAll('input[name="services"]:checked').forEach(cb => {
                services.push(cb.value);
            });

            const street = formData.get('street');
            const city = formData.get('city');
            const state = formData.get('state');
            const fullAddress = `${street}, ${city}, ${state}`;

            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                address: fullAddress,
                services: services.join(', '),
                message: formData.get('message')
            };

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            try {
                const response = await fetch('/.netlify/functions/send-quote', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    // Success
                    submitBtn.innerHTML = '<span>✓ One of our experts will reach out shortly!</span>';
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
    }

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

    // Mobile toggle hide/show on scroll direction
    const serviceToggle = document.querySelector('.service-toggle');
    let lastScrollY = window.scrollY;

    if (serviceToggle) {
        window.addEventListener('scroll', function () {
            if (window.innerWidth > 768) return; // Only on mobile

            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 120) {
                // Scrolling down — hide toggle
                serviceToggle.classList.add('toggle-hidden');
            } else {
                // Scrolling up — show toggle
                serviceToggle.classList.remove('toggle-hidden');
            }

            lastScrollY = currentScrollY;
        });
    }

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

    // ===== REVIEWS CAROUSEL =====
    const reviewsTrack = document.getElementById('reviews-track');
    const reviewsLeftBtn = document.querySelector('.reviews-arrow-left');
    const reviewsRightBtn = document.querySelector('.reviews-arrow-right');

    if (reviewsTrack && reviewsLeftBtn && reviewsRightBtn) {
        let reviewIndex = 0;

        function getCardsPerView() {
            if (window.innerWidth <= 600) return 1;
            if (window.innerWidth <= 900) return 2;
            return 3;
        }

        function getCardWidth() {
            const card = reviewsTrack.querySelector('.review-card');
            if (!card) return 0;
            const style = getComputedStyle(reviewsTrack);
            const gap = parseInt(style.gap) || 20;
            return card.offsetWidth + gap;
        }

        function updateReviewsCarousel() {
            const totalCards = reviewsTrack.querySelectorAll('.review-card').length;
            const perView = getCardsPerView();
            const maxIndex = Math.max(0, totalCards - perView);
            reviewIndex = Math.min(reviewIndex, maxIndex);
            const offset = reviewIndex * getCardWidth();
            reviewsTrack.style.transform = `translateX(-${offset}px)`;
        }

        reviewsLeftBtn.addEventListener('click', () => {
            reviewIndex = Math.max(0, reviewIndex - 1);
            updateReviewsCarousel();
        });

        reviewsRightBtn.addEventListener('click', () => {
            const totalCards = reviewsTrack.querySelectorAll('.review-card').length;
            const perView = getCardsPerView();
            const maxIndex = Math.max(0, totalCards - perView);
            reviewIndex = Math.min(maxIndex, reviewIndex + 1);
            updateReviewsCarousel();
        });

        window.addEventListener('resize', () => {
            updateReviewsCarousel();
        });
    }
});
