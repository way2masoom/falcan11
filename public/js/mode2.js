/* ============================================================
   MODE 2 — TikTok LIVE Rewards & Coin Exchanger
   ============================================================ */

const M2_COIN_USD = 0.012136; // 250=$3.03, 500=$6.07, 15000=$182.04

let m2ProfileTimer = null;
let m2KeypadStr = '0';
let m2SelectedMode = '2';
let m2BalanceAnim = null;
let m2NotifTimer = null;

function usdToCoins(amount) {
  return Math.floor(Math.max(0, amount) / M2_COIN_USD);
}

function coinsToUsd(coins) {
  return (Number(coins) || 0) * M2_COIN_USD;
}

function m2AvailUSD() {
  return Math.max(0, (settings.availableRewards || 0) - (state.totals.out || 0));
}

/* Page Navigation */
function showM2Page(id) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.classList.add('hidden');
  });
  const target = el(id);
  if (target) {
    target.classList.remove('hidden');
    target.classList.add('active');
  }
  try { window.scrollTo(0, 0); } catch (e) {}
}

function applyWalletMode(mode) {
  m2SelectedMode = mode || '2';
  localStorage.setItem('walletMode', m2SelectedMode);
  applyTranslations();
  renderM2Rewards();
  renderM2Transactions();
  showM2Page('m2RewardsPage');
}

/* LIVE Rewards Dashboard Rendering */
function setM2Balance(v) {
  const formatted = toMoney(v);
  
  // Find last separator (dot or comma) to split whole and cents correctly for all locales
  const lastDot = formatted.lastIndexOf('.');
  const lastComma = formatted.lastIndexOf(',');
  const decIdx = Math.max(lastDot, lastComma);

  let whole = formatted;
  let cents = '.00';
  if (decIdx !== -1 && decIdx >= formatted.length - 4) {
    whole = formatted.substring(0, decIdx);
    cents = formatted.substring(decIdx); // includes the separator (. or ,)
  }

  if (el('m2BalCurrency')) el('m2BalCurrency').textContent = getCurrencyPrefix();
  if (el('m2BalWhole')) el('m2BalWhole').textContent = whole;
  if (el('m2BalCents')) el('m2BalCents').textContent = cents;
  if (el('m2BalSubLine')) {
    const coins = usdToCoins(v);
    el('m2BalSubLine').innerHTML =
      `= ${sym(v)} ( <span class="m2-coin"></span> ${nfmt(coins)} ) <span style="display:inline-block;width:16px;height:16px;border-radius:50%;border:1px solid #D0D4DC;text-align:center;font-size:10px;line-height:15px;color:#8A8B91;margin-left:4px;">i</span>`;
  }
}

function renderM2Rewards() {
  const avail = m2AvailUSD();
  setM2Balance(avail);
  if (el('m2AvailAmtTab')) el('m2AvailAmtTab').textContent = sym(avail);
  if (el('m2UpcomingAmtTab')) el('m2UpcomingAmtTab').textContent = sym(settings.upcomingRewards || 0);
  if (el('m2DailyLimit')) el('m2DailyLimit').textContent = `${sym(1000)}/${sym(1000)}`;
  if (el('m2TxIn')) el('m2TxIn').textContent = `${sym(0.46)}`;

  // Localized Month Header in Transactions
  const d = new Date();
  const lang = getLanguage();
  const monthName = translations[lang]?.months[d.getMonth()] || 'Jun';
  const year = d.getFullYear();
  if (el('m2TxMonth')) {
    el('m2TxMonth').textContent = t('monthFormat', { month: monthName, year: year });
  }
}

function getTxDisplayName(tx) {
  if (tx.nameKey === 'txSentCoins') {
    return t('txSentCoins', { coins: nfmt(tx.coins || 250), user: tx.recipient || '@user' });
  }
  if (tx.nameKey === 'txLivePayout') {
    return t('txLivePayout');
  }
  return tx.name || '';
}

function renderM2Transactions() {
  const list = el('m2TxList');
  if (!list) return;
  list.innerHTML = '';

  state.transactions.forEach((tx) => {
    const row = document.createElement('div');
    row.className = 'tx-row';
    const isPositive = tx.isPositive || tx.type === 'in';
    const displayName = getTxDisplayName(tx);

    row.innerHTML = `
      <div style="flex:1;">
        <div class="tx-name">${displayName}</div>
        <div class="tx-date">${tx.date}</div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-weight:700;font-size:14.5px;color:${isPositive ? '#20D588' : '#FE2C55'};">${tx.amount}</span>
        <svg class="m2-tx-chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"></path></svg>
      </div>
    `;
    row.addEventListener('click', () => openStatementForTx(tx));
    list.appendChild(row);
  });
}

