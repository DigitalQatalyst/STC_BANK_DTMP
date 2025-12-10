import React, { useState, useEffect } from 'react';
import KPICard from './components/KPICard';
import AIInsights from './components/AllInsights';
import DomainComplianceGrid from './components/DomainComplianceGrid';
import DomainMaturityChart from './components/DomainMaturityChart';
import SAMAControlAlerts from './components/SAMAControlAlerts';
import MaturityTrendGrid from './components/MaturityTrendGrid';
import Icon from '../../components/AppIcon';
import PageTabs from '../../components/PageTabs';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import { Checkbox } from '../../components/ui/Checkbox';

const EJPOperationsDashboard = () => {
  // Tab navigation state
  const [activeSegmentTab, setActiveSegmentTab] = useState('operations-internal');
  const [activeDashboardTab, setActiveDashboardTab] = useState('operations');
  const [activeSecondLayerTab, setActiveSecondLayerTab] = useState('ejp-transaction-performance');
  
  // Dynamic dashboard state
  const [dashboardData, setDashboardData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Core state management
  const filterDefaults = {
    domain: 'all',
    subDomain: 'all',
    control: 'all',
    assessmentOwner: 'all',
    maturityRating: 'all',
    assessmentDate: 'all'
  };

  type FilterKey = keyof typeof filterDefaults;

  const filterDefinitions: Array<{
    key: FilterKey;
    label: string;
    icon: string;
    accent: string;
    pillClass: string;
  }> = [
    { key: 'domain', label: 'Domain', icon: 'Layers', accent: 'text-indigo-600', pillClass: 'bg-indigo-50 border border-indigo-200 text-indigo-800' },
    { key: 'subDomain', label: 'Sub Domain', icon: 'Grid', accent: 'text-blue-600', pillClass: 'bg-blue-50 border border-blue-200 text-blue-800' },
    { key: 'control', label: 'Controls', icon: 'Shield', accent: 'text-purple-600', pillClass: 'bg-purple-50 border border-purple-200 text-purple-800' },
    { key: 'assessmentOwner', label: 'Assessment Owner', icon: 'UserCheck', accent: 'text-emerald-600', pillClass: 'bg-emerald-50 border border-emerald-200 text-emerald-800' },
    { key: 'maturityRating', label: 'Maturity Rating', icon: 'Star', accent: 'text-amber-600', pillClass: 'bg-amber-50 border border-amber-200 text-amber-800' },
    { key: 'assessmentDate', label: 'Assessment Date', icon: 'Calendar', accent: 'text-rose-600', pillClass: 'bg-rose-50 border border-rose-200 text-rose-800' }
  ];

  const [globalFilters, setGlobalFilters] = useState({ ...filterDefaults });

  // Layer-specific contextual filters
  const [contextualFilters, setContextualFilters] = useState({
    diagnostic: {
      rootCauseFactor: 'all',
      partner: 'all',
      slaStatus: 'all',
      delaySource: 'all'
    },
    predictive: {
      forecastHorizon: '3-months',
      confidenceLevel: '95',
      modelVersion: 'latest',
      seasonality: 'enabled'
    },
    prescriptive: {
      optimizationGoal: 'sla-improvement',
      budgetCap: 'unlimited',
      resourceCap: 'current',
      targetKPI: 'sla-compliance',
      constraints: 'none'
    },
    cognitive: {
      agentObjective: 'efficiency',
      automationMode: 'supervised',
      guardrails: 'standard',
      changeWindow: 'maintenance'
    }
  });

  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRealTimeActive, setIsRealTimeActive] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    if (isRealTimeActive) {
      const interval = setInterval(() => {
        setLastUpdated(new Date());
      }, 30 * 1000);
      return () => clearInterval(interval);
    }
  }, [isRealTimeActive]);

  // Analytics layer configuration
  const analyticsLayers = [
  {
    id: 'descriptive',
    label: 'Descriptive – What Happened',
    color: 'blue',
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-50'
  },
  {
    id: 'diagnostic',
    label: 'Diagnostic – Why It Happened',
    color: 'amber',
    borderColor: 'border-amber-500',
    bgColor: 'bg-amber-50'
  },
  {
    id: 'predictive',
    label: 'Predictive – What\'s Next',
    color: 'green',
    borderColor: 'border-green-500',
    bgColor: 'bg-green-50'
  },
  {
    id: 'prescriptive',
    label: 'Prescriptive – What To Do',
    color: 'purple',
    borderColor: 'border-purple-500',
    bgColor: 'bg-purple-50'
  },
  {
    id: 'cognitive',
    label: 'Cognitive – AI In Action',
    color: 'teal',
    borderColor: 'border-teal-500',
    bgColor: 'bg-teal-50'
  }];


  // Filter options
  const globalFilterOptions = {
    domain: [
      { value: 'all', label: 'All Domains' },
      { value: 'it-governance', label: 'Information Technology Governance & Leadership' },
      { value: 'it-operations', label: 'Information Technology Operation Management' },
      { value: 'it-risk', label: 'Information Technology Risk Management' },
      { value: 'system-change', label: 'System Change Management' }
    ],
    subDomain: [
      { value: 'all', label: 'All Sub Domains' },
      { value: 'governance-oversight', label: 'Governance Oversight' },
      { value: 'risk-oversight', label: 'Risk Oversight' },
      { value: 'operations-delivery', label: 'Operations Delivery' },
      { value: 'change-control', label: 'Change Control' },
      { value: 'security-management', label: 'Security Management' }
    ],
    control: [
      { value: 'all', label: 'All Controls' },
      { value: 'GL-01', label: 'GL-01 Board Reporting' },
      { value: 'GL-03', label: 'GL-03 Governance Reviews' },
      { value: 'OM-05', label: 'OM-05 Operations Automation' },
      { value: 'RM-08', label: 'RM-08 Risk Register' },
      { value: 'SCM-12', label: 'SCM-12 Change Authority' }
    ],
    assessmentOwner: [
      { value: 'all', label: 'All Owners' },
      { value: 'cio-office', label: 'CIO Office' },
      { value: 'risk-compliance', label: 'Risk & Compliance' },
      { value: 'operations', label: 'Service Operations' },
      { value: 'security', label: 'Cyber Security' },
      { value: 'audit', label: 'Internal Audit' }
    ],
    maturityRating: [
      { value: 'all', label: 'All Ratings' },
      { value: 'l1', label: 'L1 - Initial' },
      { value: 'l2', label: 'L2 - Repeatable' },
      { value: 'l3', label: 'L3 - Structured' },
      { value: 'l4', label: 'L4 - Managed' },
      { value: 'l5', label: 'L5 - Optimized' }
    ],
    assessmentDate: [
      { value: 'all', label: 'All Dates' },
      { value: '2024-q1', label: 'Q1 2024' },
      { value: '2024-q2', label: 'Q2 2024' },
      { value: '2024-q3', label: 'Q3 2024' },
      { value: '2024-q4', label: 'Q4 2024' },
      { value: '2025-q1', label: 'Q1 2025' }
    ]
  };

  // Contextual filter options
  const contextualFilterOptions = {
    diagnostic: {
      rootCauseFactor: [
      { value: 'all', label: 'All Factors' },
      { value: 'capacity', label: 'Capacity Issues' },
      { value: 'process', label: 'Process Bottlenecks' },
      { value: 'system', label: 'System Failures' },
      { value: 'human', label: 'Human Error' },
      { value: 'external', label: 'External Dependencies' }],

      slaStatus: [
      { value: 'all', label: 'All SLA Status' },
      { value: 'met', label: 'SLA Met' },
      { value: 'at-risk', label: 'At Risk' },
      { value: 'breached', label: 'Breached' }],

      delaySource: [
      { value: 'all', label: 'All Delay Sources' },
      { value: 'approval', label: 'Approval Delays' },
      { value: 'documentation', label: 'Documentation' },
      { value: 'compliance', label: 'Compliance Checks' },
      { value: 'technical', label: 'Technical Issues' }]

    },
    predictive: {
      forecastHorizon: [
      { value: '1-month', label: '1 Month' },
      { value: '3-months', label: '3 Months' },
      { value: '6-months', label: '6 Months' },
      { value: '12-months', label: '12 Months' }],

      confidenceLevel: [
      { value: '80', label: '80%' },
      { value: '90', label: '90%' },
      { value: '95', label: '95%' },
      { value: '99', label: '99%' }],

      modelVersion: [
      { value: 'latest', label: 'Latest Model' },
      { value: 'stable', label: 'Stable Model' },
      { value: 'experimental', label: 'Experimental' }]

    },
    prescriptive: {
      optimizationGoal: [
      { value: 'sla-improvement', label: 'SLA Improvement' },
      { value: 'cost-reduction', label: 'Cost Reduction' },
      { value: 'quality-enhancement', label: 'Quality Enhancement' },
      { value: 'throughput-increase', label: 'Throughput Increase' }],

      budgetCap: [
      { value: 'unlimited', label: 'Unlimited' },
      { value: '100k', label: '£100K' },
      { value: '500k', label: '£500K' },
      { value: '1m', label: '£1M' }],

      targetKPI: [
      { value: 'sla-compliance', label: 'SLA Compliance' },
      { value: 'cost-efficiency', label: 'Cost Efficiency' },
      { value: 'customer-satisfaction', label: 'Customer Satisfaction' },
      { value: 'partner-performance', label: 'Partner Performance' }]

    },
    cognitive: {
      agentObjective: [
      { value: 'efficiency', label: 'Efficiency Optimization' },
      { value: 'quality', label: 'Quality Enhancement' },
      { value: 'cost', label: 'Cost Optimization' },
      { value: 'risk', label: 'Risk Mitigation' }],

      automationMode: [
      { value: 'supervised', label: 'Supervised' },
      { value: 'semi-autonomous', label: 'Semi-Autonomous' },
      { value: 'autonomous', label: 'Autonomous' }],

      guardrails: [
      { value: 'strict', label: 'Strict' },
      { value: 'standard', label: 'Standard' },
      { value: 'relaxed', label: 'Relaxed' }]

    }
  };

  // Layer data configurations
  const layerConfigurations = {
    descriptive: {
      title: "STC ITGPRC - Overall Compliance Overview",
      kpis: [
      {
        title: 'Compliance Score (L0)',
        value: '0',
        unit: 'score',
        trend: 'stable',
        trendValue: '0',
        threshold: 'warning',
        description: 'STC baseline against SAMA ITGF foundational guardrails for the digital bank story.',
        icon: 'Shield',
        sparklineData: [0, 0, 0, 0, 0, 0],
        target: 514
      },
      {
        title: 'Compliance Score (L1)',
        value: '0',
        unit: 'score',
        trend: 'stable',
        trendValue: '0',
        threshold: 'warning',
        description: 'STC aligning regulatory commitments to evidence SAMA ITGF level 1 readiness.',
        icon: 'Layers',
        sparklineData: [0, 0, 0, 0, 0, 0],
        target: 514
      },
      {
        title: 'Compliance Score (L2)',
        value: '87',
        unit: 'score',
        trend: 'up',
        trendValue: '+12',
        threshold: 'good',
        description: 'STC highlighting tangible closure of SAMA ITGF level 2 gaps.',
        icon: 'Activity',
        sparklineData: [10, 15, 25, 45, 68, 87],
        target: 514
      },
      {
        title: 'Compliance Score (L3)',
        value: '427',
        unit: 'score',
        trend: 'up',
        trendValue: '+41',
        threshold: 'excellent',
        description: 'STC showcasing disciplined execution on SAMA ITGF level 3 controls.',
        icon: 'TrendingUp',
        sparklineData: [300, 320, 340, 365, 386, 427],
        target: 514
      },
      {
        title: 'Compliance Score (L4)',
        value: '0',
        unit: 'score',
        trend: 'stable',
        trendValue: '0',
        threshold: 'critical',
        description: 'STC preparing automation hooks to operate SAMA ITGF level 4 controls.',
        icon: 'PieChart',
        sparklineData: [0, 0, 0, 0, 0, 0],
        target: 514
      },
      {
        title: 'Compliance Score (L5)',
        value: '0',
        unit: 'score',
        trend: 'stable',
        trendValue: '0',
        threshold: 'critical',
        description: 'STC framing the innovation storyline that keeps SAMA ITGF compliance evergreen.',
        icon: 'Award',
        sparklineData: [0, 0, 0, 0, 0, 0],
        target: 514
      }],

      mainVisual: 'EJP Transaction Performance Over Time',
      alertsTitle: 'Current SLA Breaches and Service Issues',
      insights: [
      'Provider & Partner Performance – SLA Compliance and Quality Benchmarking',
      'Service Delivery Funnel – Application to Completion Flow',
      'Enterprise Outcomes & Impact – Growth and Satisfaction Analysis',
      'Comparative Insights – Cross-Enterprise and Service Performance'],

      summary: 'EJP Operations performance metrics showing transaction delivery efficiency, enterprise engagement, and provider performance across the platform.'
    },
    diagnostic: {
      title: "Root Cause Highlights",
      kpis: [
      {
        title: 'Root Cause Contribution',
        value: '34.2',
        unit: '% impact',
        trend: 'stable',
        trendValue: '±0.1%',
        threshold: 'warning',
        description: 'Primary factor contributing to performance issues',
        icon: 'AlertTriangle',
        sparklineData: [32, 33, 34, 35, 34.5, 34.2],
        target: 25
      },
      {
        title: 'Delay Impact',
        value: '2.3',
        unit: 'days avg',
        trend: 'up',
        trendValue: '+0.4 days',
        threshold: 'critical',
        description: 'Average delay caused by identified bottlenecks',
        icon: 'Clock',
        sparklineData: [1.5, 1.8, 2.0, 2.1, 2.2, 2.3],
        target: 1.0
      },
      {
        title: 'Partner Variance',
        value: '15.8',
        unit: '% deviation',
        trend: 'down',
        trendValue: '-2.1%',
        threshold: 'good',
        description: 'Performance variation across partner network',
        icon: 'BarChart3',
        sparklineData: [20, 19, 18, 17, 16.5, 15.8],
        target: 10
      },
      {
        title: 'Service Deviation',
        value: '8.7',
        unit: '% variance',
        trend: 'stable',
        trendValue: '±0.2%',
        threshold: 'good',
        description: 'Variation from expected service standards',
        icon: 'Target',
        sparklineData: [9.2, 9.0, 8.8, 8.9, 8.8, 8.7],
        target: 5
      }],

      mainVisual: 'Factors Influencing Service Outcomes',
      alertsTitle: 'Top Contributors to Performance Drop',
      insights: [
      'Correlation Matrix – Metric Relationships',
      'Process Drill-Down – Queue to Resolution Stages',
      'Cause-Effect Flow Map – Delay Propagation Across Processes',
      'Issue Theme Summary – Frequent Operational Problems'],

      summary: 'Why KPIs shifted and which factors drive the variation.'
    },
    predictive: {
      title: "Forecast Highlights",
      kpis: [
      {
        title: 'Next-Period SLA',
        value: '94.8',
        unit: '% predicted',
        trend: 'down',
        trendValue: '-1.4%',
        threshold: 'warning',
        description: 'Forecasted SLA achievement for next period',
        icon: 'TrendingDown',
        sparklineData: [96.2, 95.8, 95.4, 95.0, 94.9, 94.8],
        target: 96
      },
      {
        title: 'Predicted Resolution Time',
        value: '4.6',
        unit: 'days forecast',
        trend: 'up',
        trendValue: '+0.4 days',
        threshold: 'warning',
        description: 'Expected average resolution time',
        icon: 'Clock',
        sparklineData: [4.2, 4.3, 4.4, 4.5, 4.55, 4.6],
        target: 4.0
      },
      {
        title: 'Expected Cost',
        value: '£132',
        unit: 'predicted',
        trend: 'up',
        trendValue: '+£8',
        threshold: 'warning',
        description: 'Forecasted cost per service delivery',
        icon: 'PoundSterling',
        sparklineData: [124, 126, 128, 130, 131, 132],
        target: 125
      },
      {
        title: 'Partner Risk Index',
        value: '23.4',
        unit: '/100 risk',
        trend: 'up',
        trendValue: '+3.2',
        threshold: 'critical',
        description: 'Predicted risk level across partner network',
        icon: 'AlertTriangle',
        sparklineData: [18, 19, 20, 21.5, 22.8, 23.4],
        target: 15
      }],

      mainVisual: 'Projected Service Performance with Confidence Range',
      alertsTitle: 'Expected Risks and Early Warnings',
      insights: [
      'Risk Heatmap – Likelihood vs Impact by Partner',
      'Forecast Distribution – Range of Possible Outcomes',
      'Model Explainability – Key Predictors Driving Forecast',
      'Timeline Slider – View Forecast Evolution by Horizon'],

      summary: 'What\'s likely to happen next and where attention is needed.'
    },
    prescriptive: {
      title: "Optimization Highlights",
      kpis: [
      {
        title: 'Recommended Actions',
        value: '7',
        unit: 'priority items',
        trend: 'stable',
        trendValue: '±0',
        threshold: 'good',
        description: 'High-impact optimization actions identified',
        icon: 'Target',
        sparklineData: [8, 7, 7, 8, 7, 7],
        target: 5
      },
      {
        title: 'Efficiency Gain %',
        value: '12.3',
        unit: '% improvement',
        trend: 'up',
        trendValue: '+2.1%',
        threshold: 'excellent',
        description: 'Expected efficiency improvement from recommendations',
        icon: 'TrendingUp',
        sparklineData: [8, 9, 10, 11, 11.8, 12.3],
        target: 15
      },
      {
        title: 'Cost Savings',
        value: '£245K',
        unit: 'annual',
        trend: 'up',
        trendValue: '+£45K',
        threshold: 'excellent',
        description: 'Projected annual cost savings',
        icon: 'PoundSterling',
        sparklineData: [180, 200, 215, 225, 235, 245],
        target: 300
      },
      {
        title: 'Projected SLA Improvement %',
        value: '3.2',
        unit: '% points',
        trend: 'up',
        trendValue: '+0.8%',
        threshold: 'excellent',
        description: 'Expected SLA performance improvement',
        icon: 'ArrowUp',
        sparklineData: [2.1, 2.4, 2.7, 2.9, 3.0, 3.2],
        target: 4.0
      }],

      mainVisual: 'Scenario Simulator – Adjust Resources to Test Impact',
      alertsTitle: 'High-Priority Actions and Opportunities',
      insights: [
      'Optimization Flow – Resource Reallocation Effect',
      'ROI Matrix – Value vs Effort of Scenarios',
      'Decision Path – Best Actions by Goal',
      'Implementation Timeline – Planned Execution Schedule'],

      summary: 'Recommended next steps and expected impact on service efficiency.'
    },
    cognitive: {
      title: "AI Performance Overview",
      kpis: [
      {
        title: 'Active AI Decisions',
        value: '142',
        unit: 'live decisions',
        trend: 'up',
        trendValue: '+23',
        threshold: 'excellent',
        description: 'AI decisions currently being executed',
        icon: 'Brain',
        sparklineData: [98, 110, 125, 132, 138, 142],
        target: 150
      },
      {
        title: 'Automation Success %',
        value: '89.6',
        unit: '% success',
        trend: 'up',
        trendValue: '+1.4%',
        threshold: 'excellent',
        description: 'Success rate of automated decisions',
        icon: 'CheckCircle',
        sparklineData: [86, 87, 88, 88.5, 89.2, 89.6],
        target: 92
      },
      {
        title: 'Learning Cycles',
        value: '34',
        unit: 'completed',
        trend: 'up',
        trendValue: '+8',
        threshold: 'excellent',
        description: 'AI model learning cycles completed',
        icon: 'RefreshCw',
        sparklineData: [20, 24, 28, 30, 32, 34],
        target: 40
      },
      {
        title: 'Approval Rate %',
        value: '94.2',
        unit: '% approved',
        trend: 'up',
        trendValue: '+2.1%',
        threshold: 'excellent',
        description: 'User approval rate for AI recommendations',
        icon: 'ThumbsUp',
        sparklineData: [90, 91, 92, 93, 93.8, 94.2],
        target: 95
      }],

      mainVisual: 'AI Decision Timeline – Actions and Rationale',
      alertsTitle: 'Live AI Actions and Execution Status',
      insights: [
      'Decision Graph – How AI Derived Recommendations',
      'Feedback Loop – User Approvals Over Time',
      'Network Map – System Adjustments Across Partners',
      'Sentiment Monitor – User Perception of AI Decisions'],

      summary: 'How AI agents execute and refine decisions autonomously.'
    }
  };

  // Tab configuration
  const segmentTabs = [
  { id: 'market-internal', label: 'Market (Internal)' },
  { id: 'strategic-internal', label: 'Strategic (Internal)' },
  { id: 'operations-internal', label: 'Operations (Internal)' },
  { id: 'market-external', label: 'Market (External)' },
  { id: 'strategic-external', label: 'Strategic (External)' },
  { id: 'engagement-external', label: 'Engagement (External)' }];


  const dashboardTabsConfig = {
    'operations-internal': [
    { id: 'market', label: 'Market' },
    { id: 'strategic', label: 'Strategic' },
    { id: 'operations', label: 'Operations' }]
  };

  // Handle tab navigation with keyboard support
  const handleSegmentTabKeyDown = (event, tabId) => {
    const currentIndex = segmentTabs?.findIndex((tab) => tab?.id === activeSegmentTab);
    let newIndex = currentIndex;

    switch (event?.key) {
      case 'ArrowLeft':
        newIndex = currentIndex > 0 ? currentIndex - 1 : segmentTabs?.length - 1;
        event?.preventDefault();
        break;
      case 'ArrowRight':
        newIndex = currentIndex < segmentTabs?.length - 1 ? currentIndex + 1 : 0;
        event?.preventDefault();
        break;
      case 'Home':
        newIndex = 0;
        event?.preventDefault();
        break;
      case 'End':
        newIndex = segmentTabs?.length - 1;
        event?.preventDefault();
        break;
      default:
        return;
    }

    const newTab = segmentTabs?.[newIndex];
    if (newTab) {
      setActiveSegmentTab(newTab?.id);
      // Reset dashboard tab to first available when segment changes
      const dashboardTabs = dashboardTabsConfig?.[newTab?.id];
      if (dashboardTabs?.length > 0) {
        setActiveDashboardTab(dashboardTabs?.[0]?.id);
      }
    }
  };

  const handleDashboardTabKeyDown = (event, tabId) => {
    const dashboardTabs = dashboardTabsConfig?.[activeSegmentTab] || [];
    const currentIndex = dashboardTabs?.findIndex((tab) => tab?.id === activeDashboardTab);
    let newIndex = currentIndex;

    switch (event?.key) {
      case 'ArrowLeft':
        newIndex = currentIndex > 0 ? currentIndex - 1 : dashboardTabs?.length - 1;
        event?.preventDefault();
        break;
      case 'ArrowRight':
        newIndex = currentIndex < dashboardTabs?.length - 1 ? currentIndex + 1 : 0;
        event?.preventDefault();
        break;
      case 'Home':
        newIndex = 0;
        event?.preventDefault();
        break;
      case 'End':
        newIndex = dashboardTabs?.length - 1;
        event?.preventDefault();
        break;
      default:
        return;
    }

    const newTab = dashboardTabs?.[newIndex];
    if (newTab) {
      setActiveDashboardTab(newTab?.id);
    }
  };

  // Update dashboard tab when segment changes
  useEffect(() => {
    const dashboardTabs = dashboardTabsConfig?.[activeSegmentTab];
    if (dashboardTabs?.length > 0 && !dashboardTabs?.find((tab) => tab?.id === activeDashboardTab)) {
      setActiveDashboardTab(dashboardTabs?.[0]?.id);
    }
  }, [activeSegmentTab, activeDashboardTab]);


  // Update global filters
  const updateGlobalFilter = (filterKey: FilterKey, value: string) => {
    setGlobalFilters((prev) => ({
      ...prev,
      [filterKey]: value
    }));
  };

  // Dynamic data fetching
  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call with dynamic data based on current selections
      const mockData = {
        operations: {
          'service-delivery-performance': {
            kpis: [
              {
                title: 'Compliance Score (L0)',
                value: 0,
                unit: 'score',
                trend: 'stable',
                trendValue: '0',
                threshold: 'warning',
                description: 'STC baseline against SAMA ITGF foundational guardrails for the digital bank story.',
                icon: 'Shield',
                sparklineData: [0, 0, 0, 0, 0, 0],
                target: 514
              },
              {
                title: 'Compliance Score (L1)',
                value: 0,
                unit: 'score',
                trend: 'stable',
                trendValue: '0',
                threshold: 'warning',
                description: 'STC aligning regulatory commitments to evidence SAMA ITGF level 1 readiness.',
                icon: 'Layers',
                sparklineData: [0, 0, 0, 0, 0, 0],
                target: 514
              },
              {
                title: 'Compliance Score (L2)',
                value: 87,
                unit: 'score',
                trend: 'up',
                trendValue: '+12',
                threshold: 'good',
                description: 'STC highlighting tangible closure of SAMA ITGF level 2 gaps.',
                icon: 'Activity',
                sparklineData: [10, 15, 25, 45, 68, 87],
                target: 514
              },
              {
                title: 'Compliance Score (L3)',
                value: 427,
                unit: 'score',
                trend: 'up',
                trendValue: '+41',
                threshold: 'excellent',
                description: 'STC showcasing disciplined execution on SAMA ITGF level 3 controls.',
                icon: 'TrendingUp',
                sparklineData: [300, 320, 340, 365, 386, 427],
                target: 514
              },
              {
                title: 'Compliance Score (L4)',
                value: 0,
                unit: 'score',
                trend: 'stable',
                trendValue: '0',
                threshold: 'critical',
                description: 'STC preparing automation hooks to operate SAMA ITGF level 4 controls.',
                icon: 'PieChart',
                sparklineData: [0, 0, 0, 0, 0, 0],
                target: 514
              },
              {
                title: 'Compliance Score (L5)',
                value: 0,
                unit: 'score',
                trend: 'stable',
                trendValue: '0',
                threshold: 'critical',
                description: 'STC framing the innovation storyline that keeps SAMA ITGF compliance evergreen.',
                icon: 'Award',
                sparklineData: [0, 0, 0, 0, 0, 0],
                target: 514
              }
            ]
          },
          'dashboard-2': {
            kpis: [
              {
                title: 'Provider Performance',
                value: (Math.random() * 20 + 80).toFixed(1),
                unit: '%',
                trend: Math.random() > 0.5 ? 'up' : 'down',
                trendValue: `+${(Math.random() * 3).toFixed(1)}%`,
                threshold: 'good',
                description: 'Overall provider performance rating',
                icon: 'Users',
                sparklineData: Array.from({length: 6}, () => Math.random() * 20 + 80),
                target: 90
              }
            ]
          }
        },
        market: {
          kpis: [
            {
              title: 'Market Penetration',
              value: (Math.random() * 15 + 70).toFixed(1),
              unit: '%',
              trend: Math.random() > 0.5 ? 'up' : 'down',
              trendValue: `+${(Math.random() * 2).toFixed(1)}%`,
              threshold: 'good',
              description: 'Market penetration rate',
              icon: 'TrendingUp',
              sparklineData: Array.from({length: 6}, () => Math.random() * 15 + 70),
              target: 85
            }
          ]
        },
        strategic: {
          kpis: [
            {
              title: 'Strategic Goals',
              value: (Math.random() * 25 + 60).toFixed(1),
              unit: '%',
              trend: Math.random() > 0.5 ? 'up' : 'down',
              trendValue: `+${(Math.random() * 5).toFixed(1)}%`,
              threshold: 'warning',
              description: 'Progress towards strategic objectives',
              icon: 'Target',
              sparklineData: Array.from({length: 6}, () => Math.random() * 25 + 60),
              target: 80
            }
          ]
        }
      };
      
      setDashboardData(mockData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, [activeDashboardTab, activeSecondLayerTab, globalFilters]);

  // Clear all filters
  const clearAllFilters = () => {
    setGlobalFilters({ ...filterDefaults });
  };

  // Get filter label for display
  const getFilterLabel = (filterKey: FilterKey, value: string) => {
    const options = globalFilterOptions[filterKey];
    const option = options?.find(opt => opt.value === value);
    return option?.label || value;
  };

  // Check if any filters are active (not default values)
  const hasActiveFilters = () => {
    return (Object.keys(globalFilters) as FilterKey[])?.some(
      (key) => globalFilters[key] !== filterDefaults[key]
    );
  };

  // Update contextual filters
  const updateContextualFilter = (layer, filterKey, value) => {
    setContextualFilters((prev) => ({
      ...prev,
      [layer]: {
        ...prev?.[layer],
        [filterKey]: value
      }
    }));
  };



  const formatLastUpdated = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    return date?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">

       {/* 🔹 Dashboard Tabs */}
       <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-center">
            {dashboardTabsConfig?.[activeSegmentTab]?.map((tab, index) =>
                <button
              key={tab?.id}
                onClick={() => setActiveDashboardTab(tab?.id)}
                onKeyDown={(e) => handleDashboardTabKeyDown(e, tab?.id)}
              className={`relative flex-1 px-8 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                activeDashboardTab === tab?.id ?
                'text-blue-600 bg-blue-50 border-b-2 border-blue-500' :
                'text-gray-600 hover:text-gray-800 hover:bg-gray-50'}`
                }
                tabIndex={0}
                role="tab"
                aria-selected={activeDashboardTab === tab?.id}
                aria-controls={`dashboard-${tab?.id}`}>
                    {tab?.label}
                </button>
            )}
          </div>
        </div>
      </div>

       {/* 🔹 Second Layer Tabs - Only show when Operations is selected */}
       {activeDashboardTab === 'operations' && (
         <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center justify-center">
              {[
                { id: 'service-delivery-performance', label: 'Service Delivery Performance Insight' },
                { id: 'dashboard-2', label: 'Dashboard 2' }
              ].map((tab, index) =>
                <button
                  key={tab?.id}
                  onClick={() => setActiveSecondLayerTab(tab?.id)}
                  className={`relative flex-1 px-8 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    activeSecondLayerTab === tab?.id ?
                    'text-blue-600 bg-blue-50 border-b-2 border-blue-500' :
                    'text-gray-600 hover:text-gray-800 hover:bg-gray-50'}`
                }
                tabIndex={0}
                role="tab"
                  aria-selected={activeSecondLayerTab === tab?.id}
                aria-controls={`dashboard-${tab?.id}`}>
                    {tab?.label}
                </button>
            )}
          </div>
        </div>
      </div>
      )}

      <main className="pb-12 px-8 pt-8">
        <div className="max-w-7xl mx-auto mb-6">
          <PageTabs />
        </div>
        <div className="max-w-7xl mx-auto">
          {/* Show Service Delivery content only when that dashboard is active */}
          {(() => {
            // Dynamic content based on tab selections
            if (activeDashboardTab === 'operations' && activeSecondLayerTab === 'service-delivery-performance') {
              return (
          <>
              {/* 🔹 Top Structure - Dashboard Header */}
              <div className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-end gap-4">
                      <div className="flex items-start gap-1 leading-none">
                        <span className="text-3xl font-black tracking-tight" style={{ color: '#5c2d91' }}>
                          STC
                        </span>
                        <span className="text-2xl font-semibold relative -top-1" style={{ color: '#00c49a' }}>
                          Bank
                        </span>
                      </div>
                      <h1 className="text-4xl font-light text-foreground tracking-tight">
                        STC ITGPRC - Overall Compliance Overview
                      </h1>
                    </div>
                    <p className="text-base text-muted-foreground max-w-4xl leading-relaxed">
                      This report provides a concise view of STC's IT Governance, Risk, and Compliance (ITGPRC) 
                      posture across the four SAMA ITGF domains, enabling executives to see where controls are 
                      strong, what needs attention, and how remediation efforts are progressing.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Last update: May 2025
                    </p>
                    {isLoading && (
                      <div className="flex items-center gap-2 text-sm text-blue-600">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <span>Updating data...</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Real-time Status */}
                  <div className="flex flex-col items-end gap-3">
                    <button
                    onClick={() => setIsRealTimeActive(!isRealTimeActive)}
                    className={`flex items-center gap-3 px-4 py-3 border rounded-xl transition-all duration-200 hover:shadow-md ${
                    isRealTimeActive ?
                    'bg-blue-50 border-blue-200 hover:bg-blue-100' : 'bg-card border-border hover:bg-gray-50'}`
                    }>

                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${isRealTimeActive ? 'bg-blue-500 animate-pulse' : 'bg-gray-400'}`} />
                        <div className="flex flex-col">
                          <span className={`text-xs font-medium ${isRealTimeActive ? 'text-blue-900' : 'text-card-foreground'}`}>
                            {isRealTimeActive ? 'Analytics Live' : 'Updates Paused'}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Updated {formatLastUpdated(lastUpdated)}
                          </span>
                        </div>
                      </div>
                      <Icon
                      name={isRealTimeActive ? 'Pause' : 'Play'}
                      size={14}
                      className={`${isRealTimeActive ? 'text-blue-700' : 'text-gray-600'} hover:scale-110 transition-transform`} />

                    </button>
                  </div>
                </div>
              </div>


              {/* 🔹 Main Content Layout with Sidebar */}
              <div className="space-y-12">
                {(() => {
                const layer = analyticsLayers?.find((l) => l?.id === 'descriptive');
                const config = layerConfigurations?.['descriptive'];

                if (!layer || !config) return null;

                return (
                  <div>
                      {/* Global Filters */}
                      <div className="mb-8">
                        <div className="bg-white border border-border rounded-xl p-6">
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                              {filterDefinitions.map((filter) => (
                                <div className="space-y-3" key={filter.key}>
                                  <div className="flex items-center gap-2">
                                    <Icon name={filter.icon} size={16} className={filter.accent} />
                                    <span className="text-sm font-semibold text-foreground">{filter.label}</span>
                                  </div>
                                  <div className="relative">
                                    <Select
                                      value={globalFilters?.[filter.key]}
                                      onChange={(value) => updateGlobalFilter(filter.key, value)}
                                      options={globalFilterOptions?.[filter.key]}
                                      className="w-full"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            {/* Active Filter Tags */}
                            {hasActiveFilters() && (
                              <div className="mt-6 pt-4 border-t border-gray-200">
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-2">
                                    <Icon name="Tag" size={14} className="text-gray-500" />
                                    <span className="text-sm font-medium text-gray-700">Active Filters:</span>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={clearAllFilters}
                                    className="text-xs"
                                  >
                                    <Icon name="X" size={14} className="mr-1" />
                                    Clear All
                    </Button>
                  </div>
                                <div className="flex flex-wrap gap-2">
                                  {filterDefinitions.map((filter) => {
                                    const value = globalFilters?.[filter.key];
                                    if (value === filterDefaults[filter.key]) return null;
                                    return (
                                      <div
                                        key={filter.key}
                                        className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${filter.pillClass}`}
                                      >
                                        <Icon name={filter.icon} size={12} className={filter.accent} />
                                        <span>{getFilterLabel(filter.key, value)}</span>
                                        <button
                                          onClick={() => updateGlobalFilter(filter.key, filterDefaults[filter.key])}
                                          className={`${filter.accent} hover:opacity-75`}
                                        >
                                          <Icon name="X" size={10} />
                                        </button>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Section 1 - Core Performance Metrics */}
                      <div className="mb-10">
                        <div className="flex items-center gap-4 mb-8">
                          <div className={`w-1 h-12 rounded-full bg-${layer?.color}-500`}></div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-light text-foreground mb-2">
                              Section 1 · KPI Scorecards
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Key performance indicators for STC ITGPRC Operations - SAMA ITGF compliance metrics and trends
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                          {(() => {
                            // Get dynamic data based on current selections
                            const currentData = dashboardData[activeDashboardTab]?.[activeSecondLayerTab] || 
                                             dashboardData[activeDashboardTab] || 
                                             config?.kpis || [];
                            const kpisToShow = currentData.kpis || currentData || [];
                            
                            return kpisToShow.map((kpi, index) => (
                        <KPICard
                          key={index}
                          title={kpi?.title}
                          value={kpi?.value}
                          unit={kpi?.unit}
                          trend={kpi?.trend}
                          trendValue={kpi?.trendValue}
                          threshold={kpi?.threshold}
                          description={kpi?.description}
                          icon={kpi?.icon}
                          sparklineData={kpi?.sparklineData}
                          target={kpi?.target} />
                            ));
                          })()}
                        </div>
                      </div>

                      {/* Section 2 - Service Trends */}
                      <div className="mb-10">
                        <div className="flex items-center gap-4 mb-8">
                          <div className={`w-1 h-12 rounded-full bg-${layer?.color}-500`}></div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-light text-foreground mb-2">
                              Section 2 · Service Trends and Alerts
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Live view of STC delivery signals with automated SAMA ITGF control alerts for emerging gaps
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
                          {/* Main Visual - Comparative maturity chart */}
                          <div className="xl:col-span-8">
                            <div className="bg-white border border-border rounded-xl p-6 h-full flex flex-col">
                              <div className="flex items-center justify-between mb-6 flex-shrink-0">
                                <div>
                                  <h4 className="text-base font-medium text-foreground">Comparative Domain Maturity</h4>
                                  <p className="text-xs text-muted-foreground">
                                    Distribution of Information Technology domains across L1-L5 SAMA ITGF controls.
                                  </p>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Icon name="BarChart3" size={14} />
                                  <span>Live Data</span>
                                </div>
                              </div>
                              
                              <DomainMaturityChart />
                              
                              <p className="text-xs text-muted-foreground mt-4 text-center flex-shrink-0">
                                Hover bars to compare maturity depth by domain and level.
                              </p>
                            </div>
                          </div>
                          
                          {/* Alerts Panel */}
                          <div className="xl:col-span-4 h-full">
                            <SAMAControlAlerts />
                          </div>
                        </div>
                      </div>

                      {/* Section 3 - ITGF Overview */}
                      <div className="mb-10">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                          <div>
                            <h3 className="text-2xl font-light text-foreground">
                              Section 3 · SAMA ITGF Domain Overview
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              STC control-room snapshot: four SAMA ITGF domains per view with live streaming alerts.
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            <span>Live alerts syncing every 45 seconds</span>
                          </div>
                        </div>
                        <DomainComplianceGrid />
                      </div>

                      {/* Section 4 - Comparative Insights */}
                      <div className="mb-10">
                        <div className="flex items-center gap-4 mb-8">
                          <div className={`w-1 h-12 rounded-full bg-${layer?.color}-500`}></div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-light text-foreground mb-2">
                              Section 4 · Comparative Insights
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Trend analysis of domain maturity across SAMA ITGF controls from Jan 2024 through Jul 2025.
                            </p>
                          </div>
                        </div>
                        
                        <MaturityTrendGrid />
                      </div>

                      {/* AI Insights for this layer */}
                      <AIInsights
                      sectionTitle={`${layer?.label} Analytics`}
                      sectionData={config}
                      sectionType="descriptive" />
                    </div>);
                })()}
                          </div>

            </>);
            } else if (activeDashboardTab === 'operations' && activeSecondLayerTab === 'dashboard-2') {
              return (
                /* Dashboard 2 Dynamic Content */
                <div className="text-center py-20">
                  <Icon name="Construction" size={64} className="text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-foreground mb-2">Dashboard 2 - Provider Analytics</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Advanced provider performance analytics and insights.
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                      <Icon name="Users" size={16} />
                      <span>Active Tab: Operations</span>
                            </div>
                    <span className="mx-2">•</span>
                      <div className="flex items-center gap-2">
                      <Icon name="Layout" size={16} />
                      <span>Selected Dashboard: Dashboard 2</span>
                            </div>
                        </div>
                      </div>
              );
            } else if (activeDashboardTab === 'market') {
              return (
                /* Market Dashboard Dynamic Content */
                <div className="text-center py-20">
                  <Icon name="TrendingUp" size={64} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-foreground mb-2">Market Analytics Dashboard</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Market penetration, growth trends, and competitive analysis.
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                      <Icon name="TrendingUp" size={16} />
                      <span>Active Tab: Market</span>
                            </div>
                        </div>
                      </div>
              );
            } else if (activeDashboardTab === 'strategic') {
              return (
                /* Strategic Dashboard Dynamic Content */
                <div className="text-center py-20">
                  <Icon name="Target" size={64} className="text-purple-500 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-foreground mb-2">Strategic Planning Dashboard</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Strategic goals, long-term planning, and organizational objectives.
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                      <Icon name="Target" size={16} />
                      <span>Active Tab: Strategic</span>
                            </div>
                        </div>
                      </div>
              );
            } else {
              return (
                /* Default Placeholder */
          <div className="text-center py-20">
              <Icon name="Construction" size={64} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-foreground mb-2">Dashboard Under Development</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    The "{activeDashboardTab}" dashboard is currently being developed.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Users" size={16} />
                      <span>Active Tab: {activeDashboardTab}</span>
                </div>
                </div>
              </div>
              );
          }
          })()}
        </div>
      </main>
    </div>);

};

export default EJPOperationsDashboard;
