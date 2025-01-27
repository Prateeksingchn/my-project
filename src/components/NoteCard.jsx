import React from 'react';
import { Star, Pencil } from 'lucide-react';

const NoteCard = ({ note, onEdit, onDelete, darkMode }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div 
      className="rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-lg group min-h-[250px] relative"
      style={{ backgroundColor: note.color || '#FFE4B5' }} // Default to a soft yellow if no color
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800 flex-grow pr-4">
            {note.title || 'Untitled Note'}
          </h3>
          <button className="text-gray-600 hover:text-yellow-500 transition-colors">
            <Star size={20} />
          </button>
        </div>

        <p className="text-gray-700 text-base mb-4 flex-grow">
          {note.text}
        </p>

        <div className="flex justify-between items-center mt-auto">
          <span className="text-sm text-gray-800">
            {formatDate(note.createdAt)}
          </span>
          <button 
            onClick={() => onEdit(note)}
            className="p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
          >
            <Pencil size={16} className="text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;