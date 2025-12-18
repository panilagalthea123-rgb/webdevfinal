document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Login Simulation Logic ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            if (username && password) {
                // SIMULATED SUCCESS: Store login state and redirect
                localStorage.setItem('isLoggedIn', 'true');
                alert(`Welcome back, ${username}! Redirecting to Kislap feed...`);
                // FIX: Correct path from pages/* to index.html (go up one level)
                window.location.href = '../index.html'; 
            } else {
                alert('Please fill in both fields.');
            }
        });
    }

    // --- 2. Signup Simulation Logic ---
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('new-username').value.trim();
            const email = document.getElementById('new-email').value.trim();
            const pass1 = document.getElementById('new-password').value;
            const pass2 = document.getElementById('confirm-password').value;

            if (!username || !email || !pass1 || !pass2) {
                alert('Please fill in all fields.');
                return;
            }

            if (pass1 !== pass2) {
                alert('Passwords do not match. Try again.');
                return;
            }
            
            // SIMULATED SUCCESS: Redirect to login (same directory)
            alert('✅ Registration successful! Your academic journey begins. Redirecting to login.');
            window.location.href = 'login.html';
        });
    }
});