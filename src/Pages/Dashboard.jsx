import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateNote from './createNote';
import NotesList from '../components/NotesList';

export default function Dashboard({ darkMode }) {
  const [notes, setNotes] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/notes', {
        params: { userId },
      });
      setNotes(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const addNote = async note => {
    try {
      await axios.post('http://localhost:5000/notes', { ...note, userId });
      fetchNotes();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteNote = async id => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`, {
        params: { userId },
      });
      fetchNotes();
    } catch (e) {
      console.error(e);
    }
  };

  const lockNote = async id => {
    const pwd = prompt('Enter password to lock');
    if (!pwd) return;
    try {
      await axios.post(`http://localhost:5000/notes/${id}/lock`, { userId, password: pwd });
      fetchNotes();
    } catch (e) {
      alert('Lock failed');
    }
  };

  const unlockNote = async id => {
    const pwd = prompt('Enter password to unlock');
    if (!pwd) return;
    try {
      await axios.post(`http://localhost:5000/notes/${id}/unlock`, { userId, password: pwd });
      fetchNotes();
    } catch (e) {
      alert('Unlock failed');
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontFamily:'Libre Baskerville, serif'}}>Add Your Notes...</h1>
      <CreateNote onAdd={addNote} />
      <NotesList 
        notes={notes} 
        onDelete={deleteNote} 
        onLock={lockNote} 
        onUnlock={unlockNote} 
      />
    </div>
  );
}

