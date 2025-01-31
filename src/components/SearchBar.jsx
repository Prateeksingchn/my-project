import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearchChange, onClearSearch, darkMode }) => {
  return (
    <div className={`w-full max-w-2xl mx-auto mb-6`}>
      <div className={`relative flex items-center ${
        darkMode ? 'bg-[#202020]' : 'bg-white'
      } rounded-xl shadow-sm border ${
        darkMode ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <div className="flex items-center pl-4">
          <Search size={20} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search notes by title, content, tags..."
          className={`w-full py-3 px-4 rounded-xl text-sm focus:outline-none ${
            darkMode 
              ? 'bg-[#202020] text-white placeholder-gray-500' 
              : 'bg-white text-gray-900 placeholder-gray-400'
          }`}
        />
        {searchTerm && (
          <button
            onClick={onClearSearch}
            className={`pr-4 hover:opacity-75 transition-opacity ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar; 