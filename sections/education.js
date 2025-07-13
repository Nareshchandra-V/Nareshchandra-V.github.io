// Education functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeEducationForm();
    loadCustomEducation();
});

// Initialize education form
function initializeEducationForm() {
    const educationForm = document.getElementById('educationForm');
    if (educationForm) {
        educationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewEducation();
        });
    }
}

// Education editor functions
function openEducationEditor() {
    document.getElementById('addEducationModal').style.display = 'block';
}

function closeEducationEditor() {
    document.getElementById('addEducationModal').style.display = 'none';
    document.getElementById('educationForm').reset();
}

// Add new education entry
function addNewEducation() {
    const type = document.getElementById('educationType').value;
    const title = document.getElementById('educationTitle').value;
    const institution = document.getElementById('educationInstitution').value;
    const year = document.getElementById('educationYear').value;
    const description = document.getElementById('educationDescription').value;
    const skills = document.getElementById('educationSkills').value;
    
    if (!type || !title || !institution || !year || !description) {
        window.portfolioUtils.showNotification('Please fill all required fields', 'error');
        return;
    }
    
    const educationEntry = {
        type,
        title,
        institution,
        year,
        description,
        skills: skills ? skills.split(',').map(s => s.trim()) : [],
        id: Date.now(),
        dateAdded: new Date().toISOString()
    };
    
    // Create and add the education element
    const educationElement = createEducationElement(educationEntry);
    
    if (type === 'certification') {
        // Add to certifications grid
        const certificationsGrid = document.querySelector('.certifications-grid');
        certificationsGrid.appendChild(educationElement);
    } else {
        // Add to education timeline
        const educationTimeline = document.querySelector('.education-timeline');
        educationTimeline.appendChild(educationElement);
    }
    
    // Save to localStorage
    saveEducation(educationEntry);
    
    // Close modal
    closeEducationEditor();
    
    // Show success message
    window.portfolioUtils.showNotification('Education entry added successfully!');
}

// Create education element based on type
function createEducationElement(education) {
    if (education.type === 'certification') {
        return createCertificationCard(education);
    } else {
        return createEducationTimelineItem(education);
    }
}

// Create certification card
function createCertificationCard(cert) {
    const certDiv = document.createElement('div');
    certDiv.className = 'cert-card completed';
    certDiv.innerHTML = `
        <div class="cert-header">
            <div class="cert-icon analytics">
                <i class="fas fa-certificate"></i>
            </div>
            <div class="cert-status-badge completed">Custom</div>
        </div>
        <div class="cert-content">
            <h4>${cert.title}</h4>
            <p>${cert.description}</p>
            <div class="cert-skills">
                ${cert.skills.map(skill => `<span>${skill}</span>`).join('')}
            </div>
        </div>
        <div class="cert-footer">
            <span class="cert-date">${cert.year}</span>
            <button class="view-cert-btn" onclick="editEducation('${cert.id}')">Edit</button>
        </div>
    `;
    return certDiv;
}

// Create education timeline item
function createEducationTimelineItem(education) {
    const educationDiv = document.createElement('div');
    educationDiv.className = 'education-item';
    educationDiv.innerHTML = `
        <div class="education-dot"></div>
        <div class="education-content">
            <div class="education-header">
                <div class="education-info">
                    <h4>${education.title}</h4>
                    <h5>${education.institution}</h5>
                </div>
                <div class="education-period">
                    <span class="period-badge">${education.year}</span>
                    <button class="edit-btn" onclick="editEducation('${education.id}')" style="margin-top: 5px; padding: 5px 10px; font-size: 0.8rem;">Edit</button>
                </div>
            </div>
            <div class="education-description">
                <p>${education.description}</p>
            </div>
            ${education.skills.length > 0 ? `
                <div class="key-subjects">
                    <h6>Key Skills/Subjects</h6>
                    <div class="subjects-grid">
                        ${education.skills.map(skill => `<span class="subject-tag">${skill}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
    return educationDiv;
}

// Save education to localStorage
function saveEducation(education) {
    let savedEducation = JSON.parse(localStorage.getItem('customEducation') || '[]');
    savedEducation.push(education);
    localStorage.setItem('customEducation', JSON.stringify(savedEducation));
}

// Load custom education entries
function loadCustomEducation() {
    const savedEducation = JSON.parse(localStorage.getItem('customEducation') || '[]');
    
    savedEducation.forEach(education => {
        const educationElement = createEducationElement(education);
        
        if (education.type === 'certification') {
            const certificationsGrid = document.querySelector('.certifications-grid');
            if (certificationsGrid) {
                certificationsGrid.appendChild(educationElement);
            }
        } else {
            const educationTimeline = document.querySelector('.education-timeline');
            if (educationTimeline) {
                educationTimeline.appendChild(educationElement);
            }
        }
    });
}

// Edit education entry
function editEducation(id) {
    const savedEducation = JSON.parse(localStorage.getItem('customEducation') || '[]');
    const education = savedEducation.find(item => item.id == id);
    
    if (education) {
        // Populate form with existing data
        document.getElementById('educationType').value = education.type;
        document.getElementById('educationTitle').value = education.title;
        document.getElementById('educationInstitution').value = education.institution;
        document.getElementById('educationYear').value = education.year;
        document.getElementById('educationDescription').value = education.description;
        document.getElementById('educationSkills').value = education.skills.join(', ');
        
        // Store current editing ID
        document.getElementById('educationForm').setAttribute('data-editing-id', id);
        
        // Open modal
        openEducationEditor();
    }
}

// Update education entry
function updateEducation(id, updatedData) {
    let savedEducation = JSON.parse(localStorage.getItem('customEducation') || '[]');
    const index = savedEducation.findIndex(item => item.id == id);
    
    if (index !== -1) {
        savedEducation[index] = { ...savedEducation[index], ...updatedData };
        localStorage.setItem('customEducation', JSON.stringify(savedEducation));
        
        // Reload the page to show updated content
        setTimeout(() => {
            window.portfolioUtils.loadSection('education');
        }, 500);
    }
}

// Handle view certificate button clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('view-cert-btn') && e.target.textContent !== 'Edit') {
        const certCard = e.target.closest('.cert-card');
        const certTitle = certCard.querySelector('h4').textContent;
        window.portfolioUtils.showNotification(`Opening ${certTitle} details...`);
    }
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('addEducationModal');
    if (event.target === modal) {
        closeEducationEditor();
    }
}

// Animation for new entries
function animateNewEntry(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        element.style.transition = 'all 0.5s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 100);
}