function openStatementForTx(tx) {
  const userText = tx.recipient || '@user';
  if (el('m2sCoinsTop')) el('m2sCoinsTop').textContent = nfmt(tx.coins || 250);
  if (el('m2sTopUserLine')) el('m2sTopUserLine').innerHTML = t('sentToUser', { user: `<span class="font-bold text-black" id="m2sTopUser">${userText}</span>` });
  if (el('m2sRecipient')) el('m2sRecipient').textContent = userText;
  if (el('m2sCoinsExchanged')) el('m2sCoinsExchanged').textContent = `${nfmt(tx.coins || 250)} ${t('coinsUnit')}`;
  if (el('m2sDeducted')) el('m2sDeducted').textContent = tx.amount || `-${sym(3.03)}`;
  if (el('m2sTime')) el('m2sTime').textContent = tx.date || formatDate();
  showM2Page('m2StatementPage');
}

/* Balance countdown animation */
function animateM2Balance(fromUsd, toUsd, dur = 1000) {
  const availTab = el('m2AvailAmtTab');
  const nums = [el('m2BalWhole'), el('m2BalCents'), availTab].filter(Boolean);
  nums.forEach(t => { t.style.transition = 'none'; t.style.color = '#FE2C55'; });

  let start = null;
  function frame(now) {
    if (start === null) start = now;
    let p = (now - start) / dur;
    if (p > 1) p = 1;
    const eased = 1 - Math.pow(1 - p, 2);
    const val = fromUsd + (toUsd - fromUsd) * eased;
    setM2Balance(val);
    if (availTab) availTab.textContent = sym(val);
    if (p < 1) {
      requestAnimationFrame(frame);
    } else {
      setM2Balance(toUsd);
      if (availTab) availTab.textContent = sym(toUsd);
      setTimeout(() => {
        nums.forEach(t => { t.style.transition = 'color 0.4s ease'; t.style.color = '#161823'; });
      }, 200);
    }
  }
  requestAnimationFrame(frame);
}

/* iOS Banner Notification */
function showM2Notif() {
  const n = el('m2Notif');
  if (!n) return;
  clearTimeout(m2NotifTimer);
  n.classList.remove('show');
  void n.offsetWidth;
  n.classList.add('show');
  m2NotifTimer = setTimeout(() => {
    n.classList.remove('show');
  }, 2800);
}

/* Exchange Screen */
function updatePresetPrices() {
  document.querySelectorAll('.m2-coin-card').forEach(btn => {
    const coins = Number(btn.dataset.coins);
    if (!coins) return;
    const usd = coinsToUsd(coins);
    const priceEl = btn.querySelector('.m2-coin-price');
    if (priceEl) {
      priceEl.textContent = sym(usd);
    }

    // Update preset coin number formatting for current locale
    const coinNumSpan = btn.querySelector('.font-bold > span:last-child');
    if (coinNumSpan && btn.id !== 'm2CustomAmountCard') {
      coinNumSpan.textContent = nfmt(coins);
    }
  });

  const customCard = el('m2CustomAmountCard');
  if (customCard && !customCard.classList.contains('selected')) {
    if (el('m2CustomCardTitle')) el('m2CustomCardTitle').innerHTML = `<span class="m2-coin" style="width:12px;height:12px;"></span><span>${t('custom')}</span>`;
    if (el('m2CustomCardSub')) el('m2CustomCardSub').textContent = t('largeAmount');
  }
}

function openExchangePage() {
  const avail = m2AvailUSD();
  const coins = usdToCoins(avail);

  if (el('m2ExBalance')) el('m2ExBalance').textContent = sym(avail);
  if (el('m2ExBalanceApprox')) el('m2ExBalanceApprox').textContent = sym(avail);
  if (el('m2ExBalanceCoins')) el('m2ExBalanceCoins').textContent = nfmt(coins);

  resetExchangeForm();
  updatePresetPrices();

  showM2Page('m2ExchangePage');
}

function updateSelectedAmountDisplay(coins) {
  const placeholder = el('m2AmountPlaceholder');
  const details = el('m2AmountDetails');
  const coinsEl = el('m2SelectedCoins');
  const usdEl = el('m2SelectedUSD');

  if (!coins || coins <= 0) {
    if (placeholder) placeholder.classList.remove('hidden');
    if (details) details.classList.add('hidden');
  } else {
    if (placeholder) placeholder.classList.add('hidden');
    if (details) details.classList.remove('hidden');
    if (coinsEl) coinsEl.textContent = nfmt(coins);
    if (usdEl) usdEl.textContent = `≈ ${sym(coinsToUsd(coins))}`;
  }
}

