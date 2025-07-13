// Current active section
let currentSection = 'projects';

// Initialize the portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Load default section
    loadSection('projects');
    
    // Add click handlers to navigation
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const sectionName = this.getAttribute('data-section');
            loadSection(sectionName);
        });
    });

    // Initialize photo upload
    initializePhotoUpload();
    
    // Load saved profile photo
    loadSavedProfilePhoto();
});

// Load section content
async function loadSection(sectionName) {
    // Update navigation
    updateNavigation(sectionName);
    
    // Show loading
    showLoading();
    
    try {
        // Load the section content
        const response = await fetch(`sections/${sectionName}.html`);
        if (!response.ok) {
            throw new Error(`Failed to load ${sectionName}`);
        }
        
        const content = await response.text();
        document.getElementById('content-container').innerHTML = content;
        
        // Load section-specific CSS if exists
        await loadSectionCSS(sectionName);
        
        // Load section-specific JS if exists
        await loadSectionJS(sectionName);
        
        // Update current section
        currentSection = sectionName;
        
        // Initialize animations
        setTimeout(() => {
            initializeAnimations();
        }, 100);
        
    } catch (error) {
        console.error('Error loading section:', error);
        document.getElementById('content-container').innerHTML = `
            <div style="text-align: center; padding: 50px;">
                <h2>Error Loading Content</h2>
                <p>Sorry, there was an error loading the ${sectionName} section.</p>
                <button onclick="loadSection('${sectionName}')" style="margin-top: 20px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Try Again
                </button>
            </div>
        `;
    }
}

// Update navigation active state
function updateNavigation(sectionName) {
    // Remove active class from all tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Add active class to current tab
    document.querySelector(`.nav-tab[data-section="${sectionName}"]`).classList.add('active');
}

// Show loading animation
function showLoading() {
    document.getElementById('content-container').innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            Loading ${currentSection}...
        </div>
    `;
}

// Load section-specific CSS
function loadSectionCSS(sectionName) {
    return new Promise((resolve) => {
        // Remove existing section CSS
        const existingCSS = document.getElementById('section-css');
        if (existingCSS) {
            existingCSS.remove();
        }
        
        // Load new section CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `sections/${sectionName}.css`;
        link.id = 'section-css';
        link.onload = () => resolve();
        link.onerror = () => {
            console.log(`No CSS file found for ${sectionName} section`);
            resolve();
        };
        document.head.appendChild(link);
    });
}

// Load section-specific JavaScript
function loadSectionJS(sectionName) {
    return new Promise((resolve) => {
        // Remove existing section JS
        const existingJS = document.getElementById('section-js');
        if (existingJS) {
            existingJS.remove();
        }
        
        // Load new section JS
        const script = document.createElement('script');
        script.src = `sections/${sectionName}.js`;
        script.id = 'section-js';
        script.onload = () => resolve();
        script.onerror = () => {
            console.log(`No JS file found for ${sectionName} section`);
            resolve();
        };
        document.body.appendChild(script);
    });
}

// Initialize animations
function initializeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Photo upload functionality
function initializePhotoUpload() {
    const photoUpload = document.getElementById('photoUpload');
    photoUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                showNotification('File size should be less than 5MB', 'error');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageUrl = e.target.result;
                document.getElementById('profilePhoto').src = imageUrl;
                localStorage.setItem('profilePhoto', imageUrl);
                showNotification('Profile photo updated successfully!');
            };
            reader.readAsDataURL(file);
        }
    });
}

function uploadPhoto() {
    document.getElementById('photoUpload').click();
}

// Load saved profile photo
function loadSavedProfilePhoto() {
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
        document.getElementById('profilePhoto').src = savedPhoto;
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.background = type === 'error' ? '#f44336' : '#4CAF50';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Utility function to format dates
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
}

// Export functions for use in section files
window.portfolioUtils = {
    showNotification,
    formatDate,
    loadSection
};
