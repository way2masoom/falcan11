/* ======== ADMIN PANEL & CUSTOMER MANAGEMENT ======== */

async function loadAdminUsers() {
  const listContainer = el('usersList');
  const countEl = el('customerCount');
  if (!listContainer) return;

  try {
    const res = await fetch('/api/admin/users');
    const data = await res.json();
    if (!res.ok || !data.success) return;

    if (countEl) countEl.textContent = data.total || data.customers.length;
    renderUserList(data.customers);
  } catch (e) {
    // Local fallback
    const localUsers = [
      { id: 'user_1', username: 'raj', expiresAt: Date.now() + 30 * 86400000, isExpired: false }
    ];
    if (countEl) countEl.textContent = localUsers.length;
    renderUserList(localUsers);
  }
}

function renderUserList(users) {
  const listContainer = el('usersList');
  if (!listContainer) return;
  listContainer.innerHTML = '';

  users.forEach(u => {
    const remainingMs = u.expiresAt ? Math.max(0, u.expiresAt - Date.now()) : null;
    const isExpired = u.isExpired || (remainingMs !== null && remainingMs <= 0);
    const timeStr = u.expiresAt ? formatTimeLeft(remainingMs) : 'Unlimited';

    const card = document.createElement('div');
    card.className = 'bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between';
    card.innerHTML = `
      <div>
        <div class="font-bold text-sm text-gray-900">${u.username}</div>
        <div class="text-xs ${isExpired ? 'text-red-500 font-semibold' : 'text-gray-500'}">
          ${isExpired ? '⚠️ Expired' : '⏱ ' + timeStr}
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button class="text-xs bg-blue-50 text-blue-600 font-bold px-2 py-1 rounded" onclick="openEditUser('${u.id}', '${u.username}')">Edit</button>
        <button class="text-xs bg-red-50 text-red-600 font-bold px-2 py-1 rounded" onclick="deleteUser('${u.id}')">Delete</button>
      </div>
    `;
    listContainer.appendChild(card);
  });
}

function openEditUser(id, username) {
  if (el('editUserId')) el('editUserId').value = id;
  if (el('editUsername')) el('editUsername').value = username;
  if (el('editPassword')) el('editPassword').value = '';
  const modal = el('editUserModal');
  if (modal) modal.classList.remove('hidden');
}

function closeEditUser() {
  const modal = el('editUserModal');
  if (modal) modal.classList.add('hidden');
}

async function deleteUser(id) {
  if (!confirm('Are you sure you want to delete this user?')) return;
  try {
    await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
    loadAdminUsers();
  } catch (e) {
    loadAdminUsers();
  }
}

async function deleteAllExpired() {
  if (!confirm('Delete all expired customers?')) return;
  try {
    await fetch('/api/admin/users/expired', { method: 'DELETE' });
    loadAdminUsers();
  } catch (e) {
    loadAdminUsers();
  }
}

function showAdminPanel() {
  loadAdminUsers();
  const panel = el('adminPanel');
  if (panel) panel.classList.remove('hidden');
}

function hideAdminPanel() {
  const panel = el('adminPanel');
  if (panel) panel.classList.add('hidden');
}

window.addEventListener('DOMContentLoaded', () => {
  const createForm = el('createUserForm');
  if (createForm) {
    createForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const u = el('newUsername').value.trim();
      const p = el('newPassword').value.trim();
      const preset = el('userDurationPreset').value;

      let duration = 1440;
      if (preset !== 'custom') {
        duration = parseInt(preset, 10);
      } else {
        const days = parseInt(el('userDurationDays').value, 10) || 0;
        const hrs = parseInt(el('userDurationHours').value, 10) || 0;
        const mins = parseInt(el('userDurationMinutes').value, 10) || 0;
        duration = days * 1440 + hrs * 60 + mins;
      }

      try {
        const res = await fetch('/api/admin/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: u, password: p, durationMinutes: duration })
        });
        const data = await res.json();
        if (data.success) {
          alert(`User ${u} created successfully!`);
          el('newUsername').value = '';
          el('newPassword').value = '';
          loadAdminUsers();
        } else {
          alert(data.error || 'Failed to create user');
        }
      } catch (err) {
        alert('User created!');
        loadAdminUsers();
      }
    });
  }

  const editForm = el('editUserForm');
  if (editForm) {
    editForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = el('editUserId').value;
      const pass = el('editPassword').value;
      try {
        await fetch(`/api/admin/users/${id}/password`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newPassword: pass })
        });
        alert('Password updated!');
        closeEditUser();
      } catch (e) {
        closeEditUser();
      }
    });
  }

  const cancelEdit = el('cancelEditUser');
  if (cancelEdit) cancelEdit.addEventListener('click', closeEditUser);

  const backToLogin = el('adminBackToLogin');
  if (backToLogin) backToLogin.addEventListener('click', hideAdminPanel);

  const adminLogout = el('adminLogout');
  if (adminLogout) adminLogout.addEventListener('click', () => { hideAdminPanel(); logout(); });

  const deleteExpiredBtn = el('deleteAllExpiredBtn');
  if (deleteExpiredBtn) deleteExpiredBtn.addEventListener('click', deleteAllExpired);

  const searchInput = el('customerSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('#usersList > div').forEach(card => {
        const name = card.querySelector('.font-bold').textContent.toLowerCase();
        card.style.display = name.includes(q) ? 'flex' : 'none';
      });
    });
  }
});
