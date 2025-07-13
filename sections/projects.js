// Projects functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeProjectFilters();
});

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
                <h2>Sales Performance Analytics Dashboard</h2>
                <p>Real-time Sales Tracking & Target Analysis System</p>
            </div>
            <div class="project-detail-body">
                <div class="detail-section">
                    <h3>🎯 Project Objective</h3>
                    <p>Create a comprehensive sales analytics solution providing real-time visibility into sales performance across different geographies, products, and time periods.</p>
                </div>
                
                <div class="pain-points">
                    <h4>⚠️ Pain Points</h4>
                    <ul class="detail-list">
                        <li>Manual sales reporting taking 2+ days per week</li>
                        <li>Lack of real-time visibility into sales performance</li>
                        <li>Difficulty in tracking target vs actual performance</li>
                        <li>No geographic or SKU-wise performance insights</li>
                        <li>Delayed decision-making due to outdated reports</li>
                    </ul>
                </div>

                <div class="solutions">
                    <h4>✅ Solutions Implemented</h4>
                    <ul class="detail-list">
                        <li>Developed interactive Power BI dashboards with real-time data refresh</li>
                        <li>Implemented DAX calculations for complex metrics and KPIs</li>
                        <li>Created automated ETL processes using Power Query</li>
                        <li>Built geographic visualization with drill-down capabilities</li>
                        <li>Established data gateway for automated data refresh</li>
                    </ul>
                </div>

                <div class="detail-section">
                    <h3>🔄 Implementation Process</h3>
                    <div class="implementation-process">
                        <div class="process-step">
                            <div class="step-number">1</div>
                            <h4>Requirement gathering and stakeholder interviews</h4>
                        </div>
                        <div class="process-step">
                            <div class="step-number">2</div>
                            <h4>Data source identification and mapping</h4>
                        </div>
                        <div class="process-step">
                            <div class="step-number">3</div>
                            <h4>Dashboard design and wireframing</h4>
                        </div>
                        <div class="process-step">
                            <div class="step-number">4</div>
                            <h4>Development and testing</h4>
                        </div>
                        <div class="process-step">
                            <div class="step-number">5</div>
                            <h4>User training and deployment</h4>
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h3>📊 Key Outcomes & Metrics</h3>
                    <div class="outcome-metrics">
                        <div class="metric-card">
                            <div class="metric-value">75%</div>
                            <div class="metric-label">Time Saved</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-value">Real-time</div>
                            <div class="metric-label">Report Generation</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-value">3x Faster</div>
                            <div class="metric-label">Decision Speed</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-value">99.9%</div>
                            <div class="metric-label">Data Accuracy</div>
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h3>🛠️ Technologies Used</h3>
                    <div class="tech-stack-detail">
                        <span class="tech-item">Power BI</span>
                        <span class="tech-item">DAX</span>
                        <span class="tech-item">Power Query</span>
                        <span class="tech-item">SQL Server</span>
                        <span class="tech-item">Excel</span>
                        <span class="tech-item">Power BI Service</span>
                    </div>
                </div>

                <div class="detail-section">
                    <h3>💼 Business Impact</h3>
                    <p>Transformed sales reporting from a 2-day manual process to real-time automated insights, enabling faster strategic decisions and improving sales team productivity by 40%.</p>
                </div>
            </div>
        `,
        
        'ecommerce-intelligence': `
            <div class="project-detail-header">
                <h2>E-commerce Intelligence Platform</h2>
                <p>Advanced Analytics for Multi-Platform Operations</p>
            </div>
            <div class="project-detail-body">
                <div class="detail-section">
                    <h3>🎯 Project Objective</h3>
                    <p>Build unified analytics platform for Blinkit, Swiggy, and Zepto with comprehensive market analysis and performance tracking.</p>
                </div>
                
                <div class="pain-points">
                    <h4>⚠️ Pain Points</h4>
                    <ul class="detail-list">
                        <li>Scattered data across multiple e-commerce platforms</li>
                        <li>No unified view of market performance</li>
                        <li>Manual effort for market share analysis</li>
                        <li>Delayed insights affecting strategic decisions</li>
                        <li>Inconsistent KPI tracking across platforms</li>
                    </ul>
                </div>

                <div class="solutions">
                    <h4>✅ Solutions Implemented</h4>
                    <ul class="detail-list">
                        <li>Integrated data from Blinkit, Swiggy, and Zepto platforms</li>
                        <li>Built unified market share analysis dashboard</li>
                        <li>Implemented demand forecasting algorithms</li>
                        <li>Created automated PO tracking system</li>
                        <li>Developed competitor analysis framework</li>
                    </ul>
                </div>

                <div class="detail-section">
                    <h3>📊 Key Outcomes & Metrics</h3>
                    <div class="outcome-metrics">
                        <div class="metric-card">
                            <div class="metric-value">3</div>
                            <div class="metric-label">Platforms Unified</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-value">60%</div>
                            <div class="metric-label">Analysis Time Reduced</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-value">Real-time</div>
                            <div class="metric-label">Market Insights</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-value">25%</div>
                            <div class="metric-label">Revenue Growth</div>
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h3>🛠️ Technologies Used</h3>
                    <div class="tech-stack-detail">
                        <span class="tech-item">Power BI</span>
                        <span class="tech-item">Python</span>
                        <span class="tech-item">Power Query</span>
                        <span class="tech-item">APIs</span>
                        <span class="tech-item">Forecasting Models</span>
                    </div>
                </div>
            </div>
        `
        // Add more project details as needed...
    };
    
    return details[projectId] || '<div class="project-detail-header"><h2>Project Details</h2><p>Details coming soon...</p></div>';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('projectDetailModal');
    if (event.target === modal) {
        closeProjectDetail();
    }
}
