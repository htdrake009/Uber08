import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './components/sections/Overview';
import Analytics from './components/sections/Analytics';
import Users from './components/sections/Users';
import Settings from './components/sections/Settings';

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
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;