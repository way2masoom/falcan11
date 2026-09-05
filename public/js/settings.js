/* ======== WALLET SETTINGS POPUP MODAL ======== */

function openWalletSettingsModal() {
  const modal = el('walletSettingsModal');
  const input = el('walletSettingsAmountInput');
  const langSelect = el('walletSettingsLangSelect');

  const currentAvail = m2AvailUSD();
  if (input) {
    input.value = currentAvail.toFixed(2);
    setTimeout(() => { input.focus(); input.select(); }, 100);
  }

  // Synchronize language dropdown select
  const curLang = getLanguage();
  if (langSelect) {
    langSelect.value = curLang;
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

function bindLanguageSelectors() {
  const selects = ['walletSettingsLangSelect', 'toolboxLangSelect'];
  selects.forEach(id => {
    const selectEl = el(id);
    if (!selectEl) return;
    selectEl.addEventListener('change', (e) => {
      const chosenLang = e.target.value;
      if (chosenLang) {
        setLanguage(chosenLang);
        // Sync all other select elements
        selects.forEach(otherId => {
          const other = el(otherId);
          if (other && other !== e.target) other.value = chosenLang;
        });
      }
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  // Bind Language dropdowns
  bindLanguageSelectors();

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
      saveSettings(settings);
      renderM2Rewards();
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
      saveSettings(settings);
    });
  }
});
