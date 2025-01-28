import React from 'react';
import { PlusCircle, Search, Archive, FolderClosed, HelpCircle, Settings, Moon, Sun } from 'lucide-react';

const Sidebar = ({ darkMode, onCreateNote, onToggleTheme }) => {
  const sidebarItems = [
    { icon: <PlusCircle size={20} />, label: 'Create Note', shortcut: '⌘N', onClick: onCreateNote },
    { icon: <Search size={20} />, label: 'Search', shortcut: '⌘S' },
    { icon: <Archive size={20} />, label: 'Archives', shortcut: '⌘R' },
  ];

  const folders = [
    'Bucket List',
    'Finances',
    'Travel Plans',
    'Shopping',
    'Personal',
    'Work',
    'Projects'
  ];

  return (
    <div className={`w-44 flex flex-col h-screen border-r ${darkMode ? 'bg-[#202020] border-gray-800' : 'bg-gray-50 border-gray-200'} sm:w-56`} style={{ overflow: 'hidden' }}>
      <div className="flex-grow overflow-auto" style={{ overflowY: 'scroll', scrollbarWidth: 'none' }}>
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

        <div className="mt-6 px-3">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className={`w-full flex items-center justify-between p-3 rounded-lg mb-2 text-sm ${
                darkMode 
                  ? 'hover:bg-gray-800 text-gray-300' 
                  : 'hover:bg-gray-200 text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
              <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{item.shortcut}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 px-3">
          <div className="flex items-center justify-between px-3 mb-4">
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Folders</span>
            <button className={`p-1 rounded-md ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}>
              <PlusCircle size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
            </button>
          </div>
          {folders.map((folder, index) => (
            <button
              key={index}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-1 text-sm ${
                darkMode 
                  ? 'hover:bg-gray-800 text-gray-300' 
                  : 'hover:bg-gray-200 text-gray-700'
              }`}
            >
              <FolderClosed size={18} />
              <span>{folder}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto px-3 mb-4 border-t-2 border-gray-200">
          <button className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-1 text-sm ${
            darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-200'
          }`}>
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;