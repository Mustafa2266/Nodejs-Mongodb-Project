const db = require('./db');

module.exports = {
  list: () => db.prepare('SELECT * FROM users ORDER BY createdAt DESC').all(),
  get: (id) => db.prepare('SELECT * FROM users WHERE id = ?').get(id) || null,
  create: (user) => db.prepare('INSERT INTO users (id, name, email, createdAt) VALUES (?, ?, ?, ?)').run(user.id, user.name, user.email, user.createdAt),
  update: (id, data) => {
    const existing = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    if (!existing) return null;
    const name = data.name || existing.name;
    const email = data.email || existing.email;
    db.prepare('UPDATE users SET name = ?, email = ? WHERE id = ?').run(name, email, id);
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  },
  remove: (id) => {
    const info = db.prepare('DELETE FROM users WHERE id = ?').run(id);
    return info.changes > 0;
  },
};
