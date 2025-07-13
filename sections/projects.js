function showProjectDetails(projectId) {
    const content = getProjectContent(projectId);
    document.getElementById('modalContent').innerHTML = content;
    document.getElementById('projectModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('projectModal').style.display = 'none';
}

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
                'Integrated data from Blinkit, Swiggy, and Zepto platforms',
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

window.onclick = function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeModal();
    }
}
