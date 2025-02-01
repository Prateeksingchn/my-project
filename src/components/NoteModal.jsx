import React, { useState, useEffect } from 'react';
import { X, Palette, Tag, Pin, PinOff } from 'lucide-react';
import { ChromePicker } from 'react-color';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NoteModal = ({ note, onSave, onClose, darkMode = true }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [noteData, setNoteData] = useState({
    title: note?.title || '',
    text: note?.text || '',
    category: note?.category || '',
    tags: note?.tags || [],
    color: note?.color || '#ffffff',
    isPinned: note?.isPinned || false,
  });

  // Define color palette with both pastel and solid colors
  const colorPalette = {
    default: '#ffffff',
    // Solid colors
    yellow: '#facc15',
    orange: '#f97316',
    red: '#ef4444',
    blue: '#3b82f6',
    green: '#22c55e',
    purple: '#a855f7',
    // Pastel colors
    pastelYellow: '#fef08a',
    pastelOrange: '#fdba74',
    pastelPink: '#fecdd3',
    pastelBlue: '#bfdbfe',
    pastelGreen: '#bbf7d0',
    pastelPurple: '#e9d5ff',
    // Additional light colors
    skyBlue: '#7dd3fc',
    teal: '#99f6e4',
    cream: '#fef3c7',
    lightGray: '#f3f4f6',
  };

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['clean']
    ]
  };

  const formats = [
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'blockquote', 'code-block'
  ];

  useEffect(() => {
    if (note) {
      setNoteData({
        title: note.title || '',
        text: note.text || '',
        category: note.category || '',
        tags: note.tags || [],
        color: note.color || '#ffffff',
        isPinned: note.isPinned || false,
      });
    }
  }, [note]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-md">
      <div 
        className={`w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden ${
          darkMode 
            ? 'bg-gradient-to-b from-gray-900 to-gray-800 border-gray-700/50' 
            : 'bg-white border-gray-200/50'
        } border`}
        style={{ 
          animation: 'modal-appear 0.3s ease-out',
          boxShadow: darkMode 
            ? '0 0 40px rgba(0, 0, 0, 0.5)' 
            : '0 0 40px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Header */}
        <div className={`p-6 border-b ${darkMode ? 'border-gray-700/50' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-6">
            <input
              type="text"
              placeholder="Title"
              value={noteData.title}
              onChange={(e) => setNoteData(prev => ({ ...prev, title: e.target.value }))}
              className={`text-3xl font-bold bg-transparent focus:outline-none w-full ${
                darkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
              } transition-all`}
            />
            <button 
              onClick={onClose}
              className={`p-2 rounded-full transition-all duration-200 ${
                darkMode 
                  ? 'hover:bg-gray-700/50 text-gray-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
            >
              <X size={24} />
            </button>
          </div>

          {/* Note Options */}
          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={noteData.category}
              onChange={(e) => setNoteData(prev => ({ ...prev, category: e.target.value }))}
              className={`px-4 py-2 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                darkMode 
                  ? 'bg-gray-800/80 text-gray-200 border-gray-600/50 hover:border-gray-500' 
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'
              } border hover:shadow-sm`}
            >
              <option value="">Select Category</option>
              <option value="Daily">Daily</option>
              <option value="Projects">Projects</option>
              <option value="Reminders">Reminders</option>
              <option value="Ideas">Ideas</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Study">Study</option>
              <option value="Goals">Goals</option>
              <option value="Meetings">Meetings</option>
            </select>

            <div className="flex items-center gap-2 flex-wrap">
              {Object.entries(colorPalette).map(([name, color]) => (
                <button
                  key={name}
                  onClick={() => setNoteData(prev => ({ ...prev, color }))}
                  className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 hover:shadow-lg ${
                    noteData.color === color 
                      ? 'border-blue-500 scale-110' 
                      : darkMode ? 'border-gray-400/30' : 'border-gray-300'
                  }`}
                  style={{ 
                    backgroundColor: color,
                    transform: noteData.color === color ? 'scale(1.1)' : 'scale(1)',
                  }}
                  title={name.charAt(0).toUpperCase() + name.slice(1)}
                />
              ))}
            </div>

            <button
              onClick={() => setNoteData(prev => ({ ...prev, isPinned: !prev.isPinned }))}
              className={`px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-all ${
                noteData.isPinned
                  ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                  : darkMode 
                    ? 'bg-gray-800/80 text-gray-200 hover:bg-gray-700 border-gray-600/50' 
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200'
              } border hover:shadow-sm`}
            >
              {noteData.isPinned ? <Pin size={16} /> : <PinOff size={16} />}
              {noteData.isPinned ? 'Pinned' : 'Pin'}
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="p-6">
          <div className={`rounded-xl overflow-hidden border ${
            darkMode 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-gray-50/50 border-gray-200'
          }`}>
            <ReactQuill
              theme="snow"
              value={noteData.text}
              onChange={(content) => setNoteData(prev => ({ ...prev, text: content }))}
              modules={modules}
              formats={formats}
              className={`bg-transparent ${darkMode ? 'text-white' : 'text-gray-900'}`}
            />
          </div>

          {/* Tags Section */}
          <div className="mt-4">
            <div className={`flex items-center gap-2 p-3 rounded-xl border focus-within:border-blue-500/50 transition-all ${
              darkMode 
                ? 'border-gray-700/50 bg-gray-800/50' 
                : 'border-gray-200 bg-gray-50/50'
            }`}>
              <Tag size={18} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
              <input
                type="text"
                placeholder="Add tags (press Enter)"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    e.preventDefault();
                    const newTag = e.target.value.trim();
                    if (!noteData.tags.includes(newTag)) {
                      setNoteData(prev => ({
                        ...prev,
                        tags: [...prev.tags, newTag]
                      }));
                      e.target.value = '';
                    }
                  }
                }}
                className={`w-full bg-transparent focus:outline-none placeholder-gray-500 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3">
              {noteData.tags?.map((tag, index) => (
                <span
                  key={index}
                  className={`px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-all ${
                    darkMode 
                      ? 'bg-gray-800/80 text-gray-200 border-gray-700/50 hover:border-gray-600' 
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'
                  } border`}
                >
                  #{tag}
                  <button
                    onClick={() => {
                      setNoteData(prev => ({
                        ...prev,
                        tags: prev.tags.filter(t => t !== tag)
                      }));
                    }}
                    className="hover:text-red-400 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`px-8 py-4 border-t ${
          darkMode ? 'border-gray-700/50' : 'border-gray-200'
        } flex justify-end gap-3`}>
          <button
            onClick={onClose}
            className={`px-6 py-2.5 rounded-xl transition-all duration-200 ${
              darkMode 
                ? 'text-gray-300 hover:bg-gray-800/80' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(noteData)}
            className="px-6 py-2.5 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200"
          >
            Save
          </button>
        </div>

        {/* Color Picker Popover */}
        {showColorPicker && (
          <div className="absolute top-32 left-8 z-50">
            <div 
              className="fixed inset-0" 
              onClick={() => setShowColorPicker(false)}
            />
            <div className="relative">
              <div className="p-2 rounded-xl bg-gray-800 shadow-2xl border border-gray-700/50">
                <ChromePicker
                  color={noteData.color}
                  onChange={(color) => setNoteData(prev => ({ ...prev, color: color.hex }))}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes modal-appear {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .ql-toolbar.ql-snow {
          border-color: ${darkMode ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.8)'} !important;
          background: ${darkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(249, 250, 251, 0.8)'};
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
          padding: 12px !important;
        }

        .ql-container.ql-snow {
          border-color: ${darkMode ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.8)'} !important;
          background: transparent;
          border-bottom-left-radius: 0.75rem;
          border-bottom-right-radius: 0.75rem;
          min-height: 200px;
        }

        .ql-toolbar .ql-stroke {
          stroke: ${darkMode ? '#9ca3af' : '#6b7280'} !important;
        }

        .ql-toolbar .ql-fill {
          fill: ${darkMode ? '#9ca3af' : '#6b7280'} !important;
        }

        .ql-toolbar .ql-picker {
          color: ${darkMode ? '#9ca3af' : '#6b7280'} !important;
        }

        .ql-editor {
          padding: 16px !important;
          color: ${darkMode ? '#fff' : '#111827'};
        }

        .ql-editor.ql-blank::before {
          color: ${darkMode ? '#6b7280' : '#9ca3af'} !important;
          font-style: normal !important;
        }
      `}</style>
    </div>
  );
};

export default NoteModal;