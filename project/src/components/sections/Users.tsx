import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, User } from 'lucide-react';

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joinDate: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active', joinDate: '2024-01-20' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Viewer', status: 'Inactive', joinDate: '2024-02-01' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Editor', status: 'Active', joinDate: '2024-02-10' },
  { id: 5, name: 'Tom Brown', email: 'tom@example.com', role: 'Viewer', status: 'Active', joinDate: '2024-02-15' },
];

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Users Management</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-slate-600">User</th>
                <th className="text-left py-3 px-6 font-medium text-slate-600">Role</th>
                <th className="text-left py-3 px-6 font-medium text-slate-600">Status</th>
                <th className="text-left py-3 px-6 font-medium text-slate-600">Join Date</th>
                <th className="text-left py-3 px-6 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{user.name}</p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'Admin' ? 'bg-red-100 text-red-700' :
                      user.role === 'Editor' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{user.joinDate}</td>
                  <td className="py-4 px-6">
                    <button className="p-1 hover:bg-slate-200 rounded transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-slate-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}