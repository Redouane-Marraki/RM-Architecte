// Toggle the sidebar
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar.style.width === "250px") {
      sidebar.style.width = "0";
    } else {
      sidebar.style.width = "250px";
    }
  }
  
  // Close the sidebar when clicking on any link inside the sidebar
  const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById("sidebar").style.width = "0"; // Close sidebar
    });
  });
  
  // Close sidebar when clicking on a project or any link inside the sidebar (you may have already set this, but this adds more reliability)
  const projectLinks = document.querySelectorAll('.pics a');
  projectLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById("sidebar").style.width = "0"; // Close sidebar
    });
  });
  