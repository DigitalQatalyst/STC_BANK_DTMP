import React from 'react';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';

type TrendPoint = { period: string; value: number };

interface DomainTrend {
  id: string;
  title: string;
  color: string;
  max: number;
  points: TrendPoint[];
}

const domainTrends: DomainTrend[] = [
  {
    id: 'D01',
    title: 'IT Governance & Leadership',
    color: '#2f0050',
    max: 10,
    points: [
      { period: 'Jan 24', value: 7 },
      { period: 'Feb 24', value: 5 },
      { period: 'Mar 24', value: 6 },
      { period: 'Apr 24', value: 6 },
      { period: 'May 24', value: 8 },
      { period: 'Jul 24', value: 8 },
      { period: 'Sep 24', value: 3 },
      { period: 'Nov 24', value: 9 },
      { period: 'Jan 25', value: 2 },
      { period: 'Mar 25', value: 8 },
      { period: 'Apr 25', value: 3 },
      { period: 'May 25', value: 7 },
      { period: 'Jun 25', value: 6 },
      { period: 'Jul 25', value: 4 }
    ]
  },
  {
    id: 'D02',
    title: 'IT Risk Management',
    color: '#310055',
    max: 6,
    points: [
      { period: 'Jan 24', value: 4 },
      { period: 'Mar 24', value: 2 },
      { period: 'May 24', value: 4 },
      { period: 'Jun 24', value: 3 },
      { period: 'Aug 24', value: 4 },
      { period: 'Oct 24', value: 5 },
      { period: 'Nov 24', value: 6 },
      { period: 'Dec 24', value: 3 },
      { period: 'Jan 25', value: 2 },
      { period: 'Feb 25', value: 2 },
      { period: 'Mar 25', value: 1 },
      { period: 'Apr 25', value: 4 },
      { period: 'May 25', value: 5 },
      { period: 'Jun 25', value: 4 },
      { period: 'Jul 25', value: 3 }
    ]
  },
  {
    id: 'D03',
    title: 'IT Operation Management',
    color: '#2b0047',
    max: 25,
    points: [
      { period: 'Jan 24', value: 12 },
      { period: 'Feb 24', value: 11 },
      { period: 'Mar 24', value: 10 },
      { period: 'Apr 24', value: 23 },
      { period: 'May 24', value: 11 },
      { period: 'Jun 24', value: 9 },
      { period: 'Jul 24', value: 10 },
      { period: 'Aug 24', value: 9 },
      { period: 'Sep 24', value: 8 },
      { period: 'Nov 24', value: 7 },
      { period: 'Dec 24', value: 9 },
      { period: 'Jan 25', value: 15 },
      { period: 'Feb 25', value: 10 },
      { period: 'Mar 25', value: 13 },
      { period: 'May 25', value: 6 },
      { period: 'Jul 25', value: 11 }
    ]
  },
  {
    id: 'D04',
    title: 'System Change Management',
    color: '#32004a',
    max: 12,
    points: [
      { period: 'Jan 24', value: 9 },
      { period: 'Feb 24', value: 7 },
      { period: 'Mar 24', value: 6 },
      { period: 'Apr 24', value: 10 },
      { period: 'May 24', value: 8 },
      { period: 'Jun 24', value: 11 },
      { period: 'Jul 24', value: 9 },
      { period: 'Sep 24', value: 8 },
      { period: 'Oct 24', value: 7 },
      { period: 'Dec 24', value: 5 },
      { period: 'Jan 25', value: 8 },
      { period: 'Feb 25', value: 6 },
      { period: 'Apr 25', value: 5 },
      { period: 'May 25', value: 4 },
      { period: 'Jun 25', value: 6 },
      { period: 'Jul 25', value: 8 }
    ]
  }
];

const buildOptions = (trend: DomainTrend) => ({
  tooltip: {
    trigger: 'axis',
    valueFormatter: (value: number) => `${value} controls`
  },
  grid: { left: 50, right: 20, top: 30, bottom: 40 },
  xAxis: {
    type: 'category',
    data: trend.points.map((point) => point.period),
    boundaryGap: false,
    axisLabel: {
      color: '#6B7280'
    }
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: trend.max,
    axisLabel: { color: '#6B7280' },
    splitLine: { lineStyle: { color: '#E5E7EB' } }
  },
  series: [
    {
      data: trend.points.map((point) => point.value),
      type: 'line',
      smooth: false,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: { color: trend.color, width: 2 },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: `${trend.color}dd` },
          { offset: 1, color: `${trend.color}22` }
        ])
      },
      label: {
        show: true,
        position: 'top',
        color: trend.color,
        fontSize: 11,
        formatter: '{c}'
      }
    }
  ]
});

const MaturityTrendGrid: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h4 className="text-lg font-semibold text-foreground">STC ITGPRC Maturity Trend Analysis</h4>
          <p className="text-xs text-muted-foreground">
            Insight into the maturity development across all SAMA ITGF domains, tracked since Jan 2024.
          </p>
        </div>
        <div className="text-xs text-muted-foreground">
          Last update: May 2025
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {domainTrends.map((trend) => (
          <div key={trend.id} className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="bg-[#2c0045] text-white px-4 py-2 text-xs font-semibold uppercase tracking-wide">
              {trend.id}: {trend.title}
            </div>
            <div className="p-4">
              <div className="text-xs text-muted-foreground mb-2 flex items-center justify-between">
                <span>Total Controls</span>
                <span>Year</span>
              </div>
              <ReactECharts option={buildOptions(trend)} style={{ height: 220 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaturityTrendGrid;