/* Presets */
function selectPreset(coins) {
  state.m2Coins = Number(coins);
  document.querySelectorAll('.m2-coin-card').forEach(c => {
    c.classList.toggle('selected', Number(c.dataset.coins) === state.m2Coins);
  });
  const customCard = el('m2CustomAmountCard');
  if (customCard) {
    customCard.classList.remove('selected');
    if (el('m2CustomCardTitle')) el('m2CustomCardTitle').innerHTML = `<span class="m2-coin" style="width:12px;height:12px;"></span><span>${t('custom')}</span>`;
    if (el('m2CustomCardSub')) el('m2CustomCardSub').textContent = t('largeAmount');
  }
  updateSelectedAmountDisplay(state.m2Coins);
}

/* Keypad Modal */
function openKeypadSheet() {
  m2KeypadStr = state.m2Coins > 0 ? String(state.m2Coins) : '0';
  updateKeypadDisplay();
  const overlay = el('m2KeypadOverlay');
  const sheet = el('m2KeypadSheet');
  if (overlay) overlay.classList.add('open');
  if (sheet) sheet.classList.add('open');
}

function closeKeypadSheet() {
  const overlay = el('m2KeypadOverlay');
  const sheet = el('m2KeypadSheet');
  if (overlay) overlay.classList.remove('open');
  if (sheet) sheet.classList.remove('open');
}

function updateKeypadDisplay() {
  const coins = parseInt(m2KeypadStr, 10) || 0;
  const usd = coinsToUsd(coins);
  if (el('m2KeypadValue')) el('m2KeypadValue').textContent = nfmt(coins);
  if (el('m2KeypadApprox')) el('m2KeypadApprox').textContent = `≈ ${sym(usd)}`;
  if (el('m2KeypadTotal')) el('m2KeypadTotal').textContent = `≈ ${sym(usd)}`;
}

function handleKeypadKey(k) {
  if (k === 'back') {
    m2KeypadStr = m2KeypadStr.length > 1 ? m2KeypadStr.slice(0, -1) : '0';
  } else if (k === '000') {
    if (m2KeypadStr !== '0' && m2KeypadStr.length + 3 <= 10) m2KeypadStr += '000';
  } else {
    if (m2KeypadStr === '0') m2KeypadStr = k;
    else if (m2KeypadStr.length < 10) m2KeypadStr += k;
  }
  updateKeypadDisplay();
}

/* Profile Lookup */
let lastLoadedHandle = '';

function handleUsernameSearch(val) {
  const clean = val.replace(/^@+/, '').trim().toLowerCase();
  const loader = el('m2SearchLoader');
  const card = el('m2ProfileCard');
  const clearBtn = el('m2ClearUsernameBtn');

  if (clearBtn) {
    clearBtn.classList.toggle('hidden', !clean);
  }

  clearTimeout(m2ProfileTimer);

  if (!clean || clean.length < 1) {
    if (card) card.classList.add('hidden');
    if (loader) loader.classList.add('hidden');
    state.m2Profile = null;
    lastLoadedHandle = '';
    return;
  }

  if (clean === lastLoadedHandle && card && !card.classList.contains('hidden')) {
    if (loader) loader.classList.add('hidden');
    return;
  }

  m2ProfileTimer = setTimeout(async () => {
    if (el('m2SearchLabel')) {
      el('m2SearchLabel').textContent = t('searchingUser', { user: clean });
    }
    if (loader) loader.classList.remove('hidden');

    try {
      const res = await fetch(`/api/tiktok-user?username=${encodeURIComponent(clean)}`);
      const data = await res.json();
      if (loader) loader.classList.add('hidden');

      if (data.success && data.data?.user) {
        const user = data.data.user;
        state.m2Profile = user;
        lastLoadedHandle = clean;

        if (el('m2ProfileAvatar')) {
          el('m2ProfileAvatar').src = user.avatar || user.avatar_url || '/assets/tiktok-logo.webp';
        }
        if (el('m2ProfileName')) el('m2ProfileName').textContent = user.nickname || user.display_name || clean;
        if (el('m2ProfileHandle')) el('m2ProfileHandle').textContent = `@${user.unique_id || user.username || clean}`;
        if (el('m2ProfileFollowers')) el('m2ProfileFollowers').textContent = formatFollowerCount(user.follower_count ?? 347000);
        if (card) card.classList.remove('hidden');
      } else {
        if (loader) loader.classList.add('hidden');
      }
    } catch (e) {
      if (loader) loader.classList.add('hidden');
    }
  }, 450);
}

