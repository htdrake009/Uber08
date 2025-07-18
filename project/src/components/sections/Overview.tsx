import React from 'react';
import MetricCard from '../MetricCard';
import { Users, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';

const metrics = [
  {
    title: 'Total Users',
    value: '12,847',
    change: '12.5%',
    trend: 'up' as const,
    icon: Users,
    color: 'green' as const,
  },
  {
    title: 'Revenue',
    value: '$89,247',
    change: '8.2%',
    trend: 'up' as const,
    icon: DollarSign,
    color: 'green' as const,
  },
  {
    title: 'Orders',
    value: '3,429',
    change: '3.1%',
    trend: 'down' as const,
    icon: ShoppingCart,
    color: 'amber' as const,
  },
  {
    title: 'Growth Rate',
    value: '24.3%',
    change: '5.4%',
    trend: 'up' as const,
    icon: TrendingUp,
    color: 'green' as const,
  },
];

const recentActivity = [
  { user: 'John Doe', action: 'Created new project', time: '2 minutes ago' },
  { user: 'Jane Smith', action: 'Updated profile settings', time: '15 minutes ago' },
  { user: 'Mike Johnson', action: 'Completed onboarding', time: '1 hour ago' },
  { user: 'Sarah Wilson', action: 'Made a purchase', time: '2 hours ago' },
];

export default function Overview() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Key Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h4 className="text-lg font-semibold text-slate-800 mb-4">Sales Trend</h4>
          <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-slate-600">Chart visualization would go here</p>
              <p className="text-sm text-slate-500">Interactive charts coming soon</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h4 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h4>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-green-600">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">{activity.user}</p>
                  <p className="text-sm text-slate-600">{activity.action}</p>
                </div>
                <span className="text-xs text-slate-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}