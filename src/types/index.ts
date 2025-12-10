// Common types used throughout the application

export interface Alert {
  id: number;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  partner: string;
  service: string;
  timestamp: Date;
  action: string;
  status: 'active' | 'acknowledged' | 'in-progress';
}

export interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string | number;
  change?: string;
  description?: string;
  icon?: string;
  target?: string;
  className?: string;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

export interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface GlobalFilters {
  dateRange: string;
  serviceCategory: string;
  partnerType: string;
  region: string;
}

export interface DashboardTab {
  id: string;
  label: string;
}

export interface DashboardTabsConfig {
  [key: string]: DashboardTab[];
}

export interface StageData {
  stage: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  mean: number;
  outliers: number[];
  description: string;
  sampleSize: number;
  financial: {
    min: number;
    q1: number;
    median: number;
    q3: number;
    max: number;
    mean: number;
  };
  capability: {
    min: number;
    q1: number;
    median: number;
    q3: number;
    max: number;
    mean: number;
  };
}

export interface BoxPlotProps {
  [key: string]: any;
}

export interface CustomBoxPlotProps {
  [key: string]: any;
}


