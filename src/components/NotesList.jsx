import React from 'react';
import NoteCard from './NoteCard';
import '../index.css';

export default function NotesList({ notes, onDelete, onLock, onUnlock }) {
  return (
    <div className="notes-list">
      {notes.map(n => (
        <NoteCard
          key={n.id}
          note={n}
          onDelete={onDelete}
          onLock={onLock}
          onUnlock={onUnlock}
        />
      ))}
    </div>
  );
}