/* Complete Exchange Flow */
function promptConfirmExchange() {
  const usernameInput = el('m2Username');
  const handle = usernameInput ? usernameInput.value.trim() : '';
  if (!handle) {
    return;
  }
  if (!state.m2Coins || state.m2Coins <= 0) {
    return;
  }

  const usdVal = coinsToUsd(state.m2Coins);
  const userDisplay = handle.startsWith('@') ? handle : `@${handle}`;

  if (el('m2ConfirmText')) {
    el('m2ConfirmText').innerHTML = t('confirmDeductMsg', { amount: sym(usdVal), user: userDisplay });
  }

  const modal = el('m2ConfirmOverlay');
  if (modal) modal.classList.add('open');
}

function hideConfirmModal() {
  const modal = el('m2ConfirmOverlay');
  if (modal) modal.classList.remove('open');
}

/* Reset Exchange Form */
function resetExchangeForm() {
  state.m2Coins = 0;
  state.m2Profile = null;
  lastLoadedHandle = '';

  const usernameInput = el('m2Username');
  if (usernameInput) usernameInput.value = '';

  const card = el('m2ProfileCard');
  if (card) card.classList.add('hidden');

  const clearBtn = el('m2ClearUsernameBtn');
  if (clearBtn) clearBtn.classList.add('hidden');

  const loader = el('m2SearchLoader');
  if (loader) loader.classList.add('hidden');

  document.querySelectorAll('.m2-coin-card').forEach(c => c.classList.remove('selected'));
  const customCard = el('m2CustomAmountCard');
  if (customCard) {
    customCard.classList.remove('selected');
    if (el('m2CustomCardTitle')) el('m2CustomCardTitle').innerHTML = `<span class="m2-coin" style="width:12px;height:12px;"></span><span>${t('custom')}</span>`;
    if (el('m2CustomCardSub')) el('m2CustomCardSub').textContent = t('largeAmount');
  }
  updateSelectedAmountDisplay(0);
}

async function executeExchange() {
  hideConfirmModal();
  closeKeypadSheet();

  const loading = el('loadingOverlay');
  if (loading) loading.classList.add('open');

  const dur = (settings.paymentAnimationDuration || 1.5) * 1000;

  setTimeout(async () => {
    if (loading) loading.classList.remove('open');

    const handle = el('m2Username').value.trim();
    const userDisplay = handle.startsWith('@') ? handle : `@${handle}`;
    const coins = state.m2Coins;
    const usd = coinsToUsd(coins);
    const dateStr = formatDate();

    // Deduct balance
    const previous = m2AvailUSD();
    state.totals.out += usd;
    const next = m2AvailUSD();
    m2BalanceAnim = { from: previous, to: next };

    // Record transaction
    const newTx = {
      name: `Sent ${nfmt(coins)} Coins to ${userDisplay}`,
      nameKey: 'txSentCoins',
      amount: `-${sym(usd)}`,
      date: dateStr,
      type: 'out',
      coins: coins,
      recipient: userDisplay
    };
    state.transactions.unshift(newTx);
    renderM2Transactions();

    // Render Green Receipt
    if (el('m2gCoins')) el('m2gCoins').textContent = nfmt(coins);
    if (el('m2gRecipient')) el('m2gRecipient').textContent = userDisplay;
    if (el('m2gCoinsExchanged')) el('m2gCoinsExchanged').textContent = `${nfmt(coins)} ${t('coinsUnit')}`;
    if (el('m2gDeducted')) el('m2gDeducted').textContent = sym(usd);
    if (el('m2gTime')) el('m2gTime').textContent = dateStr;

    // Reset Exchange Form
    resetExchangeForm();

    showM2Page('m2CompletePageGreen');
  }, dur);
}

function returnFromExchangeDone() {
  showM2Page('m2RewardsPage');
  if (m2BalanceAnim) {
    const a = m2BalanceAnim;
    m2BalanceAnim = null;
    requestAnimationFrame(() => animateM2Balance(a.from, a.to));
  }
  showM2Notif();
}

