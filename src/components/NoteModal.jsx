import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Palette } from 'lucide-react';

const NoteModal = ({ note, onSave, onClose, categories, darkMode }) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    if (note) {
      setText(note.text || '');
      setCategory(note.category || '');
      setColor(note.color || '#ffffff');
    } else {
      setText('');
      setCategory('');
      setColor('#ffffff');
    }
  }, [note]);

  const handleSave = () => {
    onSave({ text, category, color });
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
        className={`fixed inset-0 flex items-center justify-center z-50 ${darkMode ? 'bg-black bg-opacity-50' : 'bg-gray-500 bg-opacity-50'}`}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div 
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-2xl w-full max-w-md overflow-hidden`}
          variants={modalVariants}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {note ? 'Edit Note' : 'Add New Note'}
            </h2>
            <button 
              onClick={onClose}
              className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors duration-200`}
            >
              <X size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
            </button>
          </div>
          <div className="p-4">
            <textarea
              className={`w-full h-40 p-3 mb-4 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow duration-200 ${
                darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
              }`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your note here..."
            />
            <div className="flex space-x-2 mb-4">
              <select
                className={`flex-grow p-2 rounded-md ${
                  darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
                } focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow duration-200`}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className={`p-2 rounded-md ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                } transition-colors duration-200`}
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
                  className="mb-4"
                >
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full h-10 rounded-md cursor-pointer"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              className={`px-4 py-2 rounded-md ${
                darkMode
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              } transition-colors duration-200 flex items-center space-x-1`}
              onClick={handleSave}
            >
              <Save size={18} />
              <span>Save</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NoteModal;