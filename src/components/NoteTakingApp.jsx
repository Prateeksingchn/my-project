import React, { useState, useEffect } from 'react';
import { LuSun } from "react-icons/lu";
import { IoMoonOutline } from "react-icons/io5";
import Header from './Header';
import NoteList from './NoteList';
import NoteModal from './NoteModal';
import CategorySelector from './CategorySelector';
import Sidebar from './Sidebar';
import TodoList from './TodoList';
import { auth, db } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, query, where, getDocs, addDoc, deleteDoc, updateDoc, doc, onSnapshot } from 'firebase/firestore';
import SearchBar from './SearchBar';

const NoteTakingApp = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [filterType, setFilterType] = useState('all');
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current view based on URL path
  const currentView = location.pathname.split('/')[1] || 'dashboard';

  useEffect(() => {
    if (!auth.currentUser) return;

    // Subscribe to notes collection for real-time updates
    const q = query(
      collection(db, 'notes'),
      where('userId', '==', auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotes(notesData);
    });

    // Load dark mode preference from localStorage (or you could store this in Firestore too)
    const storedDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
    setDarkMode(storedDarkMode);

    return () => unsubscribe();
  }, []);

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

  const handleSaveNote = async (noteData) => {
    try {
      if (editingNote) {
        // Update existing note
        const noteRef = doc(db, 'notes', editingNote.id);
        await updateDoc(noteRef, {
          ...noteData,
          text: noteData.text || '',
          updatedAt: new Date().toISOString()
        });
      } else {
        // Create new note
        await addDoc(collection(db, 'notes'), {
          ...noteData,
          text: noteData.text || '',
          createdAt: new Date().toISOString(),
          userId: auth.currentUser.uid
        });
      }
      setShowModal(false);
      setEditingNote(null);
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteDoc(doc(db, 'notes', noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
    if (type === 'starred') {
      const starredNotes = notes.filter(note => note.isPinned);
      setFilteredNotes(starredNotes);
    } else if (type === 'archived') {
      const archivedNotes = notes.filter(note => note.isArchived);
      setFilteredNotes(archivedNotes);
    } else {
      setFilteredNotes(notes);
    }
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
  };

  const getFilteredNotes = () => {
    let filteredNotes = [...notes];

    // First apply view-based filtering
    if (currentView === 'starred') {
      filteredNotes = filteredNotes.filter(note => note.isPinned);
    } else if (currentView === 'archived') {
      filteredNotes = filteredNotes.filter(note => note.isArchived);
    } else {
      // For dashboard/home, show unarchived notes
      filteredNotes = filteredNotes.filter(note => !note.isArchived);
    }

    // Then apply category filter if not 'All'
    if (selectedCategory !== 'All') {
      filteredNotes = filteredNotes.filter(note => note.category === selectedCategory);
    }

    // Then apply search term
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filteredNotes = filteredNotes.filter(note => {
        const titleMatch = note.title?.toLowerCase().includes(search);
        const contentMatch = note.text?.toLowerCase().includes(search);
        const categoryMatch = note.category?.toLowerCase().includes(search);
        const tagsMatch = note.tags?.some(tag => tag.toLowerCase().includes(search));
        
        return titleMatch || contentMatch || categoryMatch || tagsMatch;
      });
    }

    return filteredNotes;
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    // Reset other filters when searching
    if (value) {
      setFilterType('all');
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleTogglePin = async (noteId) => {
    try {
      const noteRef = doc(db, 'notes', noteId);
      const note = notes.find(n => n.id === noteId);
      await updateDoc(noteRef, {
        isPinned: !note.isPinned,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error toggling pin:', error);
    }
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-[#191919]' : 'bg-gray-50'}`}>
      <Sidebar 
        darkMode={darkMode} 
        onCreateNote={handleAddNote}
        onToggleTheme={toggleTheme}
        viewMode={viewMode}
        onToggleView={toggleViewMode}
        currentView={currentView}
      />
      
      <main className="flex-1 overflow-hidden">
        <div className="max-w-5xl mx-auto p-4 sm:p-8 h-full overflow-auto">
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onClearSearch={handleClearSearch}
            darkMode={darkMode}
          />

          <div className="mb-8">
            <CategorySelector 
              selectedCategory={selectedCategory} 
              onCategoryChange={handleCategoryChange}
              darkMode={darkMode}
            />
          </div>

          {/* Add view title */}
          <div className="mb-6">
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {currentView === 'starred' ? 'Starred Notes' : 
               currentView === 'archived' ? 'Archived Notes' : 
               'All Notes'}
            </h1>
          </div>

          <NoteList
            notes={getFilteredNotes()}
            viewMode={viewMode}
            onEditNote={handleEditNote}
            onDeleteNote={handleDeleteNote}
            onTogglePin={handleTogglePin}
            darkMode={darkMode}
          />
        </div>
      </main>

      <TodoList darkMode={darkMode} />

      {showModal && (
        <NoteModal
          note={editingNote}
          onSave={handleSaveNote}
          onClose={() => {
            setShowModal(false);
            setEditingNote(null);
          }}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default NoteTakingApp;