document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    const header = document.querySelector('.header-wrapper');
    const scrollToTopBtn = document.querySelector('.scroll-to-top');

    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        if (scrollToTopBtn) {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('active');
            } else {
                scrollToTopBtn.classList.remove('active');
            }
        }
    });

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');

    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    const dropdowns = document.querySelectorAll('.nav-item.dropdown');
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.nav-link');
        if (trigger) {
            trigger.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active-dropdown');
                }
            });
        }
    });

    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-arrow-prev');
    const nextBtn = document.querySelector('.slider-arrow-next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        if (slides.length === 0) return;
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlideShow() {
        if (slides.length > 0) {
            slideInterval = setInterval(nextSlide, 5000);
        }
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    if (slides.length > 0) {
        showSlide(currentSlide);
        startSlideShow();
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stopSlideShow();
                nextSlide();
                startSlideShow();
            });
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                stopSlideShow();
                prevSlide();
                startSlideShow();
            });
        }
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopSlideShow();
                showSlide(index);
                startSlideShow();
            });
        });
    }

    const testSlides = document.querySelectorAll('.testimonial-slide');
    const testDots = document.querySelectorAll('.testimonial-dot');
    let currentTestimonial = 0;
    let testInterval;

    function showTestimonial(index) {
        if (testSlides.length === 0) return;
        testSlides.forEach(slide => slide.classList.remove('active'));
        testDots.forEach(dot => dot.classList.remove('active'));
        
        currentTestimonial = (index + testSlides.length) % testSlides.length;
        testSlides[currentTestimonial].classList.add('active');
        if (testDots[currentTestimonial]) testDots[currentTestimonial].classList.add('active');
    }

    function nextTestimonial() {
        showTestimonial(currentTestimonial + 1);
    }

    if (testSlides.length > 0) {
        showTestimonial(currentTestimonial);
        testInterval = setInterval(nextTestimonial, 6000);
        
        testDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(testInterval);
                showTestimonial(index);
                testInterval = setInterval(nextTestimonial, 6000);
            });
        });
    }

    const statsNumbers = document.querySelectorAll('.stat-number');
    const counterSpeed = 200;

    function animateCounters() {
        statsNumbers.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const current = +counter.innerText;
                const increment = Math.ceil(target / counterSpeed);

                if (current < target) {
                    counter.innerText = current + increment;
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            updateCount();
        });
    }

    const statsSection = document.querySelector('.stats-grid');
    if (statsSection && statsNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        statsObserver.observe(statsSection);
    }

    const enquiryTrigger = document.querySelector('.enquiry-trigger');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const modalCancel = document.querySelector('.btn-close-modal');

    if (enquiryTrigger && modalOverlay) {
        enquiryTrigger.addEventListener('click', () => {
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    const closeEnquiryModal = () => {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if (modalClose) modalClose.addEventListener('click', closeEnquiryModal);
    if (modalCancel) modalCancel.addEventListener('click', closeEnquiryModal);
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeEnquiryModal();
            }
        });
    }

    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCloseBtn = document.querySelector('.lightbox-close');

    if (galleryItems.length > 0 && lightbox && lightboxImg) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const captionText = item.getAttribute('data-title') || '';
                lightboxImg.src = img.src;
                if (lightboxCaption) {
                    lightboxCaption.innerText = captionText;
                }
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        const closeGalleryLightbox = () => {
            lightbox.style.display = 'none';
            lightboxImg.src = '';
            document.body.style.overflow = '';
        };

        if (lightboxCloseBtn) {
            lightboxCloseBtn.addEventListener('click', closeGalleryLightbox);
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeGalleryLightbox();
            }
        });
    }

    const opdSearch = document.getElementById('opdSearch');
    const opdDeptFilter = document.getElementById('opdDeptFilter');
    const opdRows = document.querySelectorAll('.opd-row');

    function filterOPDTable() {
        if (opdRows.length === 0) return;
        const searchVal = opdSearch ? opdSearch.value.toLowerCase() : '';
        const deptVal = opdDeptFilter ? opdDeptFilter.value : '';

        opdRows.forEach(row => {
            const docName = row.querySelector('td:first-child').innerText.toLowerCase();
            const dept = row.getAttribute('data-dept');

            const matchesSearch = docName.includes(searchVal);
            const matchesDept = deptVal === '' || dept === deptVal;

            if (matchesSearch && matchesDept) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    if (opdSearch) opdSearch.addEventListener('input', filterOPDTable);
    if (opdDeptFilter) opdDeptFilter.addEventListener('change', filterOPDTable);

    const pharmacySearch = document.getElementById('pharmacySearch');
    const pharmacyFilter = document.getElementById('pharmacyFilter');
    const pharmacyItems = document.querySelectorAll('.pharmacy-card-item');

    function filterPharmacyCards() {
        if (pharmacyItems.length === 0) return;
        const searchVal = pharmacySearch ? pharmacySearch.value.toLowerCase() : '';
        const categoryVal = pharmacyFilter ? pharmacyFilter.value : '';

        pharmacyItems.forEach(item => {
            const medName = item.querySelector('h3').innerText.toLowerCase();
            const category = item.getAttribute('data-category');

            const matchesSearch = medName.includes(searchVal);
            const matchesCategory = categoryVal === '' || category === categoryVal;

            if (matchesSearch && matchesCategory) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }

    if (pharmacySearch) pharmacySearch.addEventListener('input', filterPharmacyCards);
    if (pharmacyFilter) pharmacyFilter.addEventListener('change', filterPharmacyCards);
});
