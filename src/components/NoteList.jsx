import React from 'react';
import NoteCard from './NoteCard';

const NoteList = ({ notes = [], viewMode, onEditNote, onDeleteNote, onTogglePin, darkMode }) => {
  // Ensure notes is always an array and handle search/filter
  const filteredNotes = notes?.filter(note => note?.text) || [];

  return (
    <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
      {filteredNotes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEditNote}
          onDelete={onDeleteNote}
          onTogglePin={onTogglePin}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
};

export default NoteList;