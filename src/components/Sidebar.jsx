import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch, faFolder, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ onAddNote, folders, selectedFolder, onFolderChange, onSearch, darkMode, onAddFolder }) => {
  const [newFolderName, setNewFolderName] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      onAddFolder(newFolderName.trim());
      setNewFolderName('');
    }
  };

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`w-64 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} p-4 flex flex-col`}>
      <div className="flex items-center mb-8">
        <div className={`w-8 h-8 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'} mr-2`}></div>
        <span className="font-bold text-lg">Syncscribe</span>
      </div>
      <button
        onClick={onAddNote}
        className={`mb-4 px-4 py-2 rounded-md ${
          darkMode
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        } transition-colors duration-200 flex items-center justify-center`}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        <span>Create Note</span>
      </button>
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <FontAwesomeIcon icon={faSearch} className="mr-2" />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => onSearch(e.target.value)}
            className={`w-full px-2 py-1 rounded ${
              darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'
            }`}
          />
        </div>
      </div>
      <div>
        <div
          className="flex items-center justify-between cursor-pointer mb-2"
          onClick={toggleAccordion}
        >
          <h3 className="font-bold">Folders</h3>
          <FontAwesomeIcon
            icon={isExpanded ? faChevronDown : faChevronRight}
            className="text-sm"
          />
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {folders.map((folder) => (
                <motion.li
                  key={folder}
                  className={`cursor-pointer mb-2 ${
                    selectedFolder === folder ? 'font-bold' : ''
                  }`}
                  onClick={() => onFolderChange(folder)}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <FontAwesomeIcon icon={faFolder} className="mr-2" />
                  {folder}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
        <div className="mt-4">
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="New folder name"
            className={`w-full px-2 py-1 rounded mb-2 ${
              darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'
            }`}
          />
          <button
            onClick={handleAddFolder}
            className={`w-full px-4 py-2 rounded-md ${
              darkMode
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-green-500 text-white hover:bg-green-600'
            } transition-colors duration-200`}
          >
            Add Folder
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;