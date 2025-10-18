import React, { useState } from 'react';
import { Search, Plus, Users, Hash, User } from 'lucide-react';
import { User as UserType } from '../App';
// import employeeListData from '../../employeeList.json';
// import axios from 'axios';

interface DashboardProps {
  users: UserType[];
  onCreateTask: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ users, onCreateTask }) => {
  const [searchTerm, setSearchTerm] = useState('');
  // const [user, setUser] = useState<UserType[]>([]);



  // useEffect(()=>{
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8080/Dashboard');
  //       setUser(response.data);
  //     } catch (error) {
  //       console.error('Error fetching users:', error);
  //     }
  //   };

  //   fetchUsers();
  // },[])

  const filteredUsers = users.filter(user =>
    user.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Employee Dashboard</h1>
          </div>
          <p className="text-slate-400">Manage employees and create tasks efficiently</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{users.length}</p>
                <p className="text-slate-400 text-sm">Total Employees</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{filteredUsers.length}</p>
                <p className="text-slate-400 text-sm">Active Users</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Hash className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">12</p>
                <p className="text-slate-400 text-sm">Active Tasks</p>
              </div>
            </div>
          </div>
        </div>

        {/* Employee Table */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 shadow-lg">
          {/* Table Header */}
          <div className="p-6 border-b border-slate-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <h2 className="text-xl font-semibold text-white">Employee List</h2>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by Employee ID or Name..."
                  className="pl-11 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 w-80"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/30">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider">
                    Serial No.
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider">
                    Employee ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr key={user.employeeId} className="hover:bg-slate-700/20 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-slate-300">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-slate-300">{user.employeeId}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">

                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-xs font-bold text-white">
                              {user.username.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-white">{user.username}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.status
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}
                        >
                          {user.status ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="text-slate-400">
                        <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">No employees found</p>
                        <p className="text-sm">Try adjusting your search criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="p-6 border-t border-slate-700 bg-slate-700/20">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-sm text-slate-400">
                Showing {filteredUsers.length} of {filteredUsers.length} employees
              </p>

              <button
                onClick={onCreateTask}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200 shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span>Create Task</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;