import React, { useState } from 'react';
import { Folder, FolderPlus, MoreVertical, Edit2, Trash2 } from 'lucide-react';

const FolderManager = ({ folders, onCreateFolder, onDeleteFolder, onRenameFolder, onSelectFolder, selectedFolder }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [editingFolder, setEditingFolder] = useState(null);

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      onCreateFolder(newFolderName.trim());
      setNewFolderName('');
      setIsCreating(false);
    }
  };

  const handleRenameFolder = (folderId, newName) => {
    if (newName.trim()) {
      onRenameFolder(folderId, newName.trim());
      setEditingFolder(null);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-3 mb-2">
        <span className="text-sm font-medium text-gray-500">Folders</span>
        <button
          onClick={() => setIsCreating(true)}
          className="p-1 rounded-md hover:bg-gray-100"
        >
          <FolderPlus size={16} className="text-gray-500" />
        </button>
      </div>

      {isCreating && (
        <div className="px-3 mb-2">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Folder name"
              className="flex-1 px-2 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
              autoFocus
            />
            <button
              onClick={handleCreateFolder}
              className="px-2 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </div>
      )}

      <div className="space-y-1">
        {folders.map((folder) => (
          <div
            key={folder.id}
            className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer ${
              selectedFolder === folder.id ? 'bg-gray-100' : 'hover:bg-gray-50'
            }`}
          >
            <div
              className="flex items-center space-x-3 flex-1"
              onClick={() => onSelectFolder(folder.id)}
            >
              <Folder size={18} className="text-gray-500" />
              {editingFolder === folder.id ? (
                <input
                  type="text"
                  defaultValue={folder.name}
                  className="flex-1 px-2 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onBlur={(e) => handleRenameFolder(folder.id, e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRenameFolder(folder.id, e.target.value)}
                  autoFocus
                />
              ) : (
                <span className="text-sm text-gray-700">{folder.name}</span>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setEditingFolder(folder.id)}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <Edit2 size={14} className="text-gray-500" />
              </button>
              <button
                onClick={() => onDeleteFolder(folder.id)}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <Trash2 size={14} className="text-gray-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderManager; 