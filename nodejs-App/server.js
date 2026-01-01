const express = require('express');
const path = require('path');
const usersRouter = require('./routes/users');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Serve frontend static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/users', usersRouter);

// Fallback to index.html for SPA routes
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'Not Found' });
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
