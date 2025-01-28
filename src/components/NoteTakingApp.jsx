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
  const [categories, setCategories] = useState(['Work', 'Personal', 'Ideas', 'Study', 'Shopping', 'Health']);

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
    setSelectedCategory('All');
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

  const filteredNotes = notes.filter(note => {
    const noteDate = new Date(note.createdAt);
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    return (
      (selectedCategory === 'All' || note.category === selectedCategory) &&
      (searchTerm === 'Today' ? noteDate.toDateString() === today.toDateString() :
       searchTerm === 'This Week' ? noteDate >= startOfWeek :
       searchTerm === 'This Month' ? noteDate >= startOfMonth :
       note.text && note.text.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-[#191919]' : 'bg-gray-50'}`}>
      <Sidebar 
        darkMode={darkMode} 
        onCreateNote={handleAddNote} 
        onToggleTheme={toggleTheme}
      />
      
      <main className="flex-1" style={{ overflow: 'hidden', scrollbarWidth: 'none' }}>
        <div className="max-w-5xl mx-auto p-4 sm:p-8 overflow-auto h-full" style={{ overflowY: 'scroll', scrollbarWidth: 'none' }}>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>My Notes</h1>
            {/* <div className="flex items-center space-x-2 sm:space-x-2 bg-gray-300 rounded-3xl py-1 px-1">
              <button className={`px-3 py-2 text-sm rounded-full transition duration-200 ease-in-out ${searchTerm === 'Today' ? 'bg-white text-black' : 'bg-transparent text-gray-700 hover:bg-gray-200'}`} onClick={() => handleSearch('Today')}>
                Today
              </button>
              <button className={`px-3 py-2 text-sm rounded-full transition duration-200 ease-in-out ${searchTerm === 'This Week' ? 'bg-white text-black' : 'bg-transparent text-gray-700 hover:bg-gray-200'}`} onClick={() => handleSearch('This Week')}>
                This Week
              </button>
              <button className={`px-3 py-2 text-sm rounded-full transition duration-200 ease-in-out ${searchTerm === 'This Month' ? 'bg-white text-black' : 'bg-transparent text-gray-700 hover:bg-gray-200'}`} onClick={() => handleSearch('This Month')}>
                This Month
              </button>
            </div> */}
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