import React from 'react';
import NoteCard from './NoteCard';

const NoteList = ({ notes, searchTerm, onEditNote, onDeleteNote, darkMode }) => {
  const filteredNotes = notes.filter(note => 
    note.text && note.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {filteredNotes.map(note => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={() => onEditNote(note)}
          onDelete={() => onDeleteNote(note.id)}
          darkMode={darkMode}
        />
      ))}
      {filteredNotes.length === 0 && (
        <p className={`col-span-full text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          No notes found.
        </p>
      )}
    </div>
  );
};

export default NoteList;