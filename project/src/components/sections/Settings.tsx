import React, { useState } from 'react';
import { Save, Bell, Shield, Globe, Mail } from 'lucide-react';

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
  });

  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-800">Settings</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-blue-600" />
            <h4 className="text-lg font-semibold text-slate-800">Notifications</h4>
          </div>
          
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-800 capitalize">{key} notifications</p>
                  <p className="text-sm text-slate-500">Receive {key} notifications for important updates</p>
                </div>
                <button
                  onClick={() => handleNotificationChange(key as keyof typeof notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    value ? 'bg-green-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-green-600" />
            <h4 className="text-lg font-semibold text-slate-800">Security</h4>
          </div>
          
          <div className="space-y-4">
            <button className="w-full text-left p-3 hover:bg-slate-50 rounded-lg transition-colors">
              <p className="font-medium text-slate-800">Change Password</p>
              <p className="text-sm text-slate-500">Update your account password</p>
            </button>
            <button className="w-full text-left p-3 hover:bg-slate-50 rounded-lg transition-colors">
              <p className="font-medium text-slate-800">Two-Factor Authentication</p>
              <p className="text-sm text-slate-500">Add an extra layer of security</p>
            </button>
            <button className="w-full text-left p-3 hover:bg-slate-50 rounded-lg transition-colors">
              <p className="font-medium text-slate-800">Active Sessions</p>
              <p className="text-sm text-slate-500">Manage your active sessions</p>
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-purple-600" />
            <h4 className="text-lg font-semibold text-slate-800">Preferences</h4>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Language</label>
              <select className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Timezone</label>
              <select className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>UTC-8 (Pacific Time)</option>
                <option>UTC-5 (Eastern Time)</option>
                <option>UTC+0 (GMT)</option>
                <option>UTC+1 (Central European Time)</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-5 h-5 text-amber-600" />
            <h4 className="text-lg font-semibold text-slate-800">Account</h4>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                type="email"
                defaultValue="alex@example.com"
                className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Display Name</label>
              <input
                type="text"
                defaultValue="Alex Johnson"
                className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}