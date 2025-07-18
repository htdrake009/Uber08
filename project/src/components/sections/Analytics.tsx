import React from 'react';
import { TrendingUp, Users, Eye, Clock } from 'lucide-react';
import MetricCard from '../MetricCard';

const analyticsMetrics = [
  {
    title: 'Page Views',
    value: '145,892',
    change: '15.3%',
    trend: 'up' as const,
    icon: Eye,
    color: 'green' as const,
  },
  {
    title: 'Unique Visitors',
    value: '23,456',
    change: '8.7%',
    trend: 'up' as const,
    icon: Users,
    color: 'green' as const,
  },
  {
    title: 'Avg. Session',
    value: '4m 32s',
    change: '2.1%',
    trend: 'down' as const,
    icon: Clock,
    color: 'amber' as const,
  },
  {
    title: 'Bounce Rate',
    value: '34.2%',
    change: '1.8%',
    trend: 'down' as const,
    icon: TrendingUp,
    color: 'amber' as const,
  },
];

const topPages = [
  { page: '/dashboard', views: 12847, change: '+12.5%' },
  { page: '/analytics', views: 8934, change: '+8.2%' },
  { page: '/users', views: 7231, change: '+15.7%' },
  { page: '/settings', views: 4567, change: '-2.3%' },
  { page: '/reports', views: 3421, change: '+5.1%' },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Analytics Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analyticsMetrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h4 className="text-lg font-semibold text-slate-800 mb-4">Traffic Trends</h4>
          <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-slate-600">Traffic trend chart</p>
              <p className="text-sm text-slate-500">Real-time analytics visualization</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h4 className="text-lg font-semibold text-slate-800 mb-4">Top Pages</h4>
          <div className="space-y-3">
            {topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium text-green-600">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{page.page}</p>
                    <p className="text-sm text-slate-500">{page.views.toLocaleString()} views</p>
                  </div>
                </div>
                <span className={`text-sm font-medium ${
                  page.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {page.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}