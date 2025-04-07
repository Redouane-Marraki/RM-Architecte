// Toggle the sidebar
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");  // Toggle the 'open' class to control sidebar width
}

// Close the sidebar when clicking on any link inside the sidebar
const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById("sidebar").classList.remove('open');
    });

    // Simulate hover effect on mobile
    link.addEventListener('touchstart', function() {
        this.classList.add('touch-hover');
    });

    link.addEventListener('touchend', function() {
        setTimeout(() => {
            this.classList.remove('touch-hover');
        }, 200); // Delay to simulate the hover effect
    });
});

// Handle tap interactions on project images (simulate hover effect on touch devices)
const projectImages = document.querySelectorAll('.pics img');
projectImages.forEach(image => {
    image.addEventListener('touchstart', function() {
        // Add the touch-hover class to simulate hover effect
        this.closest('.pics').classList.add('touch-hover');
    });

    image.addEventListener('touchend', function() {
        // Remove the touch-hover class after the tap ends
        setTimeout(() => {
            this.closest('.pics').classList.remove('touch-hover');
        }, 200); // Delay to simulate the hover effect
    });
});

// Handle tap interactions on project titles (simulate hover effect on touch devices)
const projectTitles = document.querySelectorAll('.project-title');
projectTitles.forEach(title => {
    title.addEventListener('touchstart', function() {
        this.classList.add('touch-hover');
    });

    title.addEventListener('touchend', function() {
        setTimeout(() => {
            this.classList.remove('touch-hover');
        }, 200); // Delay to simulate the hover effect
    });
});

// Close sidebar when clicking on a project or any link inside the sidebar
const projectLinks = document.querySelectorAll('.pics a');
projectLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById("sidebar").classList.remove('open');
    });
});

// Handle closing the sidebar when clicking the close button
const closeBtn = document.querySelector('.close-btn');
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        document.getElementById("sidebar").classList.remove('open');
    });
}

// Handle toggling of the sidebar
const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
if (sidebarToggleBtn) {
    sidebarToggleBtn.addEventListener('click', toggleSidebar);
}
