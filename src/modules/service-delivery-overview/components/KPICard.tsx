import React from 'react';
import Icon from '../../../components/AppIcon';
import { KPICardProps } from '../../../types';

interface ExtendedKPICardProps extends KPICardProps {
  sparklineData?: number[];
  threshold?: 'excellent' | 'good' | 'normal' | 'warning' | 'critical';
  targetStatus?: 'achieved' | 'approaching' | 'on-track' | 'at-risk' | 'critical';
}

const SPARKLINE_WIDTH = 70;
const SPARKLINE_HEIGHT = 22;

const KPICard: React.FC<ExtendedKPICardProps> = ({ 
  title, 
  value, 
  unit = '', 
  trend, 
  trendValue, 
  sparklineData = [], 
  threshold = 'normal',
  description,
  icon,
  target,
  targetStatus = 'on-track'
}) => {
  // Simplified indicator-based coloring: Green for good, Red for bad
  const getThresholdColor = () => {
    switch (threshold) {
      case 'excellent': case'good':
        return 'border-emerald-300 bg-white text-emerald-900';
      case 'warning': case'critical':
        return 'border-red-300 bg-white text-red-900';
      default:
        return 'border-gray-300 bg-white text-gray-900';
    }
  };

  const getTrendColor = () => {
    return trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500';
  };

  const getIconBgColor = () => {
    switch (threshold) {
      case 'excellent': case'good':
        return 'bg-emerald-50 text-emerald-600';
      case 'warning': case'critical':
        return 'bg-red-50 text-red-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  const getTargetStatusColor = () => {
    switch (targetStatus) {
      case 'achieved': case'approaching': case'on-track':
        return 'text-emerald-700 bg-emerald-50 border border-emerald-200';
      case 'at-risk': case'critical':
        return 'text-red-700 bg-red-50 border border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border border-gray-200';
    }
  };

  const getTrendBadgeColor = () => {
    if (trend === 'up') {
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    } else if (trend === 'down') {
      return 'bg-red-50 text-red-700 border border-red-200';
    }
    return 'bg-gray-50 text-gray-700 border border-gray-200';
  };

  const generateSparklinePath = () => {
    if (!sparklineData?.length) return '';
    
    const width = SPARKLINE_WIDTH;
    const height = SPARKLINE_HEIGHT;
    const max = Math.max(...sparklineData);
    const min = Math.min(...sparklineData);
    const range = max - min || 1;
    
    return sparklineData?.map((value, index) => {
        const x = (index / (sparklineData?.length - 1)) * width;
        const y = height - ((value - min) / range) * height;
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      })?.join(' ');
  };

  const getSparklineColor = () => {
    switch (threshold) {
      case 'excellent': case'good':
        return 'text-emerald-500';
      case 'warning': case'critical':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className={`p-6 rounded-xl border shadow-sm transition-all duration-200 hover:shadow-md ${getThresholdColor()}`}>
      {/* Icon and Sparkline Row */}
      <div className="flex items-center justify-between mb-3 gap-3">
        {icon && (
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIconBgColor()} flex-shrink-0`}>
            <Icon name={icon} size={18} />
          </div>
        )}

        {/* Simple Sparkline */}
        {sparklineData?.length > 0 && (
          <div className="w-24 h-7 ml-auto flex-shrink-0 flex items-center justify-end text-gray-300">
            <svg width={SPARKLINE_WIDTH} height={SPARKLINE_HEIGHT + 4} className="overflow-visible">
              {/* Main line */}
              <path
                d={generateSparklinePath()}
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                className={`${getSparklineColor()}`}
              />
              
              {/* End point */}
              {sparklineData?.length > 0 && (
                <circle
                  cx={SPARKLINE_WIDTH}
                  cy={SPARKLINE_HEIGHT - ((sparklineData?.[sparklineData?.length - 1] - Math.min(...sparklineData)) / (Math.max(...sparklineData) - Math.min(...sparklineData) || 1)) * SPARKLINE_HEIGHT}
                  r="2"
                  className={`${getSparklineColor()}`}
                  fill="currentColor"
                />
              )}
            </svg>
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="font-semibold text-sm text-gray-900 leading-tight mb-4 whitespace-normal">
        {title}
      </h3>
      {/* Main Value Display */}
      <div className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-light tracking-tight">
            {value}
          </span>
          {unit && (
            <span className="text-sm text-gray-600 font-medium">
              {unit}
            </span>
          )}
        </div>
        
        {/* Trend and Target Column */}
        <div className="space-y-2">
          {/* Trend Badge */}
          {trend && trendValue && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getTrendBadgeColor()}`}>
              <Icon 
                name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} 
                size={12} 
              />
              <span>{trendValue}</span>
            </div>
          )}
          
          {/* Target Status Badge */}
          {target && (
            <div className={`px-2 py-1 rounded text-xs font-medium ${getTargetStatusColor()}`}>
              Target: {target}
            </div>
          )}
        </div>
        
        {/* Description */}
        {description && (
          <p className="text-xs text-gray-600 leading-4">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default KPICard;
