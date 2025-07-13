// Skills functionality
document.addEventListener('DOMContentLoaded', function() {
    animateSkillBars();
    initializeSkillForm();
});

// Animate skill bars when they come into view
function animateSkillBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.getAttribute('data-width');
                progressBar.style.width = targetWidth;
                progressBar.classList.add('animate');
            }
        });
    }, {
        threshold: 0.5
    });

    document.querySelectorAll('.skill-progress').forEach(bar => {
        observer.observe(bar);
    });
}

// Initialize skill form
function initializeSkillForm() {
    const skillForm = document.getElementById('skillForm');
    if (skillForm) {
        skillForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewSkill();
        });
    }
}

// Add new skill functionality
function openSkillEditor() {
    document.getElementById('addSkillModal').style.display = 'block';
}

function closeSkillEditor() {
    document.getElementById('addSkillModal').style.display = 'none';
    document.getElementById('skillForm').reset();
}

function addNewSkill() {
    const category = document.getElementById('skillCategory').value;
    const name = document.getElementById('skillName').value;
    const level = document.getElementById('skillLevel').value;
    const description = document.getElementById('skillDescription').value;
    
    if (!category || !name || !level || !description) {
        window.portfolioUtils.showNotification('Please fill all fields', 'error');
        return;
    }
    
    // Create new skill item
    const skillItem = createSkillItem(name, level, description);
    
    // Find the appropriate category
    const categoryElement = findSkillCategory(category);
    if (categoryElement) {
        categoryElement.appendChild(skillItem);
        
        // Save to localStorage
        saveSkill({ category, name, level, description });
        
        // Animate the new skill bar
        setTimeout(() => {
            animateSkillBars();
        }, 100);
        
        // Close modal
        closeSkillEditor();
        
        // Show success message
        window.portfolioUtils.showNotification('Skill added successfully!');
    }
}

function createSkillItem(name, level, description) {
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';
    skillItem.innerHTML = `
        <div class="skill-info">
            <span class="skill-name">${name}</span>
            <span class="skill-percentage">${level}%</span>
        </div>
        <div class="skill-bar">
            <div class="skill-progress" data-width="${level}%"></div>
        </div>
        <div class="skill-description">
            ${description}
        </div>
    `;
    return skillItem;
}

function findSkillCategory(categoryId) {
    const categoryMap = {
        'business-intelligence': 0,
        'data-management': 1,
        'programming': 2,
        'business': 3
    };
    
    const categories = document.querySelectorAll('.skill-category');
    return categories[categoryMap[categoryId]];
}

function saveSkill(skill) {
    let savedSkills = JSON.parse(localStorage.getItem('customSkills') || '[]');
    savedSkills.push({
        ...skill,
        id: Date.now(),
        dateAdded: new Date().toISOString()
    });
    localStorage.setItem('customSkills', JSON.stringify(savedSkills));
}

// Load saved skills
function loadCustomSkills() {
    const savedSkills = JSON.parse(localStorage.getItem('customSkills') || '[]');
    
    savedSkills.forEach(skill => {
        const skillItem = createSkillItem(skill.name, skill.level, skill.description);
        const categoryElement = findSkillCategory(skill.category);
        if (categoryElement) {
            categoryElement.appendChild(skillItem);
        }
    });
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('addSkillModal');
    if (event.target === modal) {
        closeSkillEditor();
    }
}

// Load custom skills when page loads
setTimeout(() => {
    loadCustomSkills();
}, 100);
