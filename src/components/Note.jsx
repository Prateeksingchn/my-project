import React from 'react';
import { Star, Edit2, Trash, Pin } from 'lucide-react';
import DOMPurify from 'dompurify';

const Note = ({ note, onEdit, onDelete, onToggleStar, onTogglePin, darkMode }) => {
  // Function to safely render HTML content with sanitization
  const createMarkup = (html) => {
    const sanitizedHtml = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'blockquote', 'code'],
      ALLOWED_ATTR: []
    });
    return { __html: sanitizedHtml };
  };

  // Function to strip HTML tags for preview
  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  return (
    <div 
      className={`relative rounded-2xl p-4 h-full flex flex-col shadow-sm hover:shadow-md transition-shadow ${
        darkMode ? 'hover:shadow-gray-800' : 'hover:shadow-gray-200'
      }`}
      style={{ backgroundColor: note.color || (darkMode ? '#2A2A2A' : '#ffffff') }}
    >
      {/* Pin Button */}
      <button
        onClick={() => onTogglePin(note)}
        className={`absolute top-2 right-2 p-1.5 rounded-full transition-colors ${
          note.isPinned
            ? 'text-yellow-500 hover:bg-yellow-500/10'
            : darkMode
              ? 'text-gray-400 hover:bg-gray-700'
              : 'text-gray-500 hover:bg-gray-100'
        }`}
      >
        <Pin size={16} className={note.isPinned ? 'fill-yellow-500' : ''} />
      </button>

      {/* Note Title */}
      <h3 className={`font-semibold text-lg mb-2 pr-8 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}>
        {note.title}
      </h3>

      {/* Note Content */}
      <div 
        className={`prose prose-sm flex-grow mb-4 overflow-hidden ${
          darkMode ? 'prose-invert' : ''
        } ${
          darkMode 
            ? 'text-gray-300' 
            : 'text-gray-700'
        }`}
      >
        <div 
          dangerouslySetInnerHTML={createMarkup(note.text)}
          className="line-clamp-6"
        />
      </div>

      {/* Note Footer */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          {note.category && (
            <span className={`text-xs px-2 py-1 rounded-full ${
              darkMode 
                ? 'bg-gray-800 text-gray-300' 
                : 'bg-gray-100 text-gray-700'
            }`}>
              {note.category}
            </span>
          )}
          {note.tags?.map((tag, index) => (
            <span 
              key={index}
              className={`text-xs px-2 py-1 rounded-full ${
                darkMode 
                  ? 'bg-gray-800 text-gray-300' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onToggleStar(note)}
            className={`p-1.5 rounded-full transition-colors ${
              note.isStarred
                ? 'text-yellow-500 hover:bg-yellow-500/10'
                : darkMode
                  ? 'text-gray-400 hover:bg-gray-700'
                  : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Star size={16} className={note.isStarred ? 'fill-yellow-500' : ''} />
          </button>
          <button
            onClick={() => onEdit(note)}
            className={`p-1.5 rounded-full transition-colors ${
              darkMode
                ? 'text-gray-400 hover:bg-gray-700'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(note)}
            className={`p-1.5 rounded-full transition-colors ${
              darkMode
                ? 'text-gray-400 hover:bg-gray-700'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Note; 