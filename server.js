import express from 'express';
import pg from 'pg';
import cors from 'cors';

const { Pool } = pg;
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));


// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'notess',
  password: 'maya',
  port: 5432,
});

app.use(express.json());




//POST
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length > 0) {
      return res.status(400).json({ message: 'Username already taken' });
    }
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//  LOGIN
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0 || result.rows[0].password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', userId: result.rows[0].id });
  } catch (err) {
    console.error('Login error', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET NOTES
app.get('/notes', async (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const result = await pool.query('SELECT * FROM notes WHERE user_id = $1 ORDER BY date DESC', [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch notes error', err);
    res.status(500).json({ message: 'Error fetching notes' });
  }
});

// ADD NOTE
app.post('/notes', async (req, res) => {
  const { title, content, userId } = req.body;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const result = await pool.query(
      'INSERT INTO notes (title, content, user_id, date) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [title, content, userId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Add note error', err);
    res.status(500).json({ message: 'Error adding note' });
  }
});




// Lock a note
app.post('/notes/:id/lock', async (req, res) => {
    const { id } = req.params;
    const { userId, password } = req.body;
  
    try {
      const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
      const user = userResult.rows[0];
  
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
  
      await pool.query('UPDATE notes SET locked = TRUE WHERE id = $1 AND user_id = $2', [id, userId]);
      res.json({ message: 'Note locked' });
    } catch (err) {
      console.error('Lock error', err);
      res.status(500).json({ message: 'Locking failed' });
    }
  });
  
  // Unlock a note
  app.post('/notes/:id/unlock', async (req, res) => {
    const { id } = req.params;
    const { userId, password } = req.body;
  
    try {
      const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
      const user = userResult.rows[0];
  
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
  
      await pool.query('UPDATE notes SET locked = FALSE WHERE id = $1 AND user_id = $2', [id, userId]);
      res.json({ message: 'Note unlocked' });
    } catch (err) {
      console.error('Unlock error', err);
      res.status(500).json({ message: 'Unlocking failed' });
    }
  });
  

  // DELETE note
app.delete('/notes/:id', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.query;
  
    try {
      await pool.query('DELETE FROM notes WHERE id = $1 AND user_id = $2', [id, userId]);
      res.status(204).send();
    } catch (err) {
      console.error('Error deleting note', err);
      res.status(500).json({ message: 'Error deleting note' });
    }
  });
  


//START SERVER
app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
