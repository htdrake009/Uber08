import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  color: 'blue' | 'green' | 'amber' | 'red';
}

const colorClasses = {
  blue: 'bg-green-50 text-green-600 border-green-200',
  green: 'bg-green-50 text-green-600 border-green-200',
  amber: 'bg-amber-50 text-amber-600 border-amber-200',
  red: 'bg-red-50 text-red-600 border-red-200',
} as const;

const MetricCard = React.memo<MetricCardProps>(({ title, value, change, trend, icon: Icon, color }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
          <div className="flex items-center mt-2">
            <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? '+' : ''}{change}
            </span>
            <span className="text-sm text-slate-500 ml-1">vs last month</span>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
});

MetricCard.displayName = 'MetricCard';

export default MetricCard;