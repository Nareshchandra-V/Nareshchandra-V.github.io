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
        },
        'inventory-system': {
            title: 'Inventory Management System',
            subtitle: 'Smart Optimization & Predictive Analytics',
            objective: 'Develop intelligent inventory management system to reduce stockouts and overstock situations through predictive analytics and automated optimization.',
            painPoints: [
                'High out-of-stock rates affecting customer satisfaction',
                'Overstock situations leading to increased holding costs',
                'Manual inventory planning consuming resources',
                'Poor demand forecasting accuracy',
                'Inefficient reorder point calculations'
            ],
            solutions: [
                'Built predictive analytics models for demand forecasting',
                'Implemented automated reorder point calculations',
                'Created real-time inventory monitoring dashboards',
                'Developed stock optimization algorithms',
                'Established automated alert systems for critical levels'
            ],
            processSteps: [
                'Historical data analysis and pattern identification',
                'Predictive model development and testing',
                'Dashboard design and KPI definition',
                'System integration and automation setup',
                'User training and continuous optimization'
            ],
            metrics: [
                { value: '25%', label: 'Stock Reduction' },
                { value: '90%', label: 'Fill Rate' },
                { value: '35%', label: 'Cost Savings' },
                { value: 'Real-time', label: 'Monitoring' }
            ],
            technologies: ['Power BI', 'DAX', 'Predictive Analytics', 'ETL', 'Google Sheets'],
            impact: 'Reduced inventory costs by 25% while maintaining 90% fill rates, significantly improving customer satisfaction and operational efficiency.'
        },
        'financial-suite': {
            title: 'Financial Reporting Suite',
            subtitle: 'Automated Financial Analytics & Collections Tracking',
            objective: 'Create comprehensive financial reporting system with automated collections tracking, outstanding analysis, and real-time financial KPI monitoring.',
            painPoints: [
                'Manual financial reporting consuming 8+ hours weekly',
                'Delayed collections tracking affecting cash flow',
                'Inconsistent financial data across departments',
                'Time-consuming reconciliation processes',
                'Lack of real-time financial visibility'
            ],
            solutions: [
                'Automated financial data collection and processing',
                'Built real-time collections tracking dashboard',
                'Implemented automated reconciliation workflows',
                'Created comprehensive financial KPI reporting',
                'Established automated alert systems for overdue payments'
            ],
            processSteps: [
                'Financial process mapping and analysis',
                'Data source integration and validation',
                'Automation workflow development',
                'Dashboard and reporting setup',
                'Testing and user acceptance validation'
            ],
            metrics: [
                { value: '70%', label: 'Time Saved' },
                { value: '100%', label: 'Accuracy' },
                { value: 'Daily', label: 'Updates' },
                { value: '35%', label: 'Cash Flow Improvement' }
            ],
            technologies: ['Power BI', 'Financial Modeling', 'Google Sheets', 'Automation', 'DAX'],
            impact: 'Streamlined financial operations with 70% time savings, improved cash flow management, and enhanced financial visibility across the organization.'
        },
        'marketing-tracker': {
            title: 'Marketing ROI Tracker',
            subtitle: 'Campaign Performance & ROI Analytics Platform',
            objective: 'Build integrated marketing analytics platform for comprehensive campaign tracking, ROI analysis, and performance optimization across all marketing channels.',
            painPoints: [
                'Scattered marketing data across multiple platforms',
                'Difficulty calculating accurate campaign ROI',
                'Manual effort for performance analysis',
                'No unified view of marketing effectiveness',
                'Delayed campaign optimization decisions'
            ],
            solutions: [
                'Integrated data from all marketing channels',
                'Built automated ROI calculation framework',
                'Created comprehensive campaign performance dashboards',
                'Implemented keyword effectiveness tracking',
                'Developed budget optimization recommendations'
            ],
            processSteps: [
                'Marketing data source identification',
                'ROI calculation methodology design',
                'Campaign tracking system development',
                'Performance analytics dashboard creation',
                'Optimization framework implementation'
            ],
            metrics: [
                { value: '35%', label: 'ROI Improvement' },
                { value: '10+', label: 'Campaigns Tracked' },
                { value: 'Real-time', label: 'Monitoring' },
                { value: '50%', label: 'Analysis Time Saved' }
            ],
            technologies: ['Power BI', 'Marketing Analytics', 'ROI Analysis', 'Campaign Tracking', 'Google Sheets'],
            impact: 'Achieved 35% improvement in marketing ROI through data-driven campaign optimization and automated performance tracking across all channels.'
        },
        'process-automation': {
            title: 'Business Process Automation',
            subtitle: 'Intelligent Workflow Automation Framework',
            objective: 'Develop comprehensive automation framework to reduce manual processes, improve efficiency, and enable scalable business operations.',
            painPoints: [
                'High manual effort in repetitive business processes',
                'Human errors in data entry and processing',
                'Inconsistent process execution across teams',
                'Resource-intensive operations affecting productivity',
                'Delayed processing times impacting customer service'
            ],
            solutions: [
                'Designed intelligent workflow automation framework',
                'Implemented automated data validation and processing',
                'Created seamless system integrations',
                'Built process monitoring and exception handling',
                'Established automated reporting and notifications'
            ],
            processSteps: [
                'Process mapping and automation opportunity analysis',
                'Workflow design and automation logic development',
                'System integration and testing',
                'Error handling and monitoring setup',
                'Deployment and continuous improvement'
            ],
            metrics: [
                { value: '40%', label: 'Manual Reduction' },
                { value: '99%', label: 'Accuracy Rate' },
                { value: '60%', label: 'Speed Increase' },
                { value: '24/7', label: 'Operation' }
            ],
            technologies: ['Process Automation', 'Google Sheets', 'Power BI', 'Integration APIs', 'Workflow Engine'],
            impact: 'Reduced manual processes by 40% while increasing accuracy to 99%, enabling the team to focus on strategic initiatives and improving overall operational efficiency.'
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
