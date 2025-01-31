import React from 'react';
import { Star, Pencil, Trash2 } from 'lucide-react';

const NoteCard = ({ note, onEdit, onDelete, onTogglePin, darkMode }) => {
  return (
    <div
      className="p-4 rounded-2xl transition-transform transform hover:scale-105 bg-white shadow-lg border border-gray-200 flex flex-col"
      style={{ 
        height: '250px', 
        backgroundColor: note.color || '#ffffff'
      }}
    >
      {/* Header Section */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg text-gray-900">
          {note.title || 'Untitled'}
        </h3>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => onTogglePin(note.id)} 
            className="p-1 rounded-lg transition-colors duration-200 hover:bg-gray-100"
          >
            <Star 
              size={20} 
              className={note.isPinned ? 'text-yellow-500' : 'text-gray-600'} 
              fill={note.isPinned ? 'currentColor' : 'none'}
            />
          </button>
          <button 
            onClick={() => onEdit(note)} 
            className="p-1 rounded-lg transition-colors duration-200 hover:bg-gray-100"
          >
            <Pencil size={18} className="text-gray-600" />
          </button>
          <button 
            onClick={() => onDelete(note.id)} 
            className="p-1 rounded-lg transition-colors duration-200 hover:bg-gray-100"
          >
            <Trash2 size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-grow overflow-hidden">
        <p className="text-sm text-gray-700 whitespace-pre-wrap">
          {note.text}
        </p>
      </div>

      {/* Footer Section */}
      <div className="mt-auto pt-4">
        {/* Tags Section */}
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {note.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Category and Date Section */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            {note.category || 'Uncategorized'}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(note.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;