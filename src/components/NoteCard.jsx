import React from 'react';
import { Pen, Trash2 } from 'lucide-react';

const NoteCard = ({ note, onEdit, onDelete, darkMode }) => {
  const formattedDate = new Date(note.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const getContrastColor = (hexColor) => {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return black for light colors, white for dark colors
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };

  const textColor = getContrastColor(note.color);

  return (
    <div 
      className="rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-500 hover:scale-105"
      style={{ backgroundColor: note.color }}
    >
      <div className="p-4 flex-grow h-48">
        <p className="break-words" style={{ color: textColor }}>{note.text}</p>
      </div>
      <div className="bg-white bg-opacity-20 p-3 flex justify-between items-center">
        <span className="text-sm" style={{ color: textColor }}>{formattedDate}</span>
        <div className="space-x-2">
          <button
            onClick={onEdit}
            className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
            aria-label="Edit note"
          >
            <Pen size={16} style={{ color: textColor }} />
          </button>
          <button
            onClick={onDelete}
            className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
            aria-label="Delete note"
          >
            <Trash2 size={16} style={{ color: textColor }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;