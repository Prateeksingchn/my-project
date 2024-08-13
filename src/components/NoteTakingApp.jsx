import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import NoteList from './NoteList';
import NoteModal from './NoteModal';
import CategorySelector from './CategorySelector';

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

  const toggleDarkMode = () => {
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
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen p-8 transition-colors duration-300`}>
      <div className={`max-w-6xl mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden transition-colors duration-300`}>
        <Header 
          onSearch={handleSearch} 
          onAddNote={handleAddNote} 
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <div className="p-4">
          <CategorySelector 
            categories={['All', ...categories]} 
            selectedCategory={selectedCategory} 
            onCategoryChange={handleCategoryChange}
            darkMode={darkMode}
          />
        </div>
        <NoteList
          notes={filteredNotes}
          searchTerm={searchTerm}
          onEditNote={handleEditNote}
          onDeleteNote={handleDeleteNote}
          darkMode={darkMode}
        />
      </div>
      {showModal && (
        <NoteModal
          note={editingNote}
          onSave={handleSaveNote}
          onClose={() => setShowModal(false)}
          categories={categories}
          darkMode={darkMode}
        />
      )}
      <button
        onClick={toggleDarkMode}
        className={`fixed top-10 right-4 px-4 py-3 rounded-full ${
          darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'
        } transition-colors duration-300`}
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} size="lg" />
      </button>
    </div>
  );
};

export default NoteTakingApp;