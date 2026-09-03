/* ======== SHARED STATE ======== */
const state = {
  user: null,
  transferProfile: null,
  transactions: [
    { name: 'Sent 250 Coins to @user', amount: '-$3.03', date: '6/9/2026 06:22:20', type: 'out', coins: 250, recipient: '@user' },
    { name: 'LIVE Payout', amount: '+$1,276,819.98', date: '6/1/2026 12:00:00', type: 'in', isPositive: true }
  ],
  m2Transactions: [
    { coins: 250, username: 'user', date: '6/9/2026 06:22:20', deducted: '$3.03' }
  ],
  totals: { in: 1276819.98, out: 3.03 },
  balance: 8573020.22,
  upcomingRewards: 167290.62,
  serviceFee: 30,
  m2Profile: null,
  m2Coins: 0
};

/* ======== SETTINGS (saved to localStorage) ======== */
const defaultSettings = {
  availableRewards: 8573020.22,
  upcomingRewards: 167290.62,
  currency: 'USD',
  autoRemoveAt: true,
  withdrawalName: 'Transfer details',
  transferDetailsTitle: 'Transfer details',
  transferLabel: 'LIVE rewards transfer to TikTok',
  followerSize: 2,
  paymentLoadingEnabled: true,
  paymentAnimationType: 'dots',
  paymentAnimationDuration: 1.5,
  searchLoadingEnabled: true,
  searchAnimationType: 'classic',
  searchAnimationDuration: 0.8,
  m2CompleteStyle: 'green'
};

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem('walletSettings'));
    return saved ? Object.assign({}, defaultSettings, saved) : Object.assign({}, defaultSettings);
  } catch(e) {
    return Object.assign({}, defaultSettings);
  }
}

function saveSettings(s) {
  localStorage.setItem('walletSettings', JSON.stringify(s));
}

let settings = loadSettings();

/* ======== HELPERS ======== */
function el(id) {
  return document.getElementById(id);
}

function toMoney(v) {
  return Number(v || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function getCurrencyPrefix() {
  const map = { USD: 'USD', EUR: 'EUR', TRY: 'TRY', GBP: 'GBP', BRL: 'BRL' };
  return map[settings.currency] || 'USD';
}

function getCurrencySymbol() {
  const map = { USD: '$', EUR: '€', TRY: '₺', GBP: '£', BRL: 'R$' };
  return map[settings.currency] || '$';
}

function formatDate(d) {
  return new Date(d || Date.now()).toLocaleString("en-US", {
    year: "numeric", month: "numeric", day: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
  });
}

function formatTimeLeft(ms) {
  if (ms <= 0) return 'Expired';
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days >= 30) {
    const months = Math.floor(days / 30);
    const rd = days % 30;
    return rd > 0 ? months + ' month' + (months > 1 ? 's' : '') + ' ' + rd + ' day' + (rd > 1 ? 's' : '') : months + ' month' + (months > 1 ? 's' : '');
  } else if (days > 0) {
    const rh = hours % 24;
    return rh > 0 ? days + ' day' + (days > 1 ? 's' : '') + ' ' + rh + ' hour' + (rh !== 1 ? 's' : '') : days + ' day' + (days > 1 ? 's' : '');
  } else if (hours > 0) {
    return hours + ' hour' + (hours > 1 ? 's' : '') + ' ' + (minutes % 60) + ' min' + ((minutes % 60) !== 1 ? 's' : '');
  } else if (minutes > 0) {
    return minutes + ' min' + (minutes > 1 ? 's' : '') + ' ' + (seconds % 60) + ' s';
  }
  return seconds + ' seconds';
}
