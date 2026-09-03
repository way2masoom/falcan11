/* ======== WALLET SETTINGS POPUP MODAL (SCREENSHOT) ======== */

function openWalletSettingsModal() {
  const modal = el('walletSettingsModal');
  const userSpan = el('wsModalUser');
  const timeSpan = el('wsModalTimeLeft');
  const input = el('walletSettingsAmountInput');

  const currentUser = (state.user && state.user.username) || localStorage.getItem('tiktok_username') || 'raj';
  if (userSpan) userSpan.textContent = `@${currentUser}`;

  if (timeSpan) {
    if (state.user && state.user.expiresAt) {
      timeSpan.textContent = formatTimeLeft(state.user.expiresAt - Date.now()) + ' left';
    } else {
      timeSpan.textContent = '29 days 23 hours left';
    }
  }

  const currentAvail = m2AvailUSD();
  if (input) {
    input.value = currentAvail.toFixed(2);
    setTimeout(() => { input.focus(); input.select(); }, 100);
  }

  if (modal) modal.classList.add('open');
}

function closeWalletSettingsModal() {
  const modal = el('walletSettingsModal');
  if (modal) modal.classList.remove('open');
}

function saveWalletSettingsAmount() {
  const input = el('walletSettingsAmountInput');
  if (!input) return;
  const newAmount = Math.max(0, parseFloat(input.value) || 0);

  settings.availableRewards = newAmount;
  state.totals.out = 0; // Reset deduction so available balance matches exact entered amount

  saveSettings(settings);
  renderM2Rewards();
  closeWalletSettingsModal();
}

/* ======== TOOLBOX & DISPLAY SETTINGS CONTROLLER ======== */

function openToolbox() {
  openWalletSettingsModal();
}

function closeToolbox() {
  applyWalletMode(localStorage.getItem('walletMode') || '2');
}

function saveToolboxSettings() {
  const avail = parseFloat(el('settingAvailableRewards').value) || defaultSettings.availableRewards;
  const upcoming = parseFloat(el('settingUpcomingRewards').value) || defaultSettings.upcomingRewards;

  settings.availableRewards = avail;
  settings.upcomingRewards = upcoming;

  saveSettings(settings);
  renderM2Rewards();
  closeToolbox();
}

window.addEventListener('DOMContentLoaded', () => {
  const gearBtn = el('m2RewardsCloseBtn'); // gear button on top right of LIVE rewards
  if (gearBtn) gearBtn.addEventListener('click', openWalletSettingsModal);

  const closeWsBtn = el('closeWalletSettingsModal');
  if (closeWsBtn) closeWsBtn.addEventListener('click', closeWalletSettingsModal);

  const cancelWsBtn = el('cancelWalletSettingsBtn');
  if (cancelWsBtn) cancelWsBtn.addEventListener('click', closeWalletSettingsModal);

  const saveWsBtn = el('saveWalletSettingsBtn');
  if (saveWsBtn) saveWsBtn.addEventListener('click', saveWalletSettingsAmount);

  const wsOverlay = el('walletSettingsModal');
  if (wsOverlay) {
    wsOverlay.addEventListener('click', (e) => {
      if (e.target === wsOverlay) closeWalletSettingsModal();
    });
  }

  const toolboxBack = el('toolboxBackBtn');
  if (toolboxBack) toolboxBack.addEventListener('click', closeToolbox);

  const saveBtn = el('saveToolboxSettings');
  if (saveBtn) saveBtn.addEventListener('click', saveToolboxSettings);

  const logoutBtn = el('toolboxLogoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', logout);

  // Currency Selector
  const currSelector = el('currencySelector');
  if (currSelector) {
    currSelector.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      settings.currency = btn.dataset.currency;
      currSelector.querySelectorAll('button').forEach(b => {
        b.classList.remove('bg-red-500', 'text-white');
      });
      btn.classList.add('bg-red-500', 'text-white');
    });
  }

  // Duration Selector
  const durSelector = el('paymentAnimationDuration');
  if (durSelector) {
    durSelector.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      settings.paymentAnimationDuration = parseFloat(btn.dataset.duration);
      durSelector.querySelectorAll('button').forEach(b => {
        b.classList.remove('bg-red-500', 'text-white');
      });
      btn.classList.add('bg-red-500', 'text-white');
    });
  }

  // Mode Selector
  const modeSelector = el('modeSelector');
  if (modeSelector) {
    modeSelector.addEventListener('click', (e) => {
      const btn = e.target.closest('.mode-select-btn');
      if (!btn) return;
      modeSelector.querySelectorAll('.mode-select-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      localStorage.setItem('walletMode', btn.dataset.mode);
    });
  }
});