/* Event Initializer */
window.addEventListener('DOMContentLoaded', () => {
  // Navigation
  const exchangeBtn = el('m2ExchangeBtn');
  if (exchangeBtn) exchangeBtn.addEventListener('click', openExchangePage);

  const backFromEx = el('m2ExchangeBackBtn');
  if (backFromEx) backFromEx.addEventListener('click', () => showM2Page('m2RewardsPage'));

  const backFromStatement = el('m2StatementBackBtn');
  if (backFromStatement) backFromStatement.addEventListener('click', () => showM2Page('m2RewardsPage'));

  const statementDone = el('m2StatementDone');
  if (statementDone) statementDone.addEventListener('click', () => showM2Page('m2RewardsPage'));

  const greenBack = el('m2GreenGoBack');
  if (greenBack) greenBack.addEventListener('click', returnFromExchangeDone);

  // Presets
  document.querySelectorAll('.m2-coin-card[data-coins]').forEach(btn => {
    btn.addEventListener('click', () => selectPreset(btn.dataset.coins));
  });

  // Custom Amount Card in Grid
  const customAmountCard = el('m2CustomAmountCard');
  if (customAmountCard) customAmountCard.addEventListener('click', openKeypadSheet);

  // Custom Amount Field Trigger (below presets)
  const amountField = el('m2AmountField');
  if (amountField) amountField.addEventListener('click', openKeypadSheet);

  const closeKeypad = el('m2KeypadClose');
  if (closeKeypad) closeKeypad.addEventListener('click', closeKeypadSheet);

  const keypadOverlay = el('m2KeypadOverlay');
  if (keypadOverlay) keypadOverlay.addEventListener('click', closeKeypadSheet);

  const allBtn = el('m2KeypadAll');
  if (allBtn) {
    allBtn.addEventListener('click', () => {
      const maxCoins = usdToCoins(m2AvailUSD());
      m2KeypadStr = String(maxCoins);
      updateKeypadDisplay();
    });
  }

  const keypadKeys = el('m2Keypad');
  if (keypadKeys) {
    keypadKeys.addEventListener('click', (e) => {
      const btn = e.target.closest('.m2-key');
      if (btn) handleKeypadKey(btn.dataset.key);
    });
  }

  const keypadExchangeBtn = el('m2KeypadExchangeBtn');
  if (keypadExchangeBtn) {
    keypadExchangeBtn.addEventListener('click', () => {
      const coins = parseInt(m2KeypadStr, 10) || 0;
      if (coins <= 0) {
        return;
      }
      state.m2Coins = coins;
      document.querySelectorAll('.m2-coin-card').forEach(c => c.classList.remove('selected'));
      const customCard = el('m2CustomAmountCard');
      if (customCard) {
        customCard.classList.add('selected');
        if (el('m2CustomCardTitle')) el('m2CustomCardTitle').innerHTML = `<span class="m2-coin" style="width:12px;height:12px;"></span><span>${nfmt(coins)}</span>`;
        if (el('m2CustomCardSub')) el('m2CustomCardSub').textContent = sym(coinsToUsd(coins));
      }
      updateSelectedAmountDisplay(coins);
      closeKeypadSheet();
      promptConfirmExchange();
    });
  }

  // Username Input & Clear Button
  const usernameInput = el('m2Username');
  const clearUsernameBtn = el('m2ClearUsernameBtn');
  if (usernameInput) {
    usernameInput.addEventListener('input', (e) => {
      let val = e.target.value;
      if (settings.autoRemoveAt && val.startsWith('@')) {
        val = val.replace(/^@+/, '');
      }
      handleUsernameSearch(val);
    });

    usernameInput.addEventListener('focus', () => {
      if (usernameInput.value.trim()) {
        handleUsernameSearch(usernameInput.value.trim());
      }
    });
  }

  if (clearUsernameBtn && usernameInput) {
    clearUsernameBtn.addEventListener('click', () => {
      usernameInput.value = '';
      clearUsernameBtn.classList.add('hidden');
      const card = el('m2ProfileCard');
      if (card) card.classList.add('hidden');
      state.m2Profile = null;
      usernameInput.focus();
    });
  }

  // Profile Card Click Handler
  const profileCard = el('m2ProfileCard');
  if (profileCard) {
    profileCard.addEventListener('click', () => {
      profileCard.style.borderColor = '#FE2C55';
      setTimeout(() => { profileCard.style.borderColor = '#EAEAEA'; }, 600);
    });
  }

  // Bottom Sticky Exchange Button
  const pageExchangeBtn = el('m2ExchangePageBtn');
  if (pageExchangeBtn) pageExchangeBtn.addEventListener('click', promptConfirmExchange);

  // Confirm Modal
  const confirmClose = el('m2ConfirmClose');
  if (confirmClose) confirmClose.addEventListener('click', hideConfirmModal);

  const confirmBack = el('m2ConfirmGoBack');
  if (confirmBack) confirmBack.addEventListener('click', hideConfirmModal);

  const confirmExec = el('m2ConfirmExchange');
  if (confirmExec) confirmExec.addEventListener('click', executeExchange);

  // Auto-render Home Dashboard on Load
  checkAuthStatus();
  applyWalletMode('2');
});
