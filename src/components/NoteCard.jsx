import React from 'react';
import { Star, Pencil, Trash2 } from 'lucide-react';
import DOMPurify from 'dompurify';

const NoteCard = ({ note, onEdit, onDelete, onTogglePin }) => {
  // Function to safely render HTML content
  const createMarkup = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  // Update the isLightColor function to handle pastel shades better
  const isLightColor = (color) => {
    if (!color) return true;
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return brightness > 155; // Adjusted threshold for pastel colors
  };

  // Determine text and border colors based on background color
  const shouldUseDarkText = note.color ? isLightColor(note.color) : true;
  const textColor = shouldUseDarkText ? 'text-gray-800' : 'text-gray-100';
  const buttonHoverBg = shouldUseDarkText ? 'hover:bg-black/10' : 'hover:bg-white/20';
  const tagBg = shouldUseDarkText ? 'bg-black/10' : 'bg-white/20';
  const tagText = shouldUseDarkText ? 'text-gray-700' : 'text-gray-100';

  return (
    <div
      className={`p-5 rounded-3xl transition-all duration-300 hover:scale-[1.02] shadow-lg 
      backdrop-blur-sm border flex flex-col ${textColor} hover:shadow-xl
      group relative overflow-hidden hover:after:opacity-100 after:opacity-0
      after:absolute after:inset-0 after:bg-gradient-to-b 
      after:from-white/[0.07] after:to-transparent after:transition-opacity
      after:duration-300 after:rounded-3xl`}
      style={{ 
        height: '270px', 
        backgroundColor: `${note.color}ee` || '#ffffff',
        borderColor: shouldUseDarkText ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(8px)',
        boxShadow: `0 4px 30px ${note.color ? note.color + '20' : 'rgba(0, 0, 0, 0.1)'}`,
      }}
    >
      <div className="flex justify-between items-start mb-3 relative z-10">
        <h3 className="font-semibold text-lg tracking-tight transition-transform duration-300 
          group-hover:translate-x-1">
          {note.title || 'Untitled'}
        </h3>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => onTogglePin(note.id)} 
            className={`p-1.5 rounded-xl transition-all duration-200 ${buttonHoverBg}
            hover:scale-110 active:scale-95`}
          >
            <Star 
              size={18} 
              className={`transition-colors duration-200 ${note.isPinned ? 'text-yellow-500' : textColor}`}
              fill={note.isPinned ? 'currentColor' : 'none'}
            />
          </button>
          <button 
            onClick={() => onEdit(note)} 
            className={`p-1.5 rounded-xl transition-all duration-200 ${buttonHoverBg}
            hover:scale-110 active:scale-95`}
          >
            <Pencil size={16} className={textColor} />
          </button>
          <button 
            onClick={() => onDelete(note.id)} 
            className={`p-1.5 rounded-xl transition-all duration-200 ${buttonHoverBg}
            hover:scale-110 active:scale-95`}
          >
            <Trash2 size={16} className={textColor} />
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-hidden relative z-10">
        <div 
          className={`prose prose-sm max-w-none h-full overflow-y-auto ${textColor} leading-relaxed
          transition-transform duration-300 group-hover:scale-[1.01] scrollbar-hide`}
          style={{
            scrollbarWidth: 'none',  // Firefox
            msOverflowStyle: 'none',  // IE and Edge
            '&::-webkit-scrollbar': {
              display: 'none'  // Chrome, Safari, Opera
            }
          }}
          dangerouslySetInnerHTML={createMarkup(note.text)}
        />
      </div>

      <div className="mt-auto pt-4 relative z-10">
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {note.tags.map((tag, index) => (
              <span
                key={index}
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${tagBg} ${tagText}
                transition-all duration-300 hover:scale-105 hover:rotate-1
                hover:shadow-sm`}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center text-xs opacity-75
          transition-transform duration-300 group-hover:translate-y-[-2px]">
          <span className={`${textColor} font-medium`}>
            {note.category || 'Uncategorized'}
          </span>
          <span className={textColor}>
            {new Date(note.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;