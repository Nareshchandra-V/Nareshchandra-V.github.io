// Projects functionality
let projects = [];

// Project filtering
function initializeProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterProjects(filter);
        });
    });
}

function filterProjects(filter) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        if (filter === 'all') {
            card.style.display = 'block';
            card.classList.add('show');
        } else {
            const categories = card.getAttribute('data-category');
            if (categories && categories.includes(filter)) {
                card.style.display = 'block';
                card.classList.add('show');
            } else {
                card.style.display = 'none';
                card.classList.remove('show');
            }
        }
    });
}

// Project modal functions
function viewProject(projectId) {
    const projectDetails = getProjectDetails(projectId);
    document.getElementById('projectDetails').innerHTML = projectDetails;
    document.getElementById('projectModal').style.display = 'block';
}

function openDemo(projectId) {
    window.portfolioUtils.showNotification(`Opening demo for ${projectId}...`);
    // Here you would open the actual demo link
    // window.open('demo-url', '_blank');
}

function closeProjectModal() {
    document.getElementById('projectModal').style.display = 'none';
}

function getProjectDetails(projectId) {
    const details = {
        'sales-dashboard': `
            <h2>🏆 Sales Performance Analytics Dashboard</h2>
            <img src="https://via.placeholder.com/600x300/667eea/ffffff?text=Sales+Dashboard+Detail" alt="Sales Dashboard" style="width: 100%; border-radius: 10px; margin: 20px 0;">
            <h3>Project Overview</h3>
            <p>This comprehensive sales analytics solution was developed for Sresta Natural Bioproducts to address their need for real-time sales tracking without investing in expensive server infrastructure.</p>
            
            <h3>Technical Implementation</h3>
            <ul>
                <li><strong>Data Architecture:</strong> Google Sheets as the primary data source with automated data collection</li>
                <li><strong>ETL Process:</strong> Power Query for data transformation and cleaning</li>
                <li><strong>Visualization:</strong> Power BI with interactive dashboards and drill-down capabilities</li>
                <li><strong>Automation:</strong> Scheduled data refresh every 15 minutes</li>
            </ul>
            
            <h3>Key Features</h3>
            <ul>
                <li>Real-time sales tracking across multiple regions</li>
                <li>SKU-level performance analysis</li>
                <li>Geographic sales distribution mapping</li>
                <li>Target vs Actual performance monitoring</li>
                <li>Mobile-responsive dashboard design</li>
            </ul>
            
            <h3>Business Impact</h3>
            <ul>
                <li>40% reduction in reporting time</li>
                <li>Enhanced decision-making with real-time insights</li>
                <li>Improved sales team performance tracking</li>
                <li>Cost-effective solution without server infrastructure</li>
            </ul>
        `,
        'market-intelligence': `
            <h2>📊 Market Intelligence & Competitive Analysis</h2>
            <img src="https://via.placeholder.com/600x300/764ba2/ffffff?text=Market+Intelligence+Detail" alt="Market Intelligence" style="width: 100%; border-radius: 10px; margin: 20px 0;">
            <h3>Project Overview</h3>
            <p>Developed a sophisticated market intelligence system to transform cluttered external market data into actionable competitive insights.</p>
            
            <h3>Data Sources Integrated</h3>
            <ul>
                <li><strong>Competitor Pricing:</strong> Real-time price monitoring across 50+ competitors</li>
                <li><strong>Share of Voice (SOV):</strong> Brand mention tracking across digital platforms</li>
                <li><strong>On-Shelf Availability (OSA):</strong> Product availability monitoring</li>
                <li><strong>Sales Data:</strong> Market performance metrics</li>
            </ul>
            
            <h3>ETL Pipeline</h3>
            <ul>
                <li>Data ingestion from multiple external APIs</li>
                <li>Automated data cleaning and standardization</li>
                <li>Real-time data validation and quality checks</li>
                <li>Structured data warehouse creation</li>
            </ul>
            
            <h3>Competitive Insights Delivered</h3>
            <ul>
                <li>Market share analysis by category and region</li>
                <li>Competitor pricing trends and strategies</li>
                <li>Brand performance benchmarking</li>
                <li>Market opportunity identification</li>
            </ul>
        `
    };
    
    return details[projectId] || '<p>Project details not available.</p>';
}

// Add new project functionality
function openProjectEditor() {
    document.getElementById('addProjectModal').style.display = 'block';
}

function closeProjectEditor() {
    document.getElementById('addProjectModal').style.display = 'none';
    document.getElementById('projectForm').reset();
}

// Handle project form submission
document.addEventListener('DOMContentLoaded', function() {
    initializeProjectFilters();
    
    const projectForm = document.getElementById('projectForm');
    if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewProject();
        });
    }
});

function addNewProject() {
    const title = document.getElementById('projectTitle').value;
    const challenge = document.getElementById('projectChallenge').value;
    const solution = document.getElementById('projectSolution').value;
    const impact = document.getElementById('projectImpact').value;
    const tech = document.getElementById('projectTech').value;
    const image = document.getElementById('projectImage').value || 'https://via.placeholder.com/400x250/667eea/ffffff?text=New+Project';
    
    const newProject = createProjectCard({
        title,
        challenge,
        solution,
        impact,
        tech: tech.split(',').map(t => t.trim()),
        image,
        type: 'Custom Project'
    });
    
    // Add to projects grid
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.insertBefore(newProject, projectsGrid.firstChild);
    
    // Save to localStorage
    saveProject({ title, challenge, solution, impact, tech, image });
    
    // Close modal
    closeProjectEditor();
    
    // Show success message
    window.portfolioUtils.showNotification('Project added successfully!');
}

function createProjectCard(project) {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'project-card fade-in visible';
    projectDiv.setAttribute('data-category', 'custom');
    
    projectDiv.innerHTML = `
        <div class="project-header">
            <h3>${project.title}</h3>
            <div class="project-type">${project.type}</div>
        </div>
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="project-content">
            <p><strong>Challenge:</strong> ${project.challenge}</p>
            <p><strong>Solution:</strong> ${project.solution}</p>
            <p><strong>Impact:</strong> ${project.impact}</p>
        </div>
        <div class="tech-stack">
            ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <div class="project-actions">
            <button class="btn-primary" onclick="viewCustomProject('${project.title}')">View Details</button>
            <button class="btn-secondary" onclick="editProject('${project.title}')">Edit Project</button>
        </div>
    `;
    
    return projectDiv;
}

function saveProject(project) {
    let savedProjects = JSON.parse(localStorage.getItem('customProjects') || '[]');
    savedProjects.unshift({
        ...project,
        id: Date.now(),
        dateAdded: new Date().toISOString()
    });
    localStorage.setItem('customProjects', JSON.stringify(savedProjects));
}

function loadCustomProjects() {
    const savedProjects = JSON.parse(localStorage.getItem('customProjects') || '[]');
    const projectsGrid = document.querySelector('.projects-grid');
    
    savedProjects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

// Close modal when clicking outside
window.onclick = function(event) {
    const projectModal = document.getElementById('projectModal');
    const addProjectModal = document.getElementById('addProjectModal');
    
    if (event.target === projectModal) {
        closeProjectModal();
    }
    if (event.target === addProjectModal) {
        closeProjectEditor();
    }
}

// Load custom projects when page loads
setTimeout(() => {
    loadCustomProjects();
}, 100);
