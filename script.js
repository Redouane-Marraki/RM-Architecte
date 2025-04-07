// Toggle the sidebar
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
}

// Close sidebar function
function closeSidebar() {
    document.getElementById("sidebar").classList.remove("open");
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar when clicking the hamburger icon
    const sidebarToggleBtn = document.querySelector('.icon');
    if (sidebarToggleBtn) {
        sidebarToggleBtn.addEventListener('click', toggleSidebar);
    }

    // Close sidebar when clicking the close button
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSidebar);
    }

    // Close sidebar when clicking on any link inside the sidebar
    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);

        // Simulate hover effect on mobile
        link.addEventListener('touchstart', function() {
            this.classList.add('touch-hover');
        });

        link.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-hover');
            }, 200);
        });
    });

    // Handle tap interactions on project images and titles
    const projectElements = document.querySelectorAll('.pics, .pics img, .project-title, .pics a');
    projectElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            const picsElement = this.closest('.pics') || this;
            picsElement.classList.add('touch-hover');
            
            const title = picsElement.querySelector('.project-title');
            if (title) {
                title.classList.add('touch-hover');
            }
        });

        element.addEventListener('touchend', function() {
            const picsElement = this.closest('.pics') || this;
            setTimeout(() => {
                picsElement.classList.remove('touch-hover');
                
                const title = picsElement.querySelector('.project-title');
                if (title) {
                    title.classList.remove('touch-hover');
                }
            }, 200);
        });
    });

    // Handle hover and touch for about image
    const aboutImage = document.querySelector('.about-image');
    if (aboutImage) {
        // Mouse hover
        aboutImage.addEventListener('mouseenter', function() {
            this.classList.add('hover-effect');
        });
        aboutImage.addEventListener('mouseleave', function() {
            this.classList.remove('hover-effect');
        });

        // Touch events
        aboutImage.addEventListener('touchstart', function() {
            this.classList.add('touch-hover');
        });
        aboutImage.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-hover');
            }, 500);
        });
    }

    // Close sidebar when clicking on a project link
    const projectLinks = document.querySelectorAll('.pics a');
    projectLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });
});

// Add touch hover effect for project slides
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    
    slides.forEach(slide => {
        // Handle touch events
        slide.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.classList.add('touch-active');
        });
        
        slide.addEventListener('touchend', function(e) {
            e.preventDefault();
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 300);
        });
        
        // Prevent default behavior for touch moves to avoid scrolling
        slide.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, { passive: false });
    });
    
    // Close touch hover when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.slide')) {
            slides.forEach(slide => {
                slide.classList.remove('touch-active');
            });
        }
    });
});
// Force video play on mobile
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.project-video');
    
    // Modern way to handle autoplay
    if (video) {
      const playPromise = video.play();
      
      // Handle autoplay restrictions
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Fallback: Show play button
          video.controls = true;
          console.log('Autoplay prevented:', error);
        });
      }
    }
    
    // Add touch event to play video if blocked
    if ('ontouchstart' in window) {
      video.addEventListener('touchstart', function() {
        video.play().catch(e => console.log('Video play failed:', e));
      }, { once: true });
    }
  });
  // Improved touch handling for mobile scroll+hover
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    let touchStartY = 0;
    let isScrolling = false;
  
    slides.forEach(slide => {
      slide.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
        isScrolling = false;
        this.classList.add('touch-active');
      });
  
      slide.addEventListener('touchmove', function(e) {
        // Check if user is scrolling (vertical movement)
        if (Math.abs(e.touches[0].clientY - touchStartY) > 5) {
          isScrolling = true;
          this.classList.remove('touch-active');
        }
      });
  
      slide.addEventListener('touchend', function(e) {
        if (!isScrolling) {
          // If not scrolling, maintain hover state briefly
          setTimeout(() => {
            this.classList.remove('touch-active');
          }, 500);
        } else {
          this.classList.remove('touch-active');
        }
        isScrolling = false;
      });
    });
  
    // Cancel hover when user starts scrolling page
    window.addEventListener('scroll', function() {
      if (window.scrollY > 0) {
        slides.forEach(slide => {
          slide.classList.remove('touch-active');
        });
      }
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const slidesContainer = document.querySelector('.slides');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideCount = document.querySelectorAll('.slide').length;
    const slideInterval = 2000; // 3 seconds
    
    function goToSlide(index) {
        currentSlide = index;
        const slideWidth = 100 / slideCount;
        slidesContainer.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        goToSlide(currentSlide);
    }
    
    // Set up automatic sliding
    let autoSlide = setInterval(nextSlide, slideInterval);
    
    // Pause on hover
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
    carousel.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, slideInterval);
    });
    
    // Dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            goToSlide(slideIndex);
        });
    });
});
