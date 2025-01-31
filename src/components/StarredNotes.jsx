import React from 'react';
import NoteList from './NoteList';
import SearchBar from './SearchBar';

const StarredNotes = ({ notes, viewMode, onEditNote, onDeleteNote, onTogglePin, darkMode, searchTerm, onSearchChange, onClearSearch }) => {
  const starredNotes = notes.filter(note => note.isPinned);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8 h-full overflow-auto">
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        onClearSearch={onClearSearch}
        darkMode={darkMode}
      />

      <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Starred Notes
      </h2>

      <NoteList
        notes={starredNotes}
        viewMode={viewMode}
        onEditNote={onEditNote}
        onDeleteNote={onDeleteNote}
        onTogglePin={onTogglePin}
        darkMode={darkMode}
      />
    </div>
  );
};

export default StarredNotes; 