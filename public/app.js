const API_BASE = '/api';

// Check API health on page load
document.addEventListener('DOMContentLoaded', () => {
  checkHealth();
  loadUsers();
  setupFormListener();
  setInterval(checkHealth, 30000); // Check health every 30 seconds
});

// Check API health
async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE}/health`);
    const data = await response.json();
    const badge = document.getElementById('statusBadge');
    const text = document.getElementById('statusText');
    
    if (response.ok) {
      badge.classList.remove('offline');
      badge.classList.add('online');
      text.textContent = '✓ API Online';
    } else {
      badge.classList.remove('online');
      badge.classList.add('offline');
      text.textContent = '✗ API Offline';
    }
  } catch (error) {
    const badge = document.getElementById('statusBadge');
    const text = document.getElementById('statusText');
    badge.classList.remove('online');
    badge.classList.add('offline');
    text.textContent = '✗ API Offline';
  }
}

// Load all users
async function loadUsers() {
  try {
    const container = document.getElementById('usersContainer');
    const response = await fetch(`${API_BASE}/users`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const data = await response.json();
    const users = data.data || [];

    // Update user count
    document.getElementById('userCount').textContent = `${users.length} user${users.length !== 1 ? 's' : ''}`;

    // Clear container
    container.innerHTML = '';

    if (users.length === 0) {
      container.innerHTML = `
        <div class="no-users">
          <div class="no-users-icon">📭</div>
          <p>No users yet. Create one to get started!</p>
        </div>
      `;
      return;
    }

    // Render users
    users.forEach(user => {
      const userCard = createUserCard(user);
      container.appendChild(userCard);
    });
  } catch (error) {
    console.error('Error loading users:', error);
    const container = document.getElementById('usersContainer');
    container.innerHTML = `<div class="no-users"><p>❌ Error loading users</p></div>`;
  }
}

// Create user card element
function createUserCard(user) {
  const card = document.createElement('div');
  card.className = 'user-card';
  card.innerHTML = `
    <div class="user-info">
      <div class="user-name">${escapeHtml(user.name)}</div>
      <div class="user-email">📧 ${escapeHtml(user.email)}</div>
      ${user.age ? `<div class="user-age">🎂 Age: ${user.age}</div>` : ''}
    </div>
    <div class="user-actions">
      <button class="btn btn-edit" onclick="editUser('${user._id}')">Edit</button>
      <button class="btn btn-danger" onclick="deleteUser('${user._id}', '${escapeHtml(user.name)}')">Delete</button>
    </div>
  `;
  return card;
}

// Setup form listener
function setupFormListener() {
  const form = document.getElementById('userForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const age = document.getElementById('age').value || null;

    if (!name || !email) {
      showMessage('Please fill in all required fields', 'error');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          age: age ? parseInt(age) : undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showMessage('✓ User created successfully!', 'success');
        form.reset();
        loadUsers();
      } else {
        showMessage(`Error: ${data.message || 'Failed to create user'}`, 'error');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      showMessage('Error creating user. Please try again.', 'error');
    }
  });
}

// Delete user
async function deleteUser(userId, userName) {
  if (!confirm(`Are you sure you want to delete "${userName}"?`)) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/users/${userId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      showMessage('✓ User deleted successfully!', 'success');
      loadUsers();
    } else {
      showMessage('Failed to delete user', 'error');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    showMessage('Error deleting user. Please try again.', 'error');
  }
}

// Edit user (placeholder - can be expanded)
function editUser(userId) {
  // For now, just show an alert
  alert('Edit functionality coming soon! User ID: ' + userId);
  // In the future, you can implement inline editing or a modal
}

// Show message
function showMessage(text, type) {
  const messageEl = document.getElementById('formMessage');
  messageEl.textContent = text;
  messageEl.className = `message ${type}`;
  
  setTimeout(() => {
    messageEl.className = 'message';
  }, 5000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
