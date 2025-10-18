import React from 'react';
import { AppState } from '../App';
import favicon from '../favicon.png'; 
import { User, LogOut, Home, Plus, List } from 'lucide-react'; 

interface HeaderProps {
  currentUser: { employeeId: string; username: string; role: 'ADMIN' |  'USER' };
  currentView: AppState;
  onNavigate: (view: AppState) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, currentView, onNavigate, onLogout }) => {
  // Role-based navigation
  const adminNavItems = [
    { id: 'dashboard' as AppState, label: 'Dashboard', icon: Home },
    { id: 'createTask' as AppState, label: 'Create Task', icon: Plus },
    { id: 'taskList' as AppState, label: 'Task List', icon: List },
     { id: 'userTasks' as AppState, label: 'My Tasks', icon: List }
  ];

  const userNavItems = [
    { id: 'userTasks' as AppState, label: 'My Tasks', icon: List }
  ];

  const navItems = currentUser.role === "ADMIN" ? adminNavItems : userNavItems;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700">
      
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-0">
            <img src={favicon} alt="logo" className="w-12 h-12 object-contain" />
            <h1 className="text-xl font-bold text-white">FLUENT GRID</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentView === item.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-white font-medium">{currentUser.username}</p>
                <p className="text-slate-400 text-xs">{currentUser.employeeId}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center justify-center flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  currentView === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                <Icon className="w-4 h-4 mb-1" />
                <span className="block">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
