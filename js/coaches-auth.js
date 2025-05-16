document.addEventListener('DOMContentLoaded', function() {
    // Check if user is on the coaches portal page
    const isCoachesPortal = window.location.pathname.includes('coaches-portal.html');
    
    // Check if user is on the login page
    const isLoginPage = window.location.pathname.includes('coaches.html');
    
    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('login-error');
            
            // Simple password check - in a real app, this would be handled server-side
            // The password is "jags2025" - this would normally be hashed and stored securely
            if (password === 'jags2025') {
                // Store authentication in sessionStorage (cleared when browser is closed)
                sessionStorage.setItem('coachAuthenticated', 'true');
                
                // Redirect to coaches portal
                window.location.href = 'coaches-portal.html';
            } else {
                // Show error message
                errorMessage.style.display = 'block';
                
                // Clear password field
                document.getElementById('password').value = '';
            }
        });
    }
    
    // Handle logout button
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            // Clear authentication
            sessionStorage.removeItem('coachAuthenticated');
            
            // Redirect to login page
            window.location.href = 'coaches.html';
        });
    }
    
    // Protect coaches portal page
    if (isCoachesPortal) {
        const isAuthenticated = sessionStorage.getItem('coachAuthenticated') === 'true';
        
        if (!isAuthenticated) {
            // Redirect to login page if not authenticated
            window.location.href = 'coaches.html';
        }
    }
    
    // If user is already authenticated and visits the login page, redirect to portal
    if (isLoginPage) {
        const isAuthenticated = sessionStorage.getItem('coachAuthenticated') === 'true';
        
        if (isAuthenticated) {
            window.location.href = 'coaches-portal.html';
        }
    }
});