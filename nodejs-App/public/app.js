const api = '/api/users';

function toast(msg, timeout = 2500) {
  const el = document.getElementById('toast');
  el.textContent = msg; el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), timeout);
}

async function listUsers() {
  const res = await fetch(api);
  return res.json();
}

async function createUser(data) {
  const res = await fetch(api, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  return res.json();
}

async function updateUser(id, data) {
  const res = await fetch(`${api}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  return res.json();
}

async function deleteUser(id) {
  const res = await fetch(`${api}/${id}`, { method: 'DELETE' });
  return res.ok;
}

function el(cls, text){ const d=document.createElement('div'); if(cls) d.className=cls; if(text) d.textContent=text; return d }

function renderUsers(users) {
  const container = document.getElementById('users');
  container.innerHTML = '';
  if (!users.length) { container.textContent = 'No users yet.'; return }
  const tmpl = document.getElementById('userRowTemplate');
  users.forEach(u => {
    const node = tmpl.content.cloneNode(true);
    node.querySelector('.user-name').textContent = u.name;
    node.querySelector('.user-email').textContent = u.email;
    const editBtn = node.querySelector('.edit');
    const delBtn = node.querySelector('.delete');

    editBtn.addEventListener('click', async () => {
      const name = prompt('Name', u.name);
      if (name === null) return;
      const email = prompt('Email', u.email);
      if (email === null) return;
      try {
        await updateUser(u.id, { name, email });
        toast('Updated');
        refresh();
      } catch (err) { toast('Update failed') }
    });

    delBtn.addEventListener('click', async () => {
      if (!confirm('Delete user?')) return;
      const ok = await deleteUser(u.id);
      if (ok) { toast('Deleted'); refresh(); } else toast('Delete failed');
    });

    container.appendChild(node);
  });
}

async function refresh() {
  try {
    const users = await listUsers();
    renderUsers(users);
  } catch (err) { console.error(err); toast('Failed to load users') }
}

document.getElementById('createForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const name = fd.get('name').trim();
  const email = fd.get('email').trim();
  if (!name || !email) return toast('Name and email required');
  try {
    await createUser({ name, email });
    e.target.reset();
    toast('Created');
    refresh();
  } catch (err) { console.error(err); toast('Create failed') }
});

window.addEventListener('load', refresh);
