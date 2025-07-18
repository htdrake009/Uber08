import React, { useState, Suspense } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Lazy load section components for better performance
const Overview = React.lazy(() => import('./components/sections/Overview'));
const Analytics = React.lazy(() => import('./components/sections/Analytics'));
const Users = React.lazy(() => import('./components/sections/Users'));
const Settings = React.lazy(() => import('./components/sections/Settings'));

// Loading component for better UX
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
  </div>
);

function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview />;
      case 'analytics':
        return <Analytics />;
      case 'users':
        return <Users />;
      case 'settings':
        return <Settings />;
      case 'reports':
        return (
          <div className="bg-white rounded-xl p-8 border border-slate-200 text-center">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Reports</h3>
            <p className="text-slate-600">Reports section coming soon...</p>
          </div>
        );
      case 'notifications':
        return (
          <div className="bg-white rounded-xl p-8 border border-slate-200 text-center">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Notifications</h3>
            <p className="text-slate-600">Notifications center coming soon...</p>
          </div>
        );
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6">
          <Suspense fallback={<LoadingSpinner />}>
            {renderContent()}
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default App;