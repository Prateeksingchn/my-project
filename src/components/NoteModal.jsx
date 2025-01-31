import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { X, Palette, Tag, Pin, PinOff, Bold, Italic, List, ListOrdered, Quote, Code, Link } from 'lucide-react';
import { ChromePicker } from 'react-color';

const MenuBar = ({ editor, darkMode }) => {
  if (!editor) {
    return null;
  }

  const buttonClass = `p-2 rounded-lg transition-colors ${
    darkMode 
      ? 'hover:bg-gray-700 text-gray-300' 
      : 'hover:bg-gray-100 text-gray-700'
  }`;

  const activeButtonClass = `p-2 rounded-lg ${
    darkMode 
      ? 'bg-gray-700 text-white' 
      : 'bg-gray-200 text-gray-900'
  }`;

  return (
    <div className="flex items-center gap-1 mb-4 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? activeButtonClass : buttonClass}
        title="Bold (Ctrl+B)"
      >
        <Bold size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? activeButtonClass : buttonClass}
        title="Italic (Ctrl+I)"
      >
        <Italic size={18} />
      </button>
      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? activeButtonClass : buttonClass}
        title="Bullet List"
      >
        <List size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? activeButtonClass : buttonClass}
        title="Numbered List"
      >
        <ListOrdered size={18} />
      </button>
      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? activeButtonClass : buttonClass}
        title="Quote"
      >
        <Quote size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? activeButtonClass : buttonClass}
        title="Code"
      >
        <Code size={18} />
      </button>
    </div>
  );
};

const NoteModal = ({ note, onSave, onClose, darkMode }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [noteData, setNoteData] = useState({
    title: note?.title || '',
    text: note?.text || '',
    category: note?.category || '',
    tags: note?.tags || [],
    color: note?.color || (darkMode ? '#2A2A2A' : '#ffffff'),
    isPinned: note?.isPinned || false,
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: noteData.text,
    editorProps: {
      attributes: {
        class: `prose prose-lg focus:outline-none max-w-none ${
          darkMode ? 'prose-invert' : ''
        }`,
      },
    },
    onUpdate: ({ editor }) => {
      setNoteData(prev => ({
        ...prev,
        text: editor.getHTML()
      }));
    },
  });

  const categories = [
    'Personal',
    'Work',
    'Study',
    'Ideas',
    'To-Do',
    'Other'
  ];

  useEffect(() => {
    if (note && editor) {
      editor.commands.setContent(note.text);
      setNoteData({
        title: note.title || '',
        text: note.text || '',
        category: note.category || '',
        tags: note.tags || [],
        color: note.color || (darkMode ? '#2A2A2A' : '#ffffff'),
        isPinned: note.isPinned || false,
      });
    }
  }, [note, editor]);

  const handleTagInput = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (!noteData.tags.includes(newTag)) {
        setNoteData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }));
      }
      e.target.value = '';
    }
  };

  const removeTag = (tagToRemove) => {
    setNoteData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = () => {
    onSave({
      ...noteData,
      text: editor.getHTML()
    });
  };

  const handleColorChange = (color) => {
    setNoteData(prev => ({
      ...prev,
      color: color.hex
    }));
    setShowColorPicker(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div 
        className="w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden"
        style={{ backgroundColor: noteData.color }}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              placeholder="Title"
              value={noteData.title}
              onChange={(e) => setNoteData(prev => ({ ...prev, title: e.target.value }))}
              className={`text-2xl font-semibold bg-transparent focus:outline-none w-full ${
                darkMode ? 'placeholder-gray-500 text-white' : 'placeholder-gray-400 text-gray-900'
              }`}
            />
            <button 
              onClick={onClose}
              className="p-2 hover:bg-black/10 rounded-full transition-colors"
            >
              <X size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
            </button>
          </div>

          <MenuBar editor={editor} darkMode={darkMode} />

          {/* Note Options */}
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={noteData.category}
              onChange={(e) => setNoteData(prev => ({ ...prev, category: e.target.value }))}
              className={`px-3 py-1.5 rounded-lg text-sm border ${
                darkMode 
                  ? 'bg-gray-800 text-gray-300 border-gray-700' 
                  : 'bg-white text-gray-700 border-gray-200'
              }`}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 ${
                darkMode 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Palette size={16} />
              Color
            </button>

            <button
              onClick={() => setNoteData(prev => ({ ...prev, isPinned: !prev.isPinned }))}
              className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 ${
                noteData.isPinned
                  ? 'bg-yellow-500 text-white'
                  : darkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {noteData.isPinned ? <Pin size={16} /> : <PinOff size={16} />}
              {noteData.isPinned ? 'Pinned' : 'Pin'}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          <EditorContent editor={editor} className="min-h-[300px]" />

          {/* Tags Section */}
          <div className="space-y-2 mt-4">
            <div className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
              <Tag size={16} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
              <input
                type="text"
                placeholder="Add tags (press Enter)"
                onKeyDown={handleTagInput}
                className={`w-full bg-transparent focus:outline-none ${
                  darkMode 
                    ? 'placeholder-gray-500 text-white' 
                    : 'placeholder-gray-400 text-gray-900'
                }`}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {noteData.tags?.map((tag, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1.5 ${
                    darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
                  }`}
                >
                  #{tag}
                  <button
                    onClick={() => removeTag(tag)}
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
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg transition-colors ${
              darkMode 
                ? 'hover:bg-gray-800 text-gray-300' 
                : 'hover:bg-gray-100 text-gray-700'
            }`}
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
                onChange={handleColorChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteModal;