import React, { useState, useEffect } from 'react';
import { X, Palette, Tag, Pin, PinOff } from 'lucide-react';
import { ChromePicker } from 'react-color';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NoteModal = ({ note, onSave, onClose }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [noteData, setNoteData] = useState({
    title: note?.title || '',
    text: note?.text || '',
    category: note?.category || '',
    tags: note?.tags || [],
    color: note?.color || '#ffffff',
    isPinned: note?.isPinned || false,
  });

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
    'list', 'bullet',
    'blockquote', 'code-block'
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

  const handleSave = () => {
    onSave(noteData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden bg-gray-800">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              placeholder="Title"
              value={noteData.title}
              onChange={(e) => setNoteData(prev => ({ ...prev, title: e.target.value }))}
              className="text-2xl font-semibold bg-transparent focus:outline-none w-full text-white placeholder-gray-500"
            />
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>

          {/* Note Options */}
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={noteData.category}
              onChange={(e) => setNoteData(prev => ({ ...prev, category: e.target.value }))}
              className="px-3 py-1.5 rounded-lg text-sm bg-gray-700 text-gray-300 border-gray-600"
            >
              <option value="">Select Category</option>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Study">Study</option>
              <option value="Ideas">Ideas</option>
              <option value="To-Do">To-Do</option>
            </select>

            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 bg-gray-700 text-gray-300 hover:bg-gray-600"
            >
              <div 
                className="w-3 h-3 rounded-full border border-gray-400"
                style={{ backgroundColor: noteData.color }}
              />
              Color
            </button>

            <button
              onClick={() => setNoteData(prev => ({ ...prev, isPinned: !prev.isPinned }))}
              className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 ${
                noteData.isPinned
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {noteData.isPinned ? <Pin size={16} /> : <PinOff size={16} />}
              {noteData.isPinned ? 'Pinned' : 'Pin'}
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="p-6">
          <ReactQuill
            theme="snow"
            value={noteData.text}
            onChange={(content) => setNoteData(prev => ({ ...prev, text: content }))}
            modules={modules}
            formats={formats}
            className="bg-gray-900 text-white"
          />

          {/* Tags Section */}
          <div className="space-y-2 mt-4">
            <div className="flex items-center gap-2 p-2 rounded-lg border border-gray-700">
              <Tag size={16} className="text-gray-400" />
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
                className="w-full bg-transparent focus:outline-none text-white placeholder-gray-500"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {noteData.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-lg text-sm flex items-center gap-1.5 bg-gray-700 text-gray-300"
                >
                  #{tag}
                  <button
                    onClick={() => {
                      setNoteData(prev => ({
                        ...prev,
                        tags: prev.tags.filter(t => t !== tag)
                      }));
                    }}
                    className="hover:text-red-500 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg transition-colors hover:bg-gray-700 text-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
        </div>

        {/* Color Picker Popover */}
        {showColorPicker && (
          <div className="absolute top-24 left-6 z-50">
            <div 
              className="fixed inset-0" 
              onClick={() => setShowColorPicker(false)}
            />
            <div className="relative">
              <ChromePicker
                color={noteData.color}
                onChange={(color) => setNoteData(prev => ({ ...prev, color: color.hex }))}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteModal;