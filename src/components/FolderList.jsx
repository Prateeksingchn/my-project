import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

const FolderList = ({ folders, darkMode }) => {
  return (
    <div className="grid grid-cols-5 gap-4">
      {folders.map((folder) => (
        <div
          key={folder}
          className={`flex flex-col items-center justify-center p-4 rounded-lg ${
            darkMode ? 'bg-gray-700' : 'bg-white'
          } shadow-md transition-transform duration-200 hover:scale-105`}
        >
          <FontAwesomeIcon
            icon={faFolder}
            className={`text-4xl mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}
          />
          <span className="text-sm text-center">{folder}</span>
        </div>
      ))}
    </div>
  );
};

export default FolderList;