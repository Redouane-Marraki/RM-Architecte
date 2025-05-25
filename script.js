// Sidebar Toggle Functions
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
}

function closeSidebar() {
    document.getElementById("sidebar").classList.remove("open");
}

// DOMContentLoaded - Main Initialization
document.addEventListener('DOMContentLoaded', function () {
    // Sidebar toggle
    const sidebarToggleBtn = document.querySelector('.icon');
    if (sidebarToggleBtn) {
        sidebarToggleBtn.addEventListener('click', toggleSidebar);
    }

    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSidebar);
    }

    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);

        link.addEventListener('touchstart', function () {
            this.classList.add('touch-hover');
        });

        link.addEventListener('touchend', function () {
            setTimeout(() => {
                this.classList.remove('touch-hover');
            }, 200);
        });
    });

    // Touch/hover effect for project items
    const projectElements = document.querySelectorAll('.pics, .pics img, .project-title, .pics a');
    projectElements.forEach(element => {
        element.addEventListener('touchstart', function () {
            const picsElement = this.closest('.pics') || this;
            picsElement.classList.add('touch-hover');
            const title = picsElement.querySelector('.project-title');
            if (title) title.classList.add('touch-hover');
        });

        element.addEventListener('touchend', function () {
            const picsElement = this.closest('.pics') || this;
            setTimeout(() => {
                picsElement.classList.remove('touch-hover');
                const title = picsElement.querySelector('.project-title');
                if (title) title.classList.remove('touch-hover');
            }, 200);
        });
    });

    // Hover and touch effect for about image
    const aboutImage = document.querySelector('.about-image');
    if (aboutImage) {
        aboutImage.addEventListener('mouseenter', function () {
            this.classList.add('hover-effect');
        });
        aboutImage.addEventListener('mouseleave', function () {
            this.classList.remove('hover-effect');
        });

        aboutImage.addEventListener('touchstart', function () {
            this.classList.add('touch-hover');
        });
        aboutImage.addEventListener('touchend', function () {
            setTimeout(() => {
                this.classList.remove('touch-hover');
            }, 500);
        });
    }

    // Close sidebar on project link click
    const projectLinks = document.querySelectorAll('.pics a');
    projectLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });

    // Slide touch interactions
    const slides = document.querySelectorAll('.slide');
    let touchStartY = 0;
    let isScrolling = false;

    slides.forEach(slide => {
        slide.addEventListener('touchstart', function (e) {
            touchStartY = e.touches[0].clientY;
            isScrolling = false;
            this.classList.add('touch-active');
        });

        slide.addEventListener('touchmove', function (e) {
            if (Math.abs(e.touches[0].clientY - touchStartY) > 5) {
                isScrolling = true;
                this.classList.remove('touch-active');
            }
        });

        slide.addEventListener('touchend', function () {
            if (!isScrolling) {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 500);
            } else {
                this.classList.remove('touch-active');
            }
            isScrolling = false;
        });
    });

    window.addEventListener('scroll', function () {
        if (window.scrollY > 0) {
            slides.forEach(slide => {
                slide.classList.remove('touch-active');
            });
        }
    });

    // Auto Slide with Dots
    const slidesContainer = document.querySelector('.slides');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideCount = document.querySelectorAll('.slide').length;
    const slideInterval = 3000; // 3 seconds
    let autoSlide;

    // Ensure smooth transition for sliding
    if (slidesContainer) {
        slidesContainer.style.transition = 'transform 1.5s ease-in-out';
    }

    function goToSlide(index) {
        if (index >= slideCount) index = 0;
        if (index < 0) index = slideCount - 1;

        currentSlide = index;
        slidesContainer.style.transform = `translateX(-${currentSlide * (100 / slideCount)}%)`;

        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    }

    function startAutoSlide() {
        autoSlide = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, slideInterval);
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            goToSlide(index);
            startAutoSlide();
        });
    });

    // Swipe events
    let touchStartX = 0;
    slidesContainer.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    });

    slidesContainer.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (diff > 50) goToSlide(currentSlide + 1);
        else if (diff < -50) goToSlide(currentSlide - 1);
    });

    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }

    goToSlide(0);
    startAutoSlide();
});

const images = document.querySelectorAll('.carousel-image');
    let index = 0;

    setInterval(() => {
        images[index].classList.remove('active');
        index = (index + 1) % images.length;
        images[index].classList.add('active');
    }, 2000);  
