import React from 'react';
import ReactECharts from 'echarts-for-react';

type LevelKey = 'l1' | 'l2' | 'l3' | 'l4' | 'l5';

interface DomainMaturityRow {
  domain: string;
  l1: number;
  l2: number;
  l3: number;
  l4: number;
  l5: number;
}

const domainMaturityData: DomainMaturityRow[] = [
  {
    domain: 'IT Governance & Leadership',
    l1: 6,
    l2: 18,
    l3: 32,
    l4: 8,
    l5: 2
  },
  {
    domain: 'IT Operation Management',
    l1: 4,
    l2: 12,
    l3: 28,
    l4: 14,
    l5: 6
  },
  {
    domain: 'IT Risk Management',
    l1: 2,
    l2: 10,
    l3: 24,
    l4: 18,
    l5: 10
  },
  {
    domain: 'System Change Management',
    l1: 3,
    l2: 9,
    l3: 21,
    l4: 11,
    l5: 5
  }
];

const maturityLevels: { key: LevelKey; label: string; color: string }[] = [
  { key: 'l1', label: 'L1 - Initial', color: '#A186FF' },
  { key: 'l2', label: 'L2 - Repeatable', color: '#5ED0FF' },
  { key: 'l3', label: 'L3 - Structured', color: '#3D0A60' },
  { key: 'l4', label: 'L4 - Managed', color: '#8F3FFF' },
  { key: 'l5', label: 'L5 - Optimized', color: '#15BD7E' }
];

const DomainMaturityChart: React.FC = () => {
  const option = {
    color: maturityLevels.map((level) => level.color),
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: (params: any) => {
        const header = `<strong>${params[0]?.name}</strong><br/>`;
        const rows = params
          ?.map(
            (item: any) =>
              `<span style="display:inline-block;margin-right:6px;border-radius:50%;width:8px;height:8px;background:${item.color};"></span>${item.seriesName}: ${item.value}`
          )
          ?.join('<br/>');
        return `${header}${rows}`;
      }
    },
    grid: {
      left: '2%',
      right: '2%',
      bottom: '10%',
      containLabel: true
    },
    legend: {
      top: 0,
      textStyle: {
        color: '#4A4A68'
      }
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        color: '#6B7280'
      },
      splitLine: {
        lineStyle: {
          color: '#E5E7EB'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: domainMaturityData.map((item) => item.domain),
      axisLabel: {
        color: '#111827',
        formatter: (value: string) => value.replace('Information Technology ', 'IT ')
      }
    },
    series: maturityLevels.map((level) => ({
      name: level.label,
      type: 'bar',
      stack: 'total',
      barWidth: 18,
      label: {
        show: false
      },
      emphasis: {
        focus: 'series'
      },
      data: domainMaturityData.map((item) => item[level.key])
    }))
  };

  const totalControls = domainMaturityData.reduce<Record<LevelKey, number>>(
    (acc, item) => ({
      l1: acc.l1 + item.l1,
      l2: acc.l2 + item.l2,
      l3: acc.l3 + item.l3,
      l4: acc.l4 + item.l4,
      l5: acc.l5 + item.l5
    }),
    { l1: 0, l2: 0, l3: 0, l4: 0, l5: 0 }
  );

  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="min-h-[380px]">
        <ReactECharts option={option} style={{ height: 360 }} opts={{ renderer: 'svg' }} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
        {maturityLevels.map((level) => (
          <div
            key={level.key}
            className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/40 px-3 py-2"
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: level.color }}></span>
            <div className="flex flex-col">
              <span className="font-semibold text-foreground">{totalControls[level.key]}</span>
              <span className="text-muted-foreground text-[11px] tracking-wide">{level.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DomainMaturityChart;
