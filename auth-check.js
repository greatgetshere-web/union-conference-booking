// Authentication Check for Admin Dashboard
// This script must be included at the top of admin.html

const AUTHORIZED_EMAILS = [
    'yassir.shuaib@eu.phchd.com',
    'maria.salazardecastro@eu.phchd.com',
    'atsushi.yanagida@phchd.com',
    'wenji.yuan@phchd.com',
    'naofumi.yoda@phchd.com'
];

// Check authentication
function checkAuth() {
    const loggedInEmail = localStorage.getItem('admin_email');
    const loginTime = localStorage.getItem('admin_login_time');
    
    // Check if logged in
    if (!loggedInEmail || !AUTHORIZED_EMAILS.includes(loggedInEmail.toLowerCase())) {
        // Not logged in or not authorized - redirect to login page
        window.location.href = 'admin-login.html';
        return false;
    }
    
    // Check if session expired (24 hours)
    if (loginTime) {
        const loginDate = new Date(loginTime);
        const now = new Date();
        const hoursSinceLogin = (now - loginDate) / (1000 * 60 * 60);
        
        if (hoursSinceLogin > 24) {
            // Session expired - logout and redirect
            logout();
            return false;
        }
    }
    
    return true;
}

// Logout function
function logout() {
    localStorage.removeItem('admin_email');
    localStorage.removeItem('admin_login_time');
    window.location.href = 'admin-login.html';
}

// Get current user email
function getCurrentUserEmail() {
    return localStorage.getItem('admin_email');
}

// Run auth check immediately
if (!checkAuth()) {
    // Will redirect to login page
    throw new Error('Authentication required');
}

// Display logged in user info
document.addEventListener('DOMContentLoaded', () => {
    const email = getCurrentUserEmail();
    
    // Add user info to header if element exists
    const headerContent = document.querySelector('.header-content');
    if (headerContent && email) {
        const userInfo = document.createElement('div');
        userInfo.className = 'user-info';
        userInfo.style.cssText = 'display: flex; align-items: center; gap: 15px; color: white; font-size: 14px;';
        userInfo.innerHTML = `
            <span>👤 ${email}</span>
            <button onclick="logout()" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 13px;">
                Logout
            </button>
        `;
        
        // Insert before nav
        const nav = headerContent.querySelector('.nav');
        if (nav) {
            headerContent.insertBefore(userInfo, nav);
        } else {
            headerContent.appendChild(userInfo);
        }
    }
});

