const express = require('express');
const { v4: uuidv4 } = require('uuid');
const store = require('../lib/store');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(store.list());
});

router.post('/', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'name and email are required' });
  const user = { id: uuidv4(), name, email, createdAt: new Date().toISOString() };
  store.create(user);
  res.status(201).json(user);
});

router.get('/:id', (req, res) => {
  const user = store.get(req.params.id);
  if (!user) return res.status(404).json({ error: 'user not found' });
  res.json(user);
});

router.put('/:id', (req, res) => {
  const data = req.body;
  const updated = store.update(req.params.id, data);
  if (!updated) return res.status(404).json({ error: 'user not found' });
  res.json(updated);
});

router.delete('/:id', (req, res) => {
  const removed = store.remove(req.params.id);
  if (!removed) return res.status(404).json({ error: 'user not found' });
  res.status(204).end();
});

module.exports = router;
