document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const path = window.location.pathname;
    
    // --- 1. Protected Routes (Ensure user is logged in for main content) ---
    // Check if the current page is index.html or any page inside /pages/ except login/signup
    if (path.includes('index.html') || path.includes('profile.html') || path.includes('settings.html')) {
        if (isLoggedIn !== 'true') {
            // FIX: Correct path from index.html (root) to login.html
            window.location.href = 'pages/login.html'; 
            return; 
        }
    }

    // --- 2. Universal Logout Functionality ---
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn'); // Clear the session
            
            // Determine correct redirect path:
            // If currently on /pages/*, redirect to login.html (same directory)
            // If currently on /index.html, redirect to pages/login.html
            const redirectPath = path.includes('pages/') ? 'login.html' : 'pages/login.html';
            window.location.href = redirectPath;
        });
    }

    // --- 3. Mobile Navigation Toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});