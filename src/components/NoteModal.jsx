import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Palette } from 'lucide-react';

const NoteModal = ({ note, onSave, onClose, categories, darkMode }) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (note) {
      setText(note.text || '');
      setCategory(note.category || '');
      setColor(note.color || '#ffffff');
      setTitle(note.title || '');
    } else {
      setText('');
      setCategory('');
      setColor('#ffffff');
      setTitle('');
    }
  }, [note]);

  const handleSave = () => {
    onSave({ 
      title,
      text, 
      category, 
      color
    });
    onClose();
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
          className={`${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
          variants={modalVariants}
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {note ? 'Edit Note' : 'Add New Note'}
            </h2>
            <button 
              onClick={onClose}
              className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-all duration-200`}
            >
              <X size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
            </button>
          </div>
          <div className="p-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title..."
              className={`w-full p-3 mb-4 rounded-lg text-lg font-medium ${
                darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
              }`}
            />
            <textarea
              className={`w-full h-48 p-4 mb-6 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 ${
                darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-800'
              } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind?"
            />
            <div className="flex space-x-3 mb-6">
              <select
                className={`flex-grow p-3 rounded-xl ${
                  darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-gray-50 text-gray-800 border-gray-200'
                } border focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200`}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className={`p-3 rounded-xl ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                } border transition-all duration-200`}
              >
                <Palette size={20} className={darkMode ? 'text-white' : 'text-gray-800'} />
              </button>
            </div>
            <AnimatePresence>
              {showColorPicker && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6"
                >
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full h-12 rounded-xl cursor-pointer"
                  />
                </motion.div>
              )}
            </AnimatePresence>
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