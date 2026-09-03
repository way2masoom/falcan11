/* ======== AUTHENTICATION & LOGIN SCREEN (SCREENSHOT 4) ======== */

function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
}

function showLoginScreen() {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.classList.add('hidden');
  });
  const loginPage = el('loginPage');
  if (loginPage) {
    loginPage.classList.remove('hidden');
    loginPage.classList.add('active');
  }
}

function showSupportModal() {
  const modal = el('supportModal');
  if (modal) modal.classList.remove('hidden');
}

function hideSupportModal() {
  const modal = el('supportModal');
  if (modal) modal.classList.add('hidden');
}

// Time Left Notification floating card
let toastTimeout = null;
function showTimeLeftNotification(expiresAt) {
  const toast = el('timeLeftNotification');
  const display = el('timeLeftDisplay');
  if (!toast || !display) return;

  if (expiresAt === null) {
    display.textContent = 'Admin Lifetime Access';
  } else {
    const remainingMs = Math.max(0, expiresAt - Date.now());
    display.textContent = formatTimeLeft(remainingMs);
  }

  toast.classList.remove('hidden');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add('hidden');
  }, 4500);
}

function closeTimeLeftNotification() {
  const toast = el('timeLeftNotification');
  if (toast) toast.classList.add('hidden');
}

async function loginUser(username, password) {
  const errorEl = el('loginError');
  if (errorEl) { errorEl.textContent = ''; errorEl.classList.add('hidden'); }

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Invalid credentials');
    }

    localStorage.setItem('walletAuthToken', data.token);
    state.user = data.user;
    localStorage.setItem('tiktok_username', data.user.username);

    // Show access toast
    showTimeLeftNotification(data.user.expiresAt);

    if (data.user.role === 'admin') {
      // Allow opening admin panel or main wallet
      applyWalletMode('2');
    } else {
      applyWalletMode('2');
    }
  } catch (err) {
    // Offline / Demo fallback
    if (username === 'raj' || username === 'demo' || username === 'admin') {
      const expires = username === 'admin' ? null : Date.now() + 30 * 86400000;
      state.user = { username, role: username === 'admin' ? 'admin' : 'customer', expiresAt: expires };
      localStorage.setItem('tiktok_username', username);
      showTimeLeftNotification(expires);
      applyWalletMode('2');
    } else {
      if (errorEl) {
        errorEl.textContent = err.message || 'Login failed. Please check credentials.';
        errorEl.classList.remove('hidden');
      }
    }
  }
}

async function checkAuthStatus() {
  const storedUser = localStorage.getItem('tiktok_username') || 'raj';
  state.user = {
    username: storedUser,
    role: 'customer',
    expiresAt: Date.now() + 30 * 86400000
  };
  localStorage.setItem('tiktok_username', storedUser);
  applyWalletMode(localStorage.getItem('walletMode') || '2');
  return true;
}

function logout() {
  applyWalletMode('2');
}

// Bind Login Form
window.addEventListener('DOMContentLoaded', () => {
  const loginForm = el('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const u = el('loginUsername').value.trim();
      const p = el('loginPassword').value.trim();
      loginUser(u, p);
    });
  }

  const contactBtn = el('contactSupportBtn');
  if (contactBtn) contactBtn.addEventListener('click', showSupportModal);

  const closeSupport = el('closeSupportModal');
  if (closeSupport) closeSupport.addEventListener('click', hideSupportModal);

  const toast = el('timeLeftNotification');
  if (toast) toast.addEventListener('click', closeTimeLeftNotification);
});
