import React, { useState, useEffect } from 'react';
import { LuSun } from "react-icons/lu";
import { IoMoonOutline } from "react-icons/io5";
import Header from './Header';
import NoteList from './NoteList';
import NoteModal from './NoteModal';
import CategorySelector from './CategorySelector';
import Sidebar from './Sidebar';
import TodoList from './TodoList';

const NoteTakingApp = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['Work', 'Personal', 'Ideas']);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
    const storedDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
    setDarkMode(storedDarkMode);
  }, []);

  const saveNotesToLocalStorage = (updatedNotes) => {
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleAddNote = () => {
    setEditingNote(null);
    setShowModal(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowModal(true);
  };

  const handleSaveNote = (noteData) => {
    let updatedNotes;
    if (editingNote) {
      updatedNotes = notes.map(note =>
        note.id === editingNote.id ? { ...note, ...noteData, text: noteData.text || '' } : note
      );
    } else {
      const newNote = {
        id: Date.now(),
        ...noteData,
        text: noteData.text || '',
        createdAt: new Date().toISOString(),
      };
      updatedNotes = [...notes, newNote];
    }
    saveNotesToLocalStorage(updatedNotes);
    setShowModal(false);
    setEditingNote(null);
  };

  const handleDeleteNote = (noteId) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    saveNotesToLocalStorage(updatedNotes);
  };

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredNotes = notes.filter(note => 
    (selectedCategory === 'All' || note.category === selectedCategory) &&
    (note.text && note.text.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar 
        darkMode={darkMode} 
        onCreateNote={handleAddNote} 
        onToggleTheme={toggleTheme}
      />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>My Notes</h1>
            <div className="flex items-center space-x-4">
              <button
                className={`px-4 py-2 rounded-lg ${
                  darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Today
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}
              >
                This Week
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}
              >
                This Month
              </button>
            </div>
          </div>

          <CategorySelector 
            categories={['All', ...categories]} 
            selectedCategory={selectedCategory} 
            onCategoryChange={handleCategoryChange}
            darkMode={darkMode}
          />

          <NoteList
            notes={filteredNotes}
            searchTerm={searchTerm}
            onEditNote={handleEditNote}
            onDeleteNote={handleDeleteNote}
            darkMode={darkMode}
          />
        </div>
      </main>

      <TodoList darkMode={darkMode} />

      {showModal && (
        <NoteModal
          note={editingNote}
          onSave={handleSaveNote}
          onClose={() => setShowModal(false)}
          categories={categories}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default NoteTakingApp;