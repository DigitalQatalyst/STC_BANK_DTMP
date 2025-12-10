import React, { useEffect, useState } from 'react';
import Icon from '../../components/AppIcon';
import Select from '../../components/ui/Select';
import PageTabs from '../../components/PageTabs';
import KPICard from './components/KPICard';

type SummaryTrend = 'up' | 'down' | 'neutral';
type SummaryThreshold = 'excellent' | 'good' | 'normal' | 'warning' | 'critical';
type SummaryTargetStatus = 'achieved' | 'approaching' | 'on-track' | 'at-risk' | 'critical';

interface ControlSummaryCard {
  title: string;
  value: string;
  unit?: string;
  trend: SummaryTrend;
  trendValue: string;
  icon: string;
  threshold: SummaryThreshold;
  target?: string;
  targetStatus?: SummaryTargetStatus;
  description: string;
  sparklineData?: number[];
}

const controlFilterDefaults = {
  domain: 'all',
  subDomain: 'all',
  controlOwner: 'all',
  controlOwnerType: 'all',
  maturityLevel: 'all',
  assessmentDate: 'all'
};

const controlFilterOptions: Record<ControlFilterKey, { value: string; label: string }[]> = {
  domain: [
    { value: 'all', label: 'All Domains' },
    { value: 'information-technology-governance', label: 'Information Technology Governance & Leadership' },
    { value: 'information-technology-operations', label: 'Information Technology Operation Management' },
    { value: 'information-technology-risk', label: 'Information Technology Risk Management' }
  ],
  subDomain: [
    { value: 'all', label: 'All Sub Domains' },
    { value: 'governance', label: 'Governance Oversight' },
    { value: 'architecture', label: 'Enterprise Architecture' },
    { value: 'operations', label: 'Operations Delivery' },
    { value: 'change', label: 'Change Management' }
  ],
  controlOwner: [
    { value: 'all', label: 'All Owners' },
    { value: 'cio-office', label: 'CIO Office' },
    { value: 'risk-compliance', label: 'Risk & Compliance' },
    { value: 'operations', label: 'Operations' },
    { value: 'audit', label: 'Internal Audit' }
  ],
  controlOwnerType: [
    { value: 'all', label: 'All Owner Types' },
    { value: 'business', label: 'Business' },
    { value: 'technology', label: 'Technology' },
    { value: 'shared', label: 'Shared Services' }
  ],
  maturityLevel: [
    { value: 'all', label: 'All Levels' },
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

const controlFilterDefinitions: Array<{
  key: ControlFilterKey;
  label: string;
  icon: string;
  accent: string;
}> = [
  { key: 'domain', label: 'Domain', icon: 'Layers', accent: 'text-indigo-600' },
  { key: 'subDomain', label: 'Sub Domain', icon: 'Grid', accent: 'text-blue-600' },
  { key: 'controlOwner', label: 'Controls', icon: 'Shield', accent: 'text-purple-600' },
  { key: 'controlOwnerType', label: 'Assessment Owner', icon: 'UserCheck', accent: 'text-emerald-600' },
  { key: 'maturityLevel', label: 'Maturity Rating', icon: 'Star', accent: 'text-amber-600' },
  { key: 'assessmentDate', label: 'Assessment Date', icon: 'Calendar', accent: 'text-rose-600' }
];

const controlSummaryCards: ControlSummaryCard[] = [
  {
    title: 'Total Controls',
    value: '514',
    unit: 'controls',
    trend: 'neutral',
    trendValue: '0',
    icon: 'Layers',
    threshold: 'good',
    description: 'Published in STC ITGPRC register.',
    sparklineData: [480, 486, 495, 504, 514, 514]
  },
  {
    title: 'L3 Matured Controls',
    value: '427',
    unit: 'controls',
    trend: 'up',
    trendValue: '+12',
    icon: 'TrendingUp',
    threshold: 'excellent',
    description: 'Structured and measured controls.',
    sparklineData: [380, 392, 401, 412, 420, 427]
  },
  {
    title: 'L4 Matured Controls',
    value: '0',
    unit: 'controls',
    trend: 'neutral',
    trendValue: '0',
    icon: 'Activity',
    threshold: 'warning',
    description: 'Managed state controls progressing to automation.',
    sparklineData: [0, 0, 0, 0, 0, 0]
  },
  {
    title: 'L5 Matured Controls',
    value: '0',
    unit: 'controls',
    trend: 'neutral',
    trendValue: '0',
    icon: 'Award',
    threshold: 'critical',
    description: 'Optimized controls requiring innovation focus.',
    sparklineData: [0, 0, 0, 0, 0, 0]
  },
  {
    title: 'L3 Maturity Rate',
    value: '83.07',
    unit: '%',
    trend: 'up',
    trendValue: '+4.1%',
    icon: 'Percent',
    threshold: 'good',
    description: 'Of assessed SAMA ITGF controls.',
    sparklineData: [72, 74, 76, 79, 81, 83.07]
  }
];

const improvementActions = [
  {
    samaId: '3.1.1-1',
    domain: 'Information Technology Governance & Leadership',
    subDomain: 'Information Technology Governance',
    consideration: 'Member organizations should establish an ITSC and be mandated by the board.',
    maturityRating: 'L3 (Structured; Formal; Deployed; Measured)',
    actionPlan: 'ITSC roll-out in place; review policy, optimize the procedure, and periodically review the exhibit.'
  },
  {
    samaId: '3.1.1-10',
    domain: 'Information Technology Governance & Leadership',
    subDomain: 'Information Technology Governance',
    consideration: 'Define enterprise architecture reflecting business processes and supporting technology layers.',
    maturityRating: 'L2 (Repeatable; Informal)',
    actionPlan: 'Core EA process defined; periodically review policy, develop the procedure, and optimize the exhibit.'
  },
  {
    samaId: '3.1.1-11',
    domain: 'Information Technology Governance & Leadership',
    subDomain: 'Information Technology Governance',
    consideration: 'Define enterprise application architect role to manage application portfolio change.',
    maturityRating: 'L2 (Repeatable; Informal)',
    actionPlan: 'Establish and roll out EA process control by optimizing policy, developing procedure, optimizing exhibit.'
  },
  {
    samaId: '3.1.1-12.a',
    domain: 'Information Technology Governance & Leadership',
    subDomain: 'Information Technology Governance',
    consideration: 'Document roles and responsibilities for the IT function and related controls.',
    maturityRating: 'L2 (Repeatable; Informal)',
    actionPlan: 'Finalize documentation, socialize changes, and embed governance cadence with quarterly review.'
  }
];

const roadmapKPIs: ControlSummaryCard[] = [
  {
    title: 'Project Streams',
    value: '4',
    unit: 'streams',
    trend: 'neutral',
    trendValue: '0',
    icon: 'Share2',
    threshold: 'good',
    target: '4',
    targetStatus: 'on-track',
    description: 'Across compliance roadmap workstreams.',
    sparklineData: [3, 3, 4, 4, 4, 4]
  },
  {
    title: 'Total Projects',
    value: '25',
    unit: 'projects',
    trend: 'up',
    trendValue: '+5',
    icon: 'FolderKanban',
    threshold: 'good',
    target: '30',
    targetStatus: 'approaching',
    description: 'Tracked in delivery office.',
    sparklineData: [18, 19, 21, 23, 25, 25]
  },
  {
    title: 'Projects In Progress',
    value: '6',
    unit: 'projects',
    trend: 'up',
    trendValue: '+2',
    icon: 'Activity',
    threshold: 'excellent',
    target: '6',
    targetStatus: 'achieved',
    description: 'Actively resourced delivery items.',
    sparklineData: [3, 4, 4, 5, 6, 6]
  },
  {
    title: 'Projects Planned',
    value: '19',
    unit: 'projects',
    trend: 'down',
    trendValue: '-1',
    icon: 'CalendarClock',
    threshold: 'normal',
    target: '15',
    targetStatus: 'approaching',
    description: 'Awaiting execution window.',
    sparklineData: [20, 20, 19, 19, 18, 19]
  }
];

type TaskRiskLevel = 'on-track' | 'watch' | 'at-risk';

interface RoadmapTask {
  name: string;
  lead: string;
  status: 'planned' | 'in-progress' | 'complete';
  startDate: string;
  endDate: string;
  progress: number;
  actualStartDate?: string;
  actualEndDate?: string;
  riskLevel?: TaskRiskLevel;
  milestone?: string;
  dependency?: string;
}

interface RoadmapStream {
  stream: string;
  tasks: RoadmapTask[];
}

const roadmapStreams: RoadmapStream[] = [
  {
    stream: 'Stream 01: DCM Execution 1 (SCB ITGF L3)',
    tasks: [
      {
        name: 'Audit & Develop Controls (L3)',
        lead: 'Lead - IT Strategy and Governance',
        status: 'complete',
        startDate: '2020-10-01',
        endDate: '2021-04-30',
        actualStartDate: '2020-09-20',
        actualEndDate: '2021-03-18',
        progress: 100,
        riskLevel: 'on-track',
        milestone: 'Control Catalog Baseline'
      },
      {
        name: 'Plan Operations Change (L3)',
        lead: 'Lead - IT Strategy and Governance',
        status: 'complete',
        startDate: '2020-10-01',
        endDate: '2021-02-28',
        actualStartDate: '2020-10-05',
        actualEndDate: '2021-02-10',
        progress: 100,
        riskLevel: 'on-track',
        milestone: 'Ops Playbook Signed'
      },
      {
        name: 'Execute Operational Change (Digital Delivery)',
        lead: 'Lead - Digital Delivery',
        status: 'in-progress',
        startDate: '2021-03-01',
        endDate: '2022-11-30',
        actualStartDate: '2021-02-20',
        progress: 86,
        riskLevel: 'on-track',
        milestone: 'Digital Factory Go-Live'
      },
      {
        name: 'Execute Operational Change (IT Strategy & Gov.)',
        lead: 'Lead - IT Strategy and Governance',
        status: 'in-progress',
        startDate: '2021-04-01',
        endDate: '2023-06-30',
        progress: 64,
        riskLevel: 'watch',
        dependency: 'Digital Delivery outputs',
        milestone: 'Governance Ops Launch'
      },
      {
        name: 'Execute Operational Change (Service Development)',
        lead: 'Lead - Service Development',
        status: 'in-progress',
        startDate: '2021-09-01',
        endDate: '2023-12-15',
        progress: 48,
        riskLevel: 'at-risk',
        dependency: 'Strategy & Gov.',
        milestone: 'Service Blueprint Pilot'
      },
      {
        name: 'Execute Operational Change (IT Infrastructure)',
        lead: 'Lead - IT Infrastructure',
        status: 'planned',
        startDate: '2024-03-01',
        endDate: '2024-12-31',
        progress: 5,
        riskLevel: 'watch',
        dependency: 'Service Development',
        milestone: 'Hybrid Cloud Ready'
      },
      {
        name: 'Execute Operational Change (Operations Automation)',
        lead: 'Lead - Automation Engineering',
        status: 'planned',
        startDate: '2025-02-01',
        endDate: '2025-12-15',
        progress: 0,
        riskLevel: 'on-track',
        dependency: 'IT Infrastructure readiness',
        milestone: 'Automation Release 1'
      }
    ]
  }
];

const addMonths = (date: Date, months: number): Date => {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
};

const getRoadmapTimelineRange = (streams: RoadmapStream[]) => {
  const allDates = streams.flatMap((stream) =>
    stream.tasks.flatMap((task) =>
      [task.startDate, task.endDate, task.actualEndDate].filter((value): value is string => Boolean(value))
    )
  );
  if (!allDates.length) {
    const now = new Date();
    return { start: addMonths(now, -3), end: addMonths(now, 3) };
  }

  const timestamps = allDates.map((date) => new Date(date).getTime());
  const start = new Date(Math.min(...timestamps));
  const end = new Date(Math.max(...timestamps));

  return {
    start: addMonths(start, -1),
    end: addMonths(end, 1)
  };
};

const generateTimelineTicks = (start: Date, end: Date, desiredTickCount = 5) => {
  const ticks: { label: string; date: string }[] = [];
  const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const step = Math.max(1, Math.round(totalMonths / desiredTickCount));
  const cursor = new Date(start);
  cursor.setDate(1);

  while (cursor <= end) {
    ticks.push({
      label: cursor.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      date: cursor.toISOString()
    });
    cursor.setMonth(cursor.getMonth() + step);
  }

  if (ticks[ticks.length - 1]?.date !== end.toISOString()) {
    ticks.push({
      label: end.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      date: end.toISOString()
    });
  }

  return ticks;
};

const roadmapTimelineRange = getRoadmapTimelineRange(roadmapStreams);
const timelineTicks = generateTimelineTicks(roadmapTimelineRange.start, roadmapTimelineRange.end);

const getTimelinePosition = (date: string | Date): number => {
  const targetTime = typeof date === 'string' ? new Date(date).getTime() : date.getTime();
  const duration = roadmapTimelineRange.end.getTime() - roadmapTimelineRange.start.getTime();
  if (duration <= 0) return 0;
  const percentage = ((targetTime - roadmapTimelineRange.start.getTime()) / duration) * 100;
  return Math.min(100, Math.max(0, percentage));
};

const formatTimelineDate = (date: string): string =>
  new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

type ControlFilterKey = keyof typeof controlFilterDefaults;

const statusColors: Record<string, string> = {
  planned: 'bg-purple-400',
  'in-progress': 'bg-emerald-400',
  complete: 'bg-blue-500'
};
const statusTextColors: Record<RoadmapTask['status'], string> = {
  planned: 'text-purple-600 bg-purple-50',
  'in-progress': 'text-emerald-600 bg-emerald-50',
  complete: 'text-blue-600 bg-blue-50'
};
const statusLabels: Record<RoadmapTask['status'], string> = {
  planned: 'Planned',
  'in-progress': 'In Progress',
  complete: 'Completed'
};

type ScheduleState = 'ahead' | 'tracking' | 'behind';

const scheduleProgressColors: Record<ScheduleState, string> = {
  ahead: 'bg-gradient-to-r from-emerald-400 to-emerald-500',
  tracking: 'bg-gradient-to-r from-blue-400 to-blue-500',
  behind: 'bg-gradient-to-r from-rose-400 to-rose-500'
};

const scheduleDeltaTextColors: Record<ScheduleState, string> = {
  ahead: 'text-emerald-600',
  tracking: 'text-slate-500',
  behind: 'text-rose-600'
};

const riskBadgeColors: Record<TaskRiskLevel, string> = {
  'on-track': 'text-emerald-600 bg-emerald-50',
  watch: 'text-amber-600 bg-amber-50',
  'at-risk': 'text-rose-600 bg-rose-50'
};

const riskLabels: Record<TaskRiskLevel, string> = {
  'on-track': 'On Track',
  watch: 'Watch',
  'at-risk': 'At Risk'
};

const clampPercentage = (value: number): number => Math.min(100, Math.max(0, value));

const getExpectedProgress = (task: RoadmapTask, referenceDate: Date): number => {
  if (task.status === 'planned') return 0;
  const start = new Date(task.startDate).getTime();
  const end = new Date(task.endDate).getTime();
  const now = referenceDate.getTime();

  if (end <= start) return task.progress;
  if (now <= start) return 0;
  if (now >= end) return 100;

  return clampPercentage(((now - start) / (end - start)) * 100);
};

const getScheduleDelta = (task: RoadmapTask, referenceDate: Date): number =>
  Math.round(task.progress - getExpectedProgress(task, referenceDate));

const getScheduleState = (delta: number): ScheduleState => {
  if (delta <= -10) return 'behind';
  if (delta >= 5) return 'ahead';
  return 'tracking';
};

const describeScheduleDelta = (delta: number): string => {
  if (delta > 0) return `+${delta}% ahead`;
  if (delta < 0) return `${delta}% behind`;
  return 'On schedule';
};

const OperationsControlStatusPage = (): React.JSX.Element => {
  const [controlFilters, setControlFilters] = useState({ ...controlFilterDefaults });
  const [currentTime, setCurrentTime] = useState(new Date());
  const liveTimelinePosition = getTimelinePosition(currentTime);

  const updateControlFilter = (key: ControlFilterKey, value: string) => {
    setControlFilters((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-700">STC Bank</span>
          <h1 className="text-3xl font-light text-foreground">STC ITGPRC - Operation Control Status & Ownership</h1>
          <p className="text-sm text-muted-foreground max-w-4xl">
            This report shows the improvement actions to be taken by STC based on the audit conducted on SAMA ITGF controls.
          </p>
          <p className="text-xs text-muted-foreground">Last Update: May 2025</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <div className="mb-8">
          <PageTabs />
        </div>
        <section className="space-y-8">
          <div className="bg-white border border-border rounded-3xl p-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {controlFilterDefinitions.map((filter) => (
                <div key={filter.key} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Icon name={filter.icon} size={18} className={filter.accent} />
                    <span className="text-sm font-semibold text-foreground">{filter.label}</span>
                  </div>
                  <Select
                    value={controlFilters[filter.key]}
                    onChange={(value) => updateControlFilter(filter.key, value)}
                    options={controlFilterOptions[filter.key]}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-1 h-12 rounded-full bg-blue-500" />
              <div>
                <p className="text-base font-light text-foreground">Section 1 · KPI Scorecards</p>
                <p className="text-sm text-muted-foreground">
                  Key performance indicators for SAMA ITGF compliance maturity.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {controlSummaryCards.map((card) => (
                <KPICard
                  key={card.title}
                  title={card.title}
                  value={card.value}
                  unit={card.unit}
                  trend={card.trend}
                  trendValue={card.trendValue}
                  description={card.description}
                  icon={card.icon}
                  threshold={card.threshold}
                  target={card.target}
                  targetStatus={card.targetStatus}
                  sparklineData={card.sparklineData}
                />
              ))}
            </div>

            <div className="bg-white border border-border rounded-2xl shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-6 py-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">Improvement Actions to be taken by STC</p>
                  <p className="text-xs text-muted-foreground">Prioritized remediation backlog aligned with STC owners.</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <Icon name="AlertTriangle" size={14} className="text-amber-500" />
                  <span>Live remediation feed</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted/40">
                    <tr>
                      {['SAMA ID', 'Domain', 'Sub Domain', 'Control Consideration', 'Maturity Rating', 'Implementation Action Plan'].map((heading) => (
                        <th
                          key={heading}
                          className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-white text-sm">
                    {improvementActions.map((action) => (
                      <tr key={action.samaId} className="hover:bg-muted/40">
                        <td className="px-4 py-4 font-semibold">{action.samaId}</td>
                        <td className="px-4 py-4">{action.domain}</td>
                        <td className="px-4 py-4">{action.subDomain}</td>
                        <td className="px-4 py-4">{action.consideration}</td>
                        <td className="px-4 py-4">
                          <span className="inline-flex rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
                            {action.maturityRating}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-muted-foreground">{action.actionPlan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white border border-border rounded-2xl shadow-sm">
          <div className="border-b border-border px-6 py-6 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-700">STC Bank</span>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <div>
                <h2 className="text-2xl font-light text-foreground">SAMA ITGF - IT Roadmap</h2>
                <p className="text-sm text-muted-foreground max-w-3xl">
                  This report presents a view on the progress of SAMA ITGF compliance projects and resources involved.
                </p>
              </div>
              <div className="text-xs text-muted-foreground text-right">
                <p className="font-semibold text-foreground">SAMA Compliance Roadmap</p>
                <p>Last Update: May 2025</p>
              </div>
            </div>
          </div>

          <div className="px-6 py-8 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {roadmapKPIs.map((card) => (
                <KPICard
                  key={card.title}
                  title={card.title}
                  value={card.value}
                  unit={card.unit}
                  trend={card.trend}
                  trendValue={card.trendValue}
                  description={card.description}
                  icon={card.icon}
                  threshold={card.threshold}
                  target={card.target}
                  targetStatus={card.targetStatus}
                  sparklineData={card.sparklineData}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" /> In Progress
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-purple-400" /> Planned
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-blue-500" /> Completed
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={14} />
                <span>Live timeline · Updated {currentTime.toLocaleTimeString()}</span>
              </div>
            </div>

            <div className="space-y-8">
              {roadmapStreams.map((stream) => (
                <div key={stream.stream} className="rounded-2xl border border-border bg-white p-6 space-y-6 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{stream.stream}</p>
                      <p className="text-xs text-muted-foreground">
                        Tracking deliverables against roadmap milestones.
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <Icon name="Activity" size={14} />
                      <span>Current marker at {currentTime.toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {stream.tasks.map((task) => {
                      const start = getTimelinePosition(task.startDate);
                      const end = getTimelinePosition(task.endDate);
                      const width = Math.max(Math.min(end - start, 100 - start), 2);
                      const progressWidth =
                        task.progress <= 0
                          ? 0
                          : Math.min(width, Math.max(2, (width * clampPercentage(task.progress)) / 100));
                      const scheduleDelta = getScheduleDelta(task, currentTime);
                      const scheduleState = getScheduleState(scheduleDelta);
                      const milestonePosition = Math.min(end, 98);
                      return (
                        <div key={task.name} className="space-y-3">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="text-sm font-medium text-foreground">{task.name}</p>
                              <p className="text-xs text-muted-foreground">{task.lead}</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`text-xs font-semibold px-3 py-1 rounded-full ${statusTextColors[task.status]}`}
                              >
                                {statusLabels[task.status]}
                              </span>
                              {task.riskLevel && (
                                <span
                                  className={`text-xs font-semibold px-2 py-1 rounded-full ${riskBadgeColors[task.riskLevel]}`}
                                >
                                  {riskLabels[task.riskLevel]}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="relative h-16 rounded-2xl bg-slate-100 overflow-hidden">
                            <div
                              className={`absolute inset-y-4 rounded-full opacity-70 ${statusColors[task.status]}`}
                              style={{ left: `${start}%`, width: `${width}%` }}
                            />
                            {progressWidth > 0 && (
                              <div
                                className={`absolute inset-y-4 rounded-full shadow-sm ${scheduleProgressColors[scheduleState]}`}
                                style={{ left: `${start}%`, width: `${progressWidth}%` }}
                              />
                            )}
                            {task.milestone && (
                              <div
                                className="absolute flex flex-col items-center text-[10px] text-indigo-600"
                                style={{ left: `${milestonePosition}%`, top: '4px', transform: 'translateX(-50%)' }}
                              >
                                <span className="w-3 h-3 rounded-full bg-indigo-500 border-2 border-white shadow-sm" />
                                <span className="mt-1 font-semibold text-center px-1">{task.milestone}</span>
                              </div>
                            )}
                            <div
                              className="absolute top-0 bottom-0 w-0.5 bg-blue-600"
                              style={{ left: `${liveTimelinePosition}%` }}
                            />
                            <div className="absolute inset-x-0 bottom-2 flex justify-between text-[11px] text-muted-foreground px-3">
                              <span>{formatTimelineDate(task.startDate)}</span>
                              <span>{formatTimelineDate(task.endDate)}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground px-1">
                            <span>
                              Progress{' '}
                              <span className="text-foreground font-semibold">{task.progress}%</span>
                            </span>
                            <span className={`font-semibold ${scheduleDeltaTextColors[scheduleState]}`}>
                              {describeScheduleDelta(scheduleDelta)}
                            </span>
                            {task.actualStartDate && task.actualStartDate !== task.startDate && (
                              <span>Actual start {formatTimelineDate(task.actualStartDate)}</span>
                            )}
                            {task.actualEndDate && (
                              <span>Actual completion {formatTimelineDate(task.actualEndDate)}</span>
                            )}
                            {task.dependency && <span>Dependency: {task.dependency}</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-[11px] text-muted-foreground flex justify-between px-1">
                    {timelineTicks.map((tick) => (
                      <span key={tick.date}>{tick.label}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OperationsControlStatusPage;
