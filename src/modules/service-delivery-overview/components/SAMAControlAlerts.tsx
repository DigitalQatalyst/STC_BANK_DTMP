import React from 'react';
import Icon from '../../../components/AppIcon';

type Severity = 'critical' | 'warning' | 'positive';

interface ControlAlert {
  id: string;
  title: string;
  detail: string;
  domain: string;
  controlId: string;
  severity: Severity;
  lastUpdated: string;
}

const alertConfig: Record<
  Severity,
  {
    dot: string;
    badge: string;
    icon: string;
  }
> = {
  critical: {
    dot: 'bg-red-500',
    badge: 'bg-red-50 text-red-800 border-red-200',
    icon: 'AlertTriangle'
  },
  warning: {
    dot: 'bg-amber-400',
    badge: 'bg-amber-50 text-amber-800 border-amber-200',
    icon: 'AlertCircle'
  },
  positive: {
    dot: 'bg-emerald-500',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: 'ShieldCheck'
  }
};

const alerts: ControlAlert[] = [
  {
    id: 'alert-1',
    title: 'L3 Change authority pending',
    detail: 'CAB approval required for weekend deployment batch.',
    domain: 'System Change Management',
    controlId: 'SCM-12',
    severity: 'critical',
    lastUpdated: '2m ago'
  },
  {
    id: 'alert-2',
    title: 'New high risk finding',
    detail: 'Risk register needs executive acceptance for RM-08.',
    domain: 'IT Risk Management',
    controlId: 'RM-08',
    severity: 'critical',
    lastUpdated: '8m ago'
  },
  {
    id: 'alert-3',
    title: 'Evidence refresh scheduled',
    detail: 'Control GL-03 board packs must be uploaded for Q4.',
    domain: 'IT Governance & Leadership',
    controlId: 'GL-03',
    severity: 'warning',
    lastUpdated: '15m ago'
  },
  {
    id: 'alert-4',
    title: 'Stabilized operations',
    detail: 'Automated runbooks reduced L2 operations backlog.',
    domain: 'IT Operation Management',
    controlId: 'OM-05',
    severity: 'positive',
    lastUpdated: '22m ago'
  }
];

const SAMAControlAlerts: React.FC = () => {
  return (
    <div className="bg-white border border-border rounded-xl p-6 h-full flex flex-col">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h4 className="text-base font-medium text-foreground">Current SAMA ITGF Alerts</h4>
          <p className="text-xs text-muted-foreground">
            Real-time severity view of control performance across domains.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {alerts.map((alert) => {
          const config = alertConfig[alert.severity];
          return (
            <div key={alert.id} className="border border-border rounded-lg p-3 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-3">
                <span className={`w-2 h-2 rounded-full mt-1.5 ${config.dot}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-foreground truncate">{alert.title}</p>
                    <span className="text-[11px] text-muted-foreground whitespace-nowrap">{alert.lastUpdated}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{alert.detail}</p>
                  <div className="flex items-center gap-2 flex-wrap text-[11px]">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border bg-muted/60">
                      <Icon name="Layers" size={12} />
                      {alert.domain}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border ${config.badge}`}>
                      <Icon name={config.icon} size={12} />
                      {alert.controlId}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 mt-4 border-t border-border text-xs text-muted-foreground flex items-center gap-2">
        <Icon name="CheckCircle2" size={16} className="text-emerald-500" />
        <span>Automation guardrails monitoring 62 SAMA ITGF controls.</span>
      </div>
    </div>
  );
};

export default SAMAControlAlerts;

