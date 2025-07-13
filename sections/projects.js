// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addProjectForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewProject();
        });
    }
    loadCustomProjects();
});

// Show project details
function showProjectDetails(projectId) {
    const content = getProjectContent(projectId);
    document.getElementById('modalContent').innerHTML = content;
    document.getElementById('projectModal').style.display = 'block';
}

// Close main modal
function closeModal() {
    document.getElementById('projectModal').style.display = 'none';
}

// Open add project modal
function openAddProjectModal() {
    document.getElementById('addProjectModal').style.display = 'block';
}

// Close add project modal
function closeAddProjectModal() {
    document.getElementById('addProjectModal').style.display = 'none';
    document.getElementById('addProjectForm').reset();
}

// Add new project
function addNewProject() {
    const title = document.getElementById('projectTitle').value;
    const description = document.getElementById('projectDescription').value;
    const tech = document.getElementById('projectTech').value;
    const icon = document.getElementById('projectIcon').value;
    
    if (!title || !description || !tech) {
        alert('Please fill all fields');
        return;
    }
    
    // Create new project card
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card fade-in';
    projectCard.innerHTML = `
        <div class="project-icon automation">
            <i class="${icon}"></i>
        </div>
        <h3>${title}</h3>
        <p>${description}</p>
        <div class="tech-tags">
            ${tech.split(',').map(t => `<span>${t.trim()}</span>`).join('')}
        </div>
        <button class="view-details-btn" onclick="showCustomProject('${title}')">View Details</button>
    `;
    
    // Add to grid
    document.querySelector('.projects-grid').appendChild(projectCard);
    
    // Save to localStorage
    saveCustomProject({ title, description, tech, icon });
    
    closeAddProjectModal();
    alert('Project added successfully!');
}

// Save custom project
function saveCustomProject(project) {
    let projects = JSON.parse(localStorage.getItem('customProjects') || '[]');
    projects.push({ ...project, id: Date.now() });
    localStorage.setItem('customProjects', JSON.stringify(projects));
}

// Show custom project details
function showCustomProject(title) {
    const content = `
        <div class="modal-header">
            <h2>${title}</h2>
            <p>Custom Project Implementation</p>
        </div>
        <div class="modal-body">
            <div class="objective-section">
                <h3>🎯 Project Overview</h3>
                <p>This is a custom project that has been added to the portfolio. It represents additional work and expertise in the specified technology stack.</p>
            </div>
            <div class="impact-section">
                <h3>💼 Custom Implementation</h3>
                <p>This project demonstrates additional capabilities and experience beyond the core portfolio projects, showcasing versatility and continuous learning in emerging technologies.</p>
            </div>
        </div>
    `;
    document.getElementById('modalContent').innerHTML = content;
    document.getElementById('projectModal').style.display = 'block';
}

// Load custom projects
function loadCustomProjects() {
    const projects = JSON.parse(localStorage.getItem('customProjects') || '[]');
    const grid = document.querySelector('.projects-grid');
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card fade-in';
        projectCard.innerHTML = `
            <div class="project-icon automation">
                <i class="${project.icon}"></i>
            </div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tech-tags">
                ${project.tech.split(',').map(t => `<span>${t.trim()}</span>`).join('')}
            </div>
            <button class="view-details-btn" onclick="showCustomProject('${project.title}')">View Details</button>
        `;
        grid.appendChild(projectCard);
    });
}

