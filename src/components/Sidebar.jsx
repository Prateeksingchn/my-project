import React from 'react';
import { PlusCircle, Home, Star, Archive, HelpCircle, Settings, Moon, Sun, LayoutGrid, LayoutList, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

const Sidebar = ({ darkMode, onCreateNote, onToggleTheme, viewMode, onToggleView }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const sidebarItems = [
    { icon: <PlusCircle size={20} />, label: 'Create Note', shortcut: '⌘N', onClick: onCreateNote, path: null },
    { icon: <Home size={20} />, label: 'Home', shortcut: '⌘H', onClick: () => navigate('/dashboard'), path: '/dashboard' },
    { icon: <Star size={20} />, label: 'Starred', shortcut: '⌘S', onClick: () => navigate('/starred'), path: '/starred' },
    { icon: <Archive size={20} />, label: 'Archives', shortcut: '⌘R', onClick: () => navigate('/archived'), path: '/archived' },
  ];

  // Check if current path is dashboard or root
  const isHome = location.pathname === '/dashboard' || location.pathname === '/';

  return (
    <div className={`w-44 flex flex-col h-screen border-r ${darkMode ? 'bg-[#202020] border-gray-800' : 'bg-gray-50 border-gray-200'} sm:w-56`}>
      <div className="flex-grow overflow-auto" style={{ overflowY: 'scroll', scrollbarWidth: 'none' }}>
        {/* Header */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} flex items-center justify-center`}>
              <button 
                onClick={onToggleTheme}
                className="hover:scale-110 transition-transform"
              >
                {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-blue-500" />}
              </button>
            </div>
            <div>
              <h1 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>SnapNotes</h1>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Prateek</p>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="px-3 mb-4">
          <button
            onClick={onToggleView}
            className={`w-full flex items-center justify-between p-3 rounded-lg mb-2 text-sm ${
              darkMode 
                ? 'hover:bg-gray-800 text-gray-300' 
                : 'hover:bg-gray-200 text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-3">
              {viewMode === 'grid' ? <LayoutGrid size={18} /> : <LayoutList size={18} />}
              <span>{viewMode === 'grid' ? 'Grid View' : 'List View'}</span>
            </div>
          </button>
        </div>

        {/* Menu Items */}
        <div className="mt-6 px-3">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className={`w-full flex items-center justify-between p-3 rounded-lg mb-2 text-sm ${
                (item.path && (location.pathname === item.path || (isHome && item.path === '/dashboard')))
                  ? darkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-500 text-white'
                  : darkMode 
                    ? 'hover:bg-gray-800 text-gray-300' 
                    : 'hover:bg-gray-200 text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
              <span className={`text-xs ${
                (item.path && (location.pathname === item.path || (isHome && item.path === '/dashboard')))
                  ? 'text-white/60'
                  : darkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {item.shortcut}
              </span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto px-3 mb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
          <button className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-1 text-sm ${
            darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-200'
          }`}>
            <Settings size={18} />
            <span>Settings</span>
          </button>
          <button className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-1 text-sm ${
            darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-200'
          }`}>
            <HelpCircle size={18} />
            <span>Help & Support</span>
          </button>
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-1 text-sm ${
              darkMode 
                ? 'text-red-400 hover:bg-red-500/10' 
                : 'text-red-500 hover:bg-red-50'
            }`}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;