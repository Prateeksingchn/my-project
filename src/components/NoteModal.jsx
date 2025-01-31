import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Palette, Star } from 'lucide-react';
import { db, auth } from '../firebase/config';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const PREDEFINED_CATEGORIES = [
  'Personal',
  'Work',
  'Study',
  'Shopping',
  'Health',
  'Travel',
  'Ideas',
  'Projects'
];

const COLORS = [
  { name: 'Default', value: '#ffffff' },
  { name: 'Rose', value: '#ffe4e6' },
  { name: 'Orange', value: '#ffedd5' },
  { name: 'Yellow', value: '#fef9c3' },
  { name: 'Green', value: '#dcfce7' },
  { name: 'Blue', value: '#dbeafe' },
  { name: 'Purple', value: '#f3e8ff' },
  { name: 'Gray', value: '#f3f4f6' },
];

const NoteModal = ({ note, onSave, onClose, darkMode }) => {
  const [noteData, setNoteData] = useState({
    title: '',
    text: '',
    category: '',
    tags: [],
    color: '',
    isPinned: false,
    newTag: '',
  });

  useEffect(() => {
    if (note) {
      setNoteData({
        title: note.title || '',
        text: note.text || '',
        category: note.category || '',
        color: note.color || COLORS[0].value,
        isPinned: note.isPinned || false,
        tags: note.tags || [],
        newTag: '',
      });
    } else {
      setNoteData({
        title: '',
        text: '',
        category: '',
        color: COLORS[0].value,
        isPinned: false,
        tags: [],
        newTag: '',
      });
    }

    const loadCategories = async () => {
      if (!auth.currentUser) return;

      const q = query(
        collection(db, 'categories'),
        where('userId', '==', auth.currentUser.uid)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const categoriesData = snapshot.docs.map(doc => doc.data().name);
        setCategories(['All', ...PREDEFINED_CATEGORIES, ...categoriesData]);
      });

      return () => unsubscribe();
    };

    loadCategories();
  }, [note]);

  const handleSave = () => {
    onSave({ 
      title: noteData.title,
      text: noteData.text, 
      category: noteData.category, 
      color: noteData.color,
      isPinned: noteData.isPinned,
      tags: noteData.tags,
      updatedAt: new Date().toISOString()
    });
    onClose();
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (noteData.newTag.trim() && !noteData.tags.includes(noteData.newTag.trim())) {
      setNoteData(prev => ({ ...prev, tags: [...prev.tags, prev.newTag.trim()], newTag: '' }));
    }
  };

  const removeTag = (tagToRemove) => {
    setNoteData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/30"
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div 
          className={`${darkMode ? 'bg-[#202020]' : 'bg-white'} rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
          variants={modalVariants}
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {note ? 'Edit Note' : 'Add New Note'}
            </h2>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setNoteData(prev => ({ ...prev, isPinned: !prev.isPinned }))}
                className={`p-2 rounded-full transition-colors ${
                  noteData.isPinned ? 'text-yellow-500' : darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                <Star size={20} fill={noteData.isPinned ? 'currentColor' : 'none'} />
              </button>
              <button 
                onClick={() => setShowColorPicker(!showColorPicker)}
                className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <Palette size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
              </button>
              <button 
                onClick={onClose}
                className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <X size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
              </button>
            </div>
          </div>

          {showColorPicker && (
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {COLORS.map((colorOption) => (
                  <button
                    key={colorOption.value}
                    onClick={() => setNoteData(prev => ({ ...prev, color: colorOption.value }))}
                    className={`w-8 h-8 rounded-full border-2 ${
                      noteData.color === colorOption.value ? 'border-blue-500' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: colorOption.value }}
                    title={colorOption.name}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="p-6" style={{ backgroundColor: darkMode ? '#202020' : noteData.color }}>
            <input
              type="text"
              value={noteData.title}
              onChange={(e) => setNoteData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Note title..."
              className={`w-full p-3 mb-4 rounded-lg text-lg font-medium bg-white/50 backdrop-blur-sm ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            />

            <textarea
              className={`w-full h-48 p-4 mb-6 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
              value={noteData.text}
              onChange={(e) => setNoteData(prev => ({ ...prev, text: e.target.value }))}
              onKeyDown={handleKeyDown}
              placeholder="What's on your mind?"
            />

            {/* Tags Input */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {noteData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm ${
                      darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
                    } flex items-center gap-1`}
                  >
                    #{tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <form onSubmit={handleAddTag} className="flex gap-2">
                <input
                  type="text"
                  value={noteData.newTag}
                  onChange={(e) => setNoteData(prev => ({ ...prev, newTag: e.target.value }))}
                  placeholder="Add tags..."
                  className={`flex-1 p-2 rounded-lg ${
                    darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                  }`}
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                >
                  Add Tag
                </button>
              </form>
            </div>

            {/* Category Selector */}
            <select
              className={`w-full p-3 rounded-xl ${
                darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
              } border focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              value={noteData.category}
              onChange={(e) => setNoteData(prev => ({ ...prev, category: e.target.value }))}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <button
              className={`px-6 py-3 rounded-xl ${
                darkMode
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white font-medium transition-all duration-200 flex items-center space-x-2`}
              onClick={handleSave}
            >
              <Save size={18} />
              <span>Save Note</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NoteModal;