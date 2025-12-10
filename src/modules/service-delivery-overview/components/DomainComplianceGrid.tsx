import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import Icon from '../../../components/AppIcon';

type AlertType = 'critical' | 'warning' | 'info';

interface DomainSegment {
  id: string;
  label: string;
  description: string;
  value: number;
  displayValue: string;
  color: string;
}

interface DomainAlert {
  id: string;
  type: AlertType;
  message: string;
  timestamp: Date;
}

interface DomainCard {
  id: string;
  code: string;
  title: string;
  headerColor: string;
  accentColor: string;
  segments: DomainSegment[];
  alerts: DomainAlert[];
  lastUpdated: Date;
}

interface DomainSeed {
  id: string;
  code: string;
  title: string;
  headerColor: string;
  accentColor: string;
  segments: DomainSegment[];
  alerts: {
    type: AlertType;
    message: string;
    minutesAgo: number;
  }[];
  lastUpdatedMinutesAgo: number;
}

const domainSeedData: DomainSeed[] = [
  {
    id: 'd01',
    code: 'D01',
    title: 'IT Governance & Leadership',
    headerColor: '#35004d',
    accentColor: '#1784d4',
    segments: [
      {
        id: 'd01-l2',
        label: 'L2 (Repeatable; Informal)',
        description: 'Repeatable; Informal Control Set',
        value: 45.54,
        displayValue: '45.54%',
        color: '#1c9bf0'
      },
      {
        id: 'd01-l3',
        label: 'L3 (Structured; Formal; Deployed; Measured)',
        description: 'Structured; Formal; Deployed; Measured',
        value: 54.46,
        displayValue: '54.46%',
        color: '#2b003d'
      }
    ],
    alerts: [
      {
        type: 'warning',
        message: 'Leadership control evidence pending review',
        minutesAgo: 5
      },
      {
        type: 'info',
        message: 'Latest board sign-off received',
        minutesAgo: 25
      }
    ],
    lastUpdatedMinutesAgo: 3
  },
  {
    id: 'd02',
    code: 'D02',
    title: 'IT Risk Management',
    headerColor: '#35004d',
    accentColor: '#280040',
    segments: [
      {
        id: 'd02-l3',
        label: 'L3 (Structured; Formal; Deployed; Measured)',
        description: 'Structured; Formal; Deployed; Measured',
        value: 64,
        displayValue: '64',
        color: '#280040'
      }
    ],
    alerts: [
      {
        type: 'critical',
        message: 'Risk acceptance pending for 2 high findings',
        minutesAgo: 12
      }
    ],
    lastUpdatedMinutesAgo: 9
  },
  {
    id: 'd03',
    code: 'D03',
    title: 'IT Operation Management',
    headerColor: '#35004d',
    accentColor: '#1784d4',
    segments: [
      {
        id: 'd03-l2',
        label: 'L2 (Repeatable; Informal)',
        description: 'Repeatable; Informal Control Set',
        value: 8,
        displayValue: '8',
        color: '#1c9bf0'
      },
      {
        id: 'd03-l3',
        label: 'L3 (Structured; Formal; Deployed; Measured)',
        description: 'Structured; Formal; Deployed; Measured',
        value: 193,
        displayValue: '193',
        color: '#2b003d'
      }
    ],
    alerts: [
      {
        type: 'info',
        message: 'Automation scripts refreshed across NOC',
        minutesAgo: 18
      },
      {
        type: 'warning',
        message: 'Patch backlog exceeds weekly target',
        minutesAgo: 35
      }
    ],
    lastUpdatedMinutesAgo: 7
  },
  {
    id: 'd04',
    code: 'D04',
    title: 'System Change Management',
    headerColor: '#35004d',
    accentColor: '#1c9bf0',
    segments: [
      {
        id: 'd04-l2',
        label: 'L2 (Repeatable; Informal)',
        description: 'Repeatable; Informal Control Set',
        value: 28,
        displayValue: '28',
        color: '#1c9bf0'
      },
      {
        id: 'd04-l3',
        label: 'L3 (Structured; Formal; Deployed; Measured)',
        description: 'Structured; Formal; Deployed; Measured',
        value: 109,
        displayValue: '109',
        color: '#2b003d'
      }
    ],
    alerts: [
      {
        type: 'warning',
        message: 'Emergency change in progress for core switch',
        minutesAgo: 4
      },
      {
        type: 'info',
        message: 'CAB approved weekend deployment batch',
        minutesAgo: 30
      }
    ],
    lastUpdatedMinutesAgo: 2
  }
];

const createInitialDomains = (): DomainCard[] => {
  const now = Date.now();

  return domainSeedData.map((domain) => ({
    id: domain.id,
    code: domain.code,
    title: domain.title,
    headerColor: domain.headerColor,
    accentColor: domain.accentColor,
    segments: domain.segments,
    alerts: domain.alerts.map((alert, index) => ({
      id: `${domain.id}-${index}`,
      type: alert.type,
      message: alert.message,
      timestamp: new Date(now - alert.minutesAgo * 60 * 1000)
    })),
    lastUpdated: new Date(now - domain.lastUpdatedMinutesAgo * 60 * 1000)
  }));
};

const alertTemplates: { type: AlertType; message: string }[] = [
  { type: 'critical', message: 'Control gap escalated for executive attention' },
  { type: 'warning', message: 'Additional evidence requested by auditor' },
  { type: 'info', message: 'Remediation milestone completed successfully' },
  { type: 'warning', message: 'Upcoming CAB session requires change summary' },
  { type: 'info', message: 'Training completed for responsible control owners' }
];

const formatRelativeTime = (timestamp: Date) => {
  const diff = Date.now() - timestamp.getTime();
  const minutes = Math.floor(diff / (1000 * 60));

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
};

const getAlertStyle = (type: AlertType) => {
  switch (type) {
    case 'critical':
      return 'border-red-200 bg-red-50 text-red-800';
    case 'warning':
      return 'border-amber-200 bg-amber-50 text-amber-800';
    default:
      return 'border-blue-200 bg-blue-50 text-blue-800';
  }
};

const DomainComplianceGrid: React.FC = () => {
  const [domains, setDomains] = useState<DomainCard[]>(() => createInitialDomains());

  useEffect(() => {
    const interval = setInterval(() => {
      setDomains((prev) => {
        if (!prev.length) return prev;

        const targetIndex = Math.floor(Math.random() * prev.length);
        const template = alertTemplates[Math.floor(Math.random() * alertTemplates.length)];
        const updatedDomains = [...prev];
        const domainToUpdate = updatedDomains[targetIndex];

        updatedDomains[targetIndex] = {
          ...domainToUpdate,
          alerts: [
            {
              id: `${domainToUpdate.id}-${Date.now()}`,
              type: template.type,
              message: template.message,
              timestamp: new Date()
            },
            ...domainToUpdate.alerts
          ].slice(0, 3),
          lastUpdated: new Date()
        };

        return updatedDomains;
      });
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  const getChartOptions = (segments: DomainSegment[]) => ({
    tooltip: {
      trigger: 'item',
      formatter: ({ name, value, percent }: { name: string; value: number; percent: number }) =>
        `${name}<br/>${value} (${percent?.toFixed(1)}%)`
    },
    series: [
      {
        type: 'pie',
        radius: ['60%', '85%'],
        avoidLabelOverlap: true,
        hoverAnimation: true,
        label: { show: false },
        labelLine: { show: false },
        itemStyle: {
          borderRadius: 6,
          borderColor: '#fff',
          borderWidth: 3
        },
        data: segments.map((segment) => ({
          value: segment.value,
          name: segment.label,
          itemStyle: { color: segment.color }
        }))
      }
    ]
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {domains.map((domain) => (
        <div
          key={domain.id}
          className="bg-white border border-border rounded-xl shadow-sm overflow-hidden flex flex-col"
        >
          <div
            className="px-4 py-2 flex items-center justify-between text-white text-sm font-semibold"
            style={{ backgroundColor: domain.headerColor }}
          >
            <span>
              {domain.code}: {domain.title}
            </span>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </div>
          </div>

          <div className="p-5 flex-1 flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="lg:w-1/2 flex items-center justify-center">
                <ReactECharts
                  option={getChartOptions(domain.segments)}
                  style={{ height: 200, width: '100%' }}
                  opts={{ renderer: 'svg' }}
                />
              </div>

              <div className="flex-1 space-y-3">
                {domain.segments.map((segment) => (
                  <div key={segment.id} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: segment.color }}
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{segment.label}</p>
                        <p className="text-xs text-muted-foreground truncate">{segment.description}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-foreground">{segment.displayValue}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-dashed border-border pt-4">
              <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="BellRing" size={14} />
                  <span>Live alerts</span>
                </div>
                <span>Updated {formatRelativeTime(domain.lastUpdated)}</span>
              </div>

              {domain.alerts.length > 0 ? (
                <div className="space-y-2">
                  {domain.alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg border text-xs ${getAlertStyle(alert.type)}`}
                    >
                      <Icon
                        name={
                          alert.type === 'critical' ? 'AlertTriangle' : alert.type === 'warning' ? 'AlertCircle' : 'Info'
                        }
                        size={14}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{alert.message}</p>
                        <p className="text-[11px] opacity-80">{formatRelativeTime(alert.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon name="CheckCircle" size={14} className="text-emerald-500" />
                  <span>No active alerts for this domain</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DomainComplianceGrid;

