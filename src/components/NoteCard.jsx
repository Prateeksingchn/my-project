import React from 'react';
import { Star, Pencil, Trash2 } from 'lucide-react';
import DOMPurify from 'dompurify';

const NoteCard = ({ note, onEdit, onDelete, onTogglePin }) => {
  // Function to safely render HTML content
  const createMarkup = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  // Function to determine if the background color is light or dark
  const isLightColor = (color) => {
    if (!color) return true;
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return brightness > 128;
  };

  // Determine text color based on background color
  const shouldUseDarkText = note.color ? isLightColor(note.color) : false;

  return (
    <div
      className="p-4 rounded-2xl transition-transform transform hover:scale-105 shadow-lg border flex flex-col"
      style={{ 
        height: '250px', 
        backgroundColor: note.color || '#ffffff',
        borderColor: '#e5e7eb'
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
        <div 
          className="prose prose-sm max-w-none line-clamp-6 text-gray-800"
          dangerouslySetInnerHTML={createMarkup(note.text)}
        />
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
          <span className="text-xs text-gray-600">
            {note.category || 'Uncategorized'}
          </span>
          <span className="text-xs text-gray-600">
            {new Date(note.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;