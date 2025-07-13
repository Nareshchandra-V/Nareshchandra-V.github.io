// Projects functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeProjectFilters();
    initializeProjectForm();
});

// Project filtering
function initializeProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
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
        } else {
            const categories = card.getAttribute('data-category');
            if (categories && categories.includes(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// Project detail functions
function showProjectDetails(projectId) {
    const projectDetails = getProjectDetails(projectId);
    document.getElementById('projectDetailContent').innerHTML = projectDetails;
    document.getElementById('projectDetailModal').style.display = 'block';
}

function closeProjectDetail() {
    document.getElementById('projectDetailModal').style.display = 'none';
}

function getProjectDetails(projectId) {
    const details = {
        'sales-dashboard': `
            <div class="project-detail-header">
                <h2>🏆 Sales Performance Analytics Dashboard</h2>
                <img src="https://via.placeholder.com/600x300/667eea/ffffff?text=Sales+Dashboard+Detail" alt="Sales Dashboard" class="project-detail-image">
            </div>
            
            <div class="detail-section">
                <h3><i class="fas fa-exclamation-triangle"></i> Problem Statement</h3>
                <ul>
                    <li>Sresta Natural Bioproducts needed comprehensive sales tracking across multiple regions and product lines</li>
                    <li>No dedicated server infrastructure available for traditional BI solutions</li>
                    <li>Manual reporting processes consuming 60% of team's time weekly</li>
                    <li>Inconsistent data across different teams and departments</li>
                    <li>Delayed decision-making due to lack of real-time insights</li>
                </ul>
            </div>

            <div class="detail-section">
                <h3><i class="fas fa-lightbulb"></i> Solution Approach</h3>
                <ul>
                    <li>Designed innovative Google Sheets-based data architecture as cost-effective alternative to servers</li>
                    <li>Created automated data collection workflows using Google Sheets APIs</li>
                    <li>Built Power BI dashboards with direct Google Sheets integration</li>
                    <li>Implemented real-time data refresh mechanisms every 15 minutes</li>
                    <li>Established data validation rules and quality checks</li>
                    <li>Created role-based access controls for different stakeholders</li>
                </ul>
            </div>

            <div class="detail-section">
                <h3><i class="fas fa-trophy"></i> Business Outcomes</h3>
                <ul>
                    <li><strong>40% reduction</strong> in manual reporting time - from 8 hours to 3 hours per week</li>
                    <li><strong>100% real-time</strong> visibility into sales performance across all regions</li>
                    <li><strong>50+ KPIs</strong> now tracked automatically with interactive drill-down capabilities</li>
                    <li><strong>Enhanced decision-making</strong> with geography and SKU-level insights</li>
                    <li><strong>Cost savings</strong> of ₹5+ lakhs annually by avoiding server infrastructure</li>
                    <li><strong>Improved accuracy</strong> by eliminating manual data entry errors</li>
                </ul>
            </div>

            <div class="detail-section">
                <h3><i class="fas fa-cogs"></i> Technical Implementation</h3>
                <div class="tech-detail-grid">
                    <div class="tech-detail-item">
                        <h4>Data Source</h4>
                        <p>Google Sheets with advanced formulas and automation scripts</p>
                    </div>
                    <div class="tech-detail-item">
                        <h4>ETL Process</h4>
                        <p>Power Query for data transformation and cleaning</p>
                    </div>
                    <div class="tech-detail-item">
                        <h4>Visualization</h4>
                        <p>Power BI with interactive dashboards and mobile-responsive design</p>
                    </div>
                    <div class="tech-detail-item">
                        <h4>Automation</h4>
                        <p>Scheduled refresh every 15 minutes with error handling</p>
                    </div>
                </div>
            </div>
        `,
        
        'market-intelligence': `
            <div class="project-detail-header">
                <h2>📊 Market Intelligence & Competitive Analysis System</h2>
                <img src="https://via.placeholder.com/600x300/764ba2/ffffff?text=Market+Intelligence+Detail" alt="Market Intelligence" class="project-detail-image">
            </div>
            
            <div class="detail-section">
                <h3><i class="fas fa-exclamation-triangle"></i> Problem Statement</h3>
                <ul>
                    <li>External market data from 5+ sources arriving in completely cluttered, inconsistent formats</li>
                    <li>Competitor pricing data scattered across different spreadsheets and formats</li>
                    <li>Share of Voice (SOV) and On-Shelf Availability (OSA) data requiring manual processing</li>
                    <li>No unified view of market performance and competitive positioning</li>
                    <li>Decision-making delayed by 2-3 days due to manual data processing</li>
                </ul>
            </div>

            <div class="detail-section">
                <h3><i class="fas fa-lightbulb"></i> Solution Approach</h3>
                <ul>
                    <li>Built comprehensive ETL pipeline to standardize data from multiple external sources</li>
                    <li>Created data mapping rules for consistent naming conventions across sources</li>
                    <li>Developed automated data validation and quality check processes</li>
                    <li>Designed unified market intelligence dashboard with competitive insights</li>
                    <li>Implemented real-time data integration using APIs where available</li>
                    <li>Created automated alerting system for significant market changes</li>
                </ul>
            </div>

            <div class="detail-section">
                <h3><i class="fas fa-trophy"></i> Business Outcomes</h3>
                <ul>
                    <li><strong>360° market view</strong> with unified competitive analysis dashboard</li>
                    <li><strong>40% time savings</strong> - from 2 days to 10 minutes for market analysis</li>
                    <li><strong>5+ data sources</strong> integrated into single source of truth</li>
                    <li><strong>Real-time insights</strong> enabling faster strategic decisions</li>
                    <li><strong>Improved market share tracking</strong> with automated competitor analysis</li>
                    <li><strong>Enhanced pricing strategy</strong> based on real-time competitor data</li>
                </ul>
            </div>

            <div class="detail-section">
                <h3><i class="fas fa-cogs"></i> Technical Implementation</h3>
                <div class="tech-detail-grid">
                    <div class="tech-detail-item">
                        <h4>Data Sources</h4>
                        <p>Competitor pricing, SOV, OSA, sales data from multiple external providers</p>
                    </div>
                    <div class="tech-detail-item">
                        <h4>ETL Pipeline</h4>
                        <p>Custom data cleaning and standardization processes</p>
                    </div>
                    <div class="tech-detail-item">
                        <h4>Analytics Engine</h4>
                        <p>Power BI with advanced DAX calculations for market insights</p>
                    </div>
                    <div class="tech-detail-item">
                        <h4>Integration</h4>
                        <p>Automated data refresh with error handling and notifications</p>
                    </div>
                </div>
            </div>
        `,
        'ecommerce-analytics': `
           <div class="project-detail-header">
               <h2>🛒 E-commerce Analytics Platform</h2>
               <img src="https://via.placeholder.com/600x300/e74c3c/ffffff?text=E-commerce+Analytics+Detail" alt="E-commerce Analytics" class="project-detail-image">
           </div>
           
           <div class="detail-section">
               <h3><i class="fas fa-exclamation-triangle"></i> Problem Statement</h3>
               <ul>
                   <li>Multiple e-commerce platforms (Blinkit, Swiggy, Zepto) operating in silos</li>
                   <li>No unified view of performance across different platforms</li>
                   <li>Manual effort required to compare market share and performance metrics</li>
                   <li>Difficulty in identifying best-performing platforms for expansion</li>
                   <li>Lack of real-time monitoring for platform-specific campaigns</li>
               </ul>
           </div>

           <div class="detail-section">
               <h3><i class="fas fa-lightbulb"></i> Solution Approach</h3>
               <ul>
                   <li>Built unified analytics platform integrating all three e-commerce platforms</li>
                   <li>Created standardized KPI framework for cross-platform comparison</li>
                   <li>Developed automated data collection from platform APIs</li>
                   <li>Implemented market share analysis with competitor benchmarking</li>
                   <li>Created real-time performance monitoring dashboards</li>
                   <li>Built predictive models for platform performance optimization</li>
               </ul>
           </div>

           <div class="detail-section">
               <h3><i class="fas fa-trophy"></i> Business Outcomes</h3>
               <ul>
                   <li><strong>3 platforms integrated</strong> into single comprehensive dashboard</li>
                   <li><strong>30% efficiency gain</strong> in platform performance analysis</li>
                   <li><strong>24/7 monitoring</strong> with automated alerts for performance issues</li>
                   <li><strong>Data-driven expansion</strong> decisions based on platform analytics</li>
                   <li><strong>Improved ROI</strong> through optimized platform resource allocation</li>
                   <li><strong>Enhanced market positioning</strong> with competitive intelligence</li>
               </ul>
           </div>

           <div class="detail-section">
               <h3><i class="fas fa-cogs"></i> Technical Implementation</h3>
               <div class="tech-detail-grid">
                   <div class="tech-detail-item">
                       <h4>Data Integration</h4>
                       <p>APIs from Blinkit, Swiggy, and Zepto platforms</p>
                   </div>
                   <div class="tech-detail-item">
                       <h4>Analytics Engine</h4>
                       <p>Power BI with custom DAX calculations for market analysis</p>
                   </div>
                   <div class="tech-detail-item">
                       <h4>Automation</h4>
                       <p>Scheduled data refresh with real-time monitoring</p>
                   </div>
                   <div class="tech-detail-item">
                       <h4>Visualization</h4>
                       <p>Interactive dashboards with drill-down capabilities</p>
                   </div>
               </div>
           </div>
       `,
       
       'inventory-optimization': `
           <div class="project-detail-header">
               <h2>📦 Inventory Optimization & Demand Forecasting</h2>
               <img src="https://via.placeholder.com/600x300/27ae60/ffffff?text=Inventory+Management+Detail" alt="Inventory Management" class="project-detail-image">
           </div>
           
           <div class="detail-section">
               <h3><i class="fas fa-exclamation-triangle"></i> Problem Statement</h3>
               <ul>
                   <li>High out-of-stock rates (25%) affecting customer satisfaction</li>
                   <li>Overstock issues leading to increased holding costs and wastage</li>
                   <li>Manual inventory planning consuming significant resources</li>
                   <li>Lack of predictive insights for demand forecasting</li>
                   <li>Poor fill rates impacting business profitability</li>
               </ul>
           </div>

           <div class="detail-section">
               <h3><i class="fas fa-lightbulb"></i> Solution Approach</h3>
               <ul>
                   <li>Developed predictive analytics system using historical sales data</li>
                   <li>Created demand forecasting models with seasonal adjustments</li>
                   <li>Built automated inventory optimization algorithms</li>
                   <li>Implemented real-time stock level monitoring with alerts</li>
                   <li>Created reorder point calculations based on lead times</li>
                   <li>Integrated Google Sheets for seamless data management</li>
               </ul>
           </div>

           <div class="detail-section">
               <h3><i class="fas fa-trophy"></i> Business Outcomes</h3>
               <ul>
                   <li><strong>25% reduction</strong> in overstock levels</li>
                   <li><strong>90% fill rate</strong> achievement across all product categories</li>
                   <li><strong>Real-time alerts</strong> for low stock and reorder points</li>
                   <li><strong>Improved cash flow</strong> through optimized inventory levels</li>
                   <li><strong>Enhanced customer satisfaction</strong> with better product availability</li>
                   <li><strong>Reduced wastage</strong> by 15% through better demand prediction</li>
               </ul>
           </div>

           <div class="detail-section">
               <h3><i class="fas fa-cogs"></i> Technical Implementation</h3>
               <div class="tech-detail-grid">
                   <div class="tech-detail-item">
                       <h4>Forecasting</h4>
                       <p>Time series analysis with seasonal decomposition</p>
                   </div>
                   <div class="tech-detail-item">
                       <h4>Data Source</h4>
                       <p>Google Sheets integration with sales and inventory data</p>
                   </div>
                   <div class="tech-detail-item">
                       <h4>Analytics</h4>
                       <p>Power BI with advanced DAX calculations for optimization</p>
                   </div>
                   <div class="tech-detail-item">
                       <h4>Alerts</h4>
                       <p>Automated notifications for stock levels and reorder points</p>
                   </div>
               </div>
           </div>
       `,
       
       'financial-analytics': `
           <div class="project-detail-header">
               <h2>💰 Financial Analytics & Collections Tracker</h2>
               <img src="https://via.placeholder.com/600x300/8e44ad/ffffff?text=Financial+Analytics+Detail" alt="Financial Analytics" class="project-detail-image">
           </div>
           
           <div class="detail-section">
               <h3><i class="fas fa-exclamation-triangle"></i> Problem Statement</h3>
               <ul>
                   <li>Manual tracking of collections consuming 8+ hours weekly</li>
                   <li>Outstanding payment analysis requiring complex manual calculations</li>
                   <li>Delayed financial reconciliation affecting cash flow decisions</li>
                   <li>No real-time visibility into payment statuses</li>
                   <li>Error-prone manual processes leading to reconciliation issues</li>
               </ul>
           </div>

           <div class="detail-section">
               <h3><i class="fas fa-lightbulb"></i> Solution Approach</h3>
               <ul>
                   <li>Built automated financial tracking system with real-time updates</li>
                   <li>Created collection monitoring dashboard with aging analysis</li>
                   <li>Implemented automated reconciliation processes</li>
                   <li>Developed payment status tracking with automated alerts</li>
                   <li>Created financial KPI dashboard for management reporting</li>
                   <li>Integrated with existing accounting systems via Google Sheets</li>
               </ul>
           </div>

           <div class="detail-section">
               <h3><i class="fas fa-trophy"></i> Business Outcomes</h3>
               <ul>
                   <li><strong>70% time savings</strong> in financial reconciliation processes</li>
                   <li><strong>100% accuracy</strong> in collections tracking and reporting</li>
                   <li><strong>Daily updates</strong> on payment statuses and outstanding amounts</li>
                   <li><strong>35% improvement</strong> in cash flow management</li>
                   <li><strong>Automated alerts</strong> for overdue payments and collection follow-ups</li>
                   <li><strong>Enhanced financial control</strong> with real-time visibility</li>
               </ul>
           </div>

           <div class="detail-section">
               <h3><i class="fas fa-cogs"></i> Technical Implementation</h3>
               <div class="tech-detail-grid">
                   <div class="tech-detail-item">
                       <h4>Financial Modeling</h4>
                       <p>Advanced Excel formulas and Power BI DAX calculations</p>
                   </div>
                   <div class="tech-detail-item">
                       <h4>Automation</h4>
                       <p>Google Sheets automation with scheduled updates</p>
                   </div>
                   <div class="tech-detail-item">
                       <h4>Visualization</h4>
                       <p>Power BI dashboards with financial KPIs and trends</p>
                   </div>
                   <div class="tech-detail-item">
                       <h4>Integration</h4>
                       <p>Seamless connection with existing accounting systems</p>
                   </div>
               </div>
           </div>
       `,
       
       'marketing-roi': `
           <div class="project-detail-header">
               <h2>📈 Marketing ROI & Campaign Performance Analytics</h2>
               <img src="https://via.placeholder.com/600x300/f39c12/ffffff?text=Marketing+ROI+Detail" alt="Marketing ROI" class="project-detail-image">
           </div>
           
           <div class="detail-section">
               <h3><i class="fas fa-exclamation-triangle"></i> Problem Statement</h3>
               <ul>
                   <li>Marketing data scattered across multiple platforms and tools</li>
                   <li>Difficulty in calculating true ROI across different campaigns</li>
                   <li>Manual effort required for campaign performance analysis</li>
                   <li>No unified view of marketing spend effectiveness</li>
                   <li>Delayed insights affecting campaign optimization decisions</li>
               </ul>
           </div>

           <div class="detail-section">
               <h3><i class="fas fa-lightbulb"></i> Solution Approach</h3>
               <ul>
                   <li>Built integrated marketing analytics platform across all channels</li>
                   <li>Created automated ROI calculation framework</li>
                   <li>Developed campaign performance tracking with keyword analysis</li>
                   <li>Implemented spend optimization algorithms</li>
                   <li>Created real-time marketing dashboard for stakeholders</li>
                   <li>Built predictive models for campaign performance</li>
               </ul>
           </div>

           <div class="detail-section">
               <h3><i class="fas fa-trophy"></i> Business Outcomes</h3>
               <ul>
                   <li><strong>35% ROI improvement</strong> across all marketing channels</li>
                   <li><strong>10+ campaigns</strong> optimized based on performance analytics</li>
                   <li><strong>Real-time tracking</strong> of marketing spend and performance</li>
                   <li><strong>Optimized budget allocation</strong> based on channel effectiveness</li>
                   <li><strong>Enhanced campaign targeting</strong> through keyword performance analysis</li>
                   <li><strong>Faster optimization</strong> with automated performance insights</li>
               </ul>
           </div>

           <div class="detail-section">
               <h3><i class="fas fa-cogs"></i> Technical Implementation</h3>
               <div class="tech-detail-grid">
                   <div class="tech-detail-item">
                       <h4>ROI Tracking</h4>
                       <p>Automated calculation engine with attribution modeling</p>
                   </div>
                   <div class="tech-detail-item">
                       <h4>Campaign Analysis</h4>
                       <p>Performance tracking across multiple marketing channels</p>
                   </div>
                   <div class="tech-detail-item">
                       <h4>Analytics</h4>
                       <p>Power BI with marketing-specific KPIs and metrics</p>
                   </div>
                   <div class="tech-detail-item">
                       <h4>Optimization</h4>
                       <p>Predictive models for campaign performance improvement</p>
                   </div>
               </div>
           </div>
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

// Initialize project form
function initializeProjectForm() {
   const projectForm = document.getElementById('projectForm');
   if (projectForm) {
       projectForm.addEventListener('submit', function(e) {
           e.preventDefault();
           addNewProject();
       });
   }
}

function addNewProject() {
   const title = document.getElementById('projectTitle').value;
   const description = document.getElementById('projectDescription').value;
   const type = document.getElementById('projectType').value;
   const impact = document.getElementById('projectImpact').value;
   const tech = document.getElementById('projectTech').value;
   const image = document.getElementById('projectImage').value || 'https://via.placeholder.com/300x180/667eea/ffffff?text=New+Project';
   
   if (!title || !description || !type || !impact || !tech) {
       window.portfolioUtils.showNotification('Please fill all required fields', 'error');
       return;
   }
   
   const newProject = createCompactProjectCard({
       title,
       description,
       type,
       impact,
       tech: tech.split(',').map(t => t.trim()),
       image
   });
   
   // Add to projects grid
   const projectsGrid = document.querySelector('.projects-grid');
   projectsGrid.insertBefore(newProject, projectsGrid.firstChild);
   
   // Save to localStorage
   saveProject({ title, description, type, impact, tech, image });
   
   // Close modal
   closeProjectEditor();
   
   // Show success message
   window.portfolioUtils.showNotification('Project added successfully!');
}

function createCompactProjectCard(project) {
   const projectDiv = document.createElement('div');
   projectDiv.className = 'project-card fade-in visible';
   projectDiv.setAttribute('data-category', 'custom');
   
   // Show only first 3 tech items, rest as "+X more"
   const techItems = project.tech.slice(0, 3);
   const remainingCount = project.tech.length - 3;
   
   projectDiv.innerHTML = `
       <div class="project-thumbnail">
           <img src="${project.image}" alt="${project.title}">
           <div class="project-overlay">
               <button class="view-details-btn" onclick="showCustomProjectDetails('${project.title}')">
                   <i class="fas fa-eye"></i> View Details
               </button>
           </div>
       </div>
       <div class="project-info">
           <h3>${project.title}</h3>
           <p>${project.description}</p>
           <div class="project-meta">
               <div class="project-type">${project.type}</div>
               <div class="project-impact">${project.impact}</div>
           </div>
           <div class="tech-stack-compact">
               ${techItems.map(tech => `<span>${tech}</span>`).join('')}
               ${remainingCount > 0 ? `<span>+${remainingCount} more</span>` : ''}
           </div>
       </div>
   `;
   
   return projectDiv;
}

function showCustomProjectDetails(title) {
   const savedProjects = JSON.parse(localStorage.getItem('customProjects') || '[]');
   const project = savedProjects.find(p => p.title === title);
   
   if (project) {
       const detailContent = `
           <div class="project-detail-header">
               <h2>${project.title}</h2>
               <img src="${project.image}" alt="${project.title}" class="project-detail-image">
           </div>
           
           <div class="detail-section">
               <h3><i class="fas fa-info-circle"></i> Project Overview</h3>
               <p>${project.description}</p>
           </div>

           <div class="detail-section">
               <h3><i class="fas fa-cogs"></i> Technologies Used</h3>
               <div class="tech-detail-grid">
                   ${project.tech.split(',').map(tech => `
                       <div class="tech-detail-item">
                           <h4>${tech.trim()}</h4>
                           <p>Implemented in project development</p>
                       </div>
                   `).join('')}
               </div>
           </div>

           <div class="detail-section">
               <h3><i class="fas fa-trophy"></i> Project Impact</h3>
               <ul>
                   <li>Project Type: ${project.type}</li>
                   <li>Key Achievement: ${project.impact}</li>
                   <li>Successfully implemented custom solution</li>
               </ul>
           </div>
       `;
       
       document.getElementById('projectDetailContent').innerHTML = detailContent;
       document.getElementById('projectDetailModal').style.display = 'block';
   }
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
       const projectCard = createCompactProjectCard(project);
       projectsGrid.appendChild(projectCard);
   });
}

// Close modal when clicking outside
window.onclick = function(event) {
   const detailModal = document.getElementById('projectDetailModal');
   const addProjectModal = document.getElementById('addProjectModal');
   
   if (event.target === detailModal) {
       closeProjectDetail();
   }
   if (event.target === addProjectModal) {
       closeProjectEditor();
   }
}

// Load custom projects when page loads
setTimeout(() => {
   loadCustomProjects();
}, 100);
