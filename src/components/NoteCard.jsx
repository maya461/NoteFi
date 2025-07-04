import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import '../index.css';

export default function NoteCard({ note, onDelete, onLock, onUnlock }) {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      {note.locked ? <em>(Locked)</em> : <p>{note.content}</p>}
      <small>{new Date(note.date).toLocaleString()}</small>
      <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
        <IconButton size="small" onClick={() => onDelete(note.id)} color="inherit">
          <DeleteIcon fontSize="small" />
        </IconButton>
        {note.locked ? (
          <IconButton size="small" onClick={() => onUnlock(note.id)} color="inherit">
            <LockOutlineIcon fontSize="small" />
          </IconButton>
        ) : (
          <IconButton size="small" onClick={() => onLock(note.id)} color="inherit">
            <LockOpenIcon fontSize="small" />
          </IconButton>
        )}
      </div>
    </div>
  );
}

