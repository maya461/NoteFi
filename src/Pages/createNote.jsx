
import React, { useState } from 'react';
import { TextField, Fab, Zoom, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import '../index.css';

export default function CreateNote({ onAdd }) {
  const [note, setNote] = useState({ title: '', content: '' });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setNote(prev => ({ ...prev, [name]: value }));
  };

  const expand = () => setIsExpanded(true);

  const submitNote = e => {
    e.preventDefault();
    if (note.title.trim() || note.content.trim()) {
      onAdd(note);
      setNote({ title: '', content: '' });
      setIsExpanded(false);
    }
  };

  return (


    


    <Paper elevation={3} className="create-note">
      <form onSubmit={submitNote}>
        {isExpanded && (
          <TextField
            name="title"
            value={note.title}
            onChange={handleChange}
            placeholder="Title"
            fullWidth
            margin="dense"
          />
        )}
        <TextField
          name="content"
          value={note.content}
          onChange={handleChange}
          onClick={expand}
          placeholder="Take a note..."
          fullWidth
          multiline
          margin="dense"
     
        />
        <Zoom in={isExpanded}>
          <Fab 
            type="submit" 
            color="primary" 
            size="small" 
            style={{ position: 'absolute', right: 16, bottom: -12 }}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </Paper>

  );
}


