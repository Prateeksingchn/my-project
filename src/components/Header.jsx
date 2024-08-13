// src/components/NoteTakingApp/Header.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';

const Header = ({ onSearch, onAddNote }) => {
  return (
    <header className="bg-indigo-600 text-white p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Notes</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              className="bg-indigo-500 text-white placeholder-indigo-200 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="Search notes..."
              onChange={(e) => onSearch(e.target.value)}
            />
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-200" />
          </div>
          <button
            onClick={onAddNote}
            className="bg-white text-indigo-600 rounded-full py-3 px-4 hover:bg-indigo-100 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;