// Get project content - ALL PROJECTS INCLUDED
function getProjectContent(projectId) {
    const projects = {
        'sales-analytics': {
            title: 'Sales Performance Analytics Dashboard',
            subtitle: 'Real-time Sales Tracking & Target Analysis System',
            objective: 'Create a comprehensive sales analytics solution providing real-time visibility into sales performance across different geographies, products, and time periods.',
            painPoints: [
                'Manual sales reporting taking 2+ days per week',
                'Lack of real-time visibility into sales performance',
                'Difficulty in tracking target vs actual performance',
                'No geographic or SKU-wise performance insights',
                'Delayed decision-making due to outdated reports'
            ],
            solutions: [
                'Developed interactive Power BI dashboards with real-time data refresh',
                'Implemented DAX calculations for complex metrics and KPIs',
                'Created automated ETL processes using Power Query',
                'Built geographic visualization with drill-down capabilities',
                'Established data gateway for automated data refresh'
            ],
            processSteps: [
                'Requirement gathering and stakeholder interviews',
                'Data source identification and mapping',
                'Dashboard design and wireframing',
                'Development and testing',
                'User training and deployment'
            ],
            metrics: [
                { value: '75%', label: 'Time Saved' },
                { value: 'Real-time', label: 'Report Generation' },
                { value: '3x Faster', label: 'Decision Speed' },
                { value: '99.9%', label: 'Data Accuracy' }
            ],
            technologies: ['Power BI', 'DAX', 'Power Query', 'SQL Server', 'Excel', 'Power BI Service'],
            impact: 'Transformed sales reporting from a 2-day manual process to real-time automated insights, enabling faster strategic decisions and improving sales team productivity by 40%.'
        },
        'ecommerce-platform': {
            title: 'E-commerce Intelligence Platform',
            subtitle: 'Advanced Analytics for Multi-Platform Operations',
            objective: 'Build unified analytics platform for Blinkit, Swiggy, and Zepto with comprehensive market analysis and performance tracking.',
            painPoints: [
                'Scattered data across multiple e-commerce platforms',
                'No unified view of market performance',
                'Manual effort for market share analysis',
                'Delayed insights affecting strategic decisions',
                'Inconsistent KPI tracking across platforms'
            ],
            solutions: [
                'Integrated data from'Integrated data from Blinkit, Swiggy, and Zepto platforms',
               'Built unified market share analysis dashboard',
               'Implemented demand forecasting algorithms',
               'Created automated PO tracking system',
               'Developed competitor analysis framework'
           ],
           processSteps: [
               'Platform API integration analysis',
               'Data mapping and standardization',
               'Unified dashboard architecture',
               'Forecasting model development',
               'Performance optimization and deployment'
           ],
           metrics: [
               { value: '3', label: 'Platforms Unified' },
               { value: '60%', label: 'Analysis Time Reduced' },
               { value: 'Real-time', label: 'Market Insights' },
               { value: '25%', label: 'Revenue Growth' }
           ],
           technologies: ['Power BI', 'Python', 'Power Query', 'APIs', 'Forecasting Models'],
           impact: 'Unified e-commerce operations across three major platforms, providing comprehensive market intelligence and enabling data-driven expansion strategies.'
       },
       'inventory-system': {
           title: 'Inventory Management System',
           subtitle: 'Smart Inventory Optimization & Predictive Analytics',
           objective: 'Develop intelligent inventory management system to reduce stockouts and overstock situations through predictive analytics.',
           painPoints: [
               'High stockout rates affecting customer satisfaction',
               'Overstock situations leading to increased costs',
               'Manual inventory planning processes',
               'Lack of demand forecasting capabilities',
               'Poor fill rate performance across categories'
           ],
           solutions: [
               'Implemented predictive analytics for demand forecasting',
               'Created automated reorder point calculations',
               'Built real-time inventory monitoring dashboards',
               'Developed safety stock optimization algorithms',
               'Integrated supplier lead time considerations'
           ],
           processSteps: [
               'Historical data analysis and pattern identification',
               'Predictive model development and testing',
               'Dashboard creation and visualization',
               'Automated alert system implementation',
               'User training and system deployment'
           ],
           metrics: [
               { value: '85%', label: 'Stockout Reduction' },
               { value: '30%', label: 'Inventory Cost Savings' },
               { value: '95%', label: 'Fill Rate Achievement' },
               { value: 'Real-time', label: 'Inventory Visibility' }
           ],
           technologies: ['Power BI', 'DAX', 'Predictive Analytics', 'ETL', 'Statistical Models'],
           impact: 'Transformed inventory management from reactive to predictive approach, significantly reducing stockouts while optimizing inventory costs and improving customer satisfaction.'
       },
       'financial-suite': {
           title: 'Financial Reporting Suite',
           subtitle: 'Automated Financial Tracking & Collections Management',
           objective: 'Create comprehensive financial reporting and collections tracking system to improve cash flow management and financial visibility.',
           painPoints: [
               'Manual financial report generation taking hours',
               'Delayed collections tracking and follow-up',
               'Inconsistent financial data across departments',
               'Poor visibility into outstanding receivables',
               'Time-consuming reconciliation processes'
           ],
           solutions: [
               'Built automated financial reporting dashboards',
               'Implemented real-time collections tracking',
               'Created outstanding receivables monitoring',
               'Developed automated reconciliation processes',
               'Established financial KPI monitoring system'
           ],
           processSteps: [
               'Financial data source mapping and integration',
               'Automated workflow design and development',
               'Dashboard creation for financial metrics',
               'Alert system implementation for overdue accounts',
               'Training and change management'
           ],
           metrics: [
               { value: '80%', label: 'Time Reduction' },
               { value: '95%', label: 'Accuracy Improvement' },
               { value: '40%', label: 'Faster Collections' },
               { value: 'Daily', label: 'Report Frequency' }
           ],
           technologies: ['Power BI', 'Financial Modeling', 'Google Sheets', 'Automation', 'Excel VBA'],
           impact: 'Revolutionized financial operations by automating manual processes, improving cash flow management, and providing real-time financial visibility to stakeholders.'
       },
       'marketing-tracker': {
           title: 'Marketing ROI Tracker',
           subtitle: 'Integrated Campaign Performance & ROI Analytics',
           objective: 'Develop comprehensive marketing analytics platform to track campaign performance, optimize spending, and maximize ROI across all channels.',
           painPoints: [
               'Scattered marketing data across multiple platforms',
               'Difficulty in calculating true campaign ROI',
               'Manual effort for performance analysis',
               'Lack of real-time campaign insights',
               'Poor visibility into keyword effectiveness'
           ],
           solutions: [
               'Integrated multi-platform marketing data sources',
               'Built automated ROI calculation framework',
               'Created real-time campaign performance dashboards',
               'Implemented keyword effectiveness tracking',
               'Developed spend optimization recommendations'
           ],
           processSteps: [
               'Marketing platform data integration',
               'ROI calculation methodology development',
               'Performance dashboard design and build',
               'Automated reporting system creation',
               'Optimization algorithm implementation'
           ],
           metrics: [
               { value: '45%', label: 'ROI Improvement' },
               { value: '60%', label: 'Analysis Time Reduction' },
               { value: '15+', label: 'Campaigns Optimized' },
               { value: 'Real-time', label: 'Performance Tracking' }
           ],
           technologies: ['Power BI', 'Marketing Analytics', 'ROI Analysis', 'Campaign Tracking', 'Google Analytics API'],
           impact: 'Transformed marketing operations by providing comprehensive ROI visibility, enabling data-driven campaign optimization, and significantly improving marketing effectiveness.'
       },
       'process-automation': {
           title: 'Business Process Automation',
           subtitle: 'Intelligent Workflow Automation & Integration',
           objective: 'Design and implement comprehensive automation framework to reduce manual processes and improve operational efficiency.',
           painPoints: [
               'High volume of manual, repetitive tasks',
               'Inconsistent process execution across teams',
               'Time-consuming data entry and processing',
               'Lack of process standardization',
               'Poor visibility into process bottlenecks'
           ],
           solutions: [
               'Implemented intelligent workflow automation',
               'Created standardized process templates',
               'Built automated data integration pipelines',
               'Developed process monitoring dashboards',
               'Established exception handling mechanisms'
           ],
           processSteps: [
               'Process mapping and analysis',
               'Automation opportunity identification',
               'Workflow design and development',
               'Integration testing and validation',
               'Deployment and monitoring setup'
           ],
           metrics: [
               { value: '65%', label: 'Process Automation' },
               { value: '50%', label: 'Time Savings' },
               { value: '90%', label: 'Accuracy Improvement' },
               { value: '24/7', label: 'Process Monitoring' }
           ],
           technologies: ['Process Automation', 'Google Sheets', 'Power BI', 'Integration APIs', 'Workflow Engines'],
           impact: 'Achieved significant operational efficiency gains by automating 65% of manual processes, reducing errors, and enabling teams to focus on strategic initiatives rather than routine tasks.'
       }
   };

   const project = projects[projectId];
   if (!project) return '<p>Project details not found.</p>';

   return `
       <div class="modal-header">
           <h2>${project.title}</h2>
           <p>${project.subtitle}</p>
       </div>
       <div class="modal-body">
           <div class="objective-section">
               <h3>🎯 Project Objective</h3>
               <p>${project.objective}</p>
           </div>

           <div class="two-column">
               <div class="pain-points">
                   <h4>⚠️ Pain Points</h4>
                   <ul class="point-list">
                       ${project.painPoints.map(point => `<li>${point}</li>`).join('')}
                   </ul>
               </div>
               <div class="solutions">
                   <h4>✅ Solutions Implemented</h4>
                   <ul class="point-list">
                       ${project.solutions.map(solution => `<li>${solution}</li>`).join('')}
                   </ul>
               </div>
           </div>

           <div class="process-section">
               <h3>🔄 Implementation Process</h3>
               <div class="process-steps">
                   ${project.processSteps.map((step, index) => `
                       <div class="process-step">
                           <div class="step-number">${index + 1}</div>
                           <h5>${step}</h5>
                       </div>
                   `).join('')}
               </div>
           </div>

           <div class="metrics-section">
               <h3>📊 Key Outcomes & Metrics</h3>
               <div class="metrics-grid">
                   ${project.metrics.map(metric => `
                       <div class="metric-card">
                           <div class="metric-value">${metric.value}</div>
                           <div class="metric-label">${metric.label}</div>
                       </div>
                   `).join('')}
               </div>
           </div>

           <div class="tech-section">
               <h3>🛠️ Technologies Used</h3>
               <div class="tech-list">
                   ${project.technologies.map(tech => `<span class="tech-item">${tech}</span>`).join('')}
               </div>
           </div>

           <div class="impact-section">
               <h3>💼 Business Impact</h3>
               <p>${project.impact}</p>
           </div>
       </div>
   `;
}

// Close modals when clicking outside
window.onclick = function(event) {
   const projectModal = document.getElementById('projectModal');
   const addModal = document.getElementById('addProjectModal');
   
   if (event.target === projectModal) {
       closeModal();
   }
   if (event.target === addModal) {
       closeAddProjectModal();
   }
}
