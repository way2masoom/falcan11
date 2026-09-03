const express = require('express');
const cors = require('cors');
const path = require('path');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// In-memory Customer & User Database
let users = [
  {
    id: 'user_1',
    username: 'raj',
    password: 'password',
    role: 'customer',
    isActive: true,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
  },
  {
    id: 'user_2',
    username: 'demo',
    password: 'demo123',
    role: 'customer',
    isActive: true,
    createdAt: Date.now(),
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
  },
  {
    id: 'user_3',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    isActive: true,
    createdAt: Date.now(),
    expiresAt: null // Unlimited
  }
];

// Helper to find user
function findUser(username) {
  return users.find(u => u.username.toLowerCase() === username.toLowerCase());
}

// Helper to check expiration
function isUserExpired(user) {
  if (user.role === 'admin') return false;
  if (!user.expiresAt) return false;
  return Date.now() > user.expiresAt;
}

// API Routes
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, error: 'Username and password are required' });
  }

  const user = findUser(username);
  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, error: 'Invalid username or password' });
  }

  if (!user.isActive) {
    return res.status(403).json({ success: false, error: 'Account has been disabled. Contact admin.' });
  }

  if (isUserExpired(user)) {
    return res.status(403).json({ success: false, error: 'Your license has expired. Please contact admin (IG: @tiktokpannel.seller).' });
  }

  const token = `token_${user.id}_${Date.now()}`;
  res.json({
    success: true,
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      expiresAt: user.expiresAt
    }
  });
});

app.get('/api/session', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ success: false, error: 'No token provided' });
  }

  const token = authHeader.replace('Bearer ', '');
  const parts = token.split('_');
  const userId = parts[1];
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(401).json({ success: false, error: 'Session invalid' });
  }

  if (isUserExpired(user)) {
    return res.status(403).json({ success: false, error: 'License expired' });
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      expiresAt: user.expiresAt
    }
  });
});

// In-memory TikTok user cache
const tiktokUserCache = new Map();

// Helper to fetch JSON from URL
function fetchHttpsJson(url, options = {}) {
  return new Promise((resolve) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        ...options.headers
      },
      timeout: 3500
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(null);
        }
      });
    });
    req.on('error', () => resolve(null));
    req.on('timeout', () => { req.destroy(); resolve(null); });
  });
}

// TikTok User Profile Lookup API with live oEmbed & avatar fetching
app.get('/api/tiktok-user', async (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ success: false, error: 'Username is required' });
  }

  const cleanHandle = username.replace(/^@+/, '').trim().toLowerCase();

  // Check cache
  if (tiktokUserCache.has(cleanHandle)) {
    return res.json({ success: true, data: { user: tiktokUserCache.get(cleanHandle) } });
  }

  // Deterministic seed for follower and like stats
  let hash = 0;
  for (let i = 0; i < cleanHandle.length; i++) {
    hash = (hash * 31 + cleanHandle.charCodeAt(i)) % 10000000;
  }
  const followers = cleanHandle === 'ram' ? 329 : (hash % 850000) + 120;
  const likes = cleanHandle === 'ram' ? 0 : (hash % 50000);
  const following = (hash % 1200) + 12;

  let displayName = cleanHandle.charAt(0).toUpperCase() + cleanHandle.slice(1);
  let avatarUrl = `https://unavatar.io/tiktok/${cleanHandle}`;

  try {
    // 1. Fetch real TikTok creator display name via official oEmbed
    const oembedPromise = fetchHttpsJson(`https://www.tiktok.com/oembed?url=https://www.tiktok.com/@${encodeURIComponent(cleanHandle)}`);
    // 2. Fetch real TikTok avatar URL via unavatar
    const unavatarPromise = fetchHttpsJson(`https://unavatar.io/tiktok/${encodeURIComponent(cleanHandle)}?json`);

    const [oembedData, unavatarData] = await Promise.all([oembedPromise, unavatarPromise]);

    if (oembedData && oembedData.author_name) {
      displayName = oembedData.author_name;
    }

    if (unavatarData && unavatarData.url) {
      avatarUrl = unavatarData.url;
    }
  } catch (e) {
    console.error('TikTok fetch error:', e.message);
  }

  const userPayload = {
    unique_id: cleanHandle,
    username: cleanHandle,
    nickname: displayName,
    display_name: displayName,
    avatar: avatarUrl,
    avatar_url: avatarUrl,
    avatarMedium: avatarUrl,
    follower_count: followers,
    following_count: following,
    heart_count: likes,
    likes: likes,
    stats: {
      follower_count: followers,
      following_count: following,
      heart_count: likes
    }
  };

  tiktokUserCache.set(cleanHandle, userPayload);

  res.json({
    success: true,
    data: {
      user: userPayload
    }
  });
});

// Admin User Management APIs
app.get('/api/admin/users', (req, res) => {
  const customers = users
    .filter(u => u.role !== 'admin')
    .map(u => ({
      id: u.id,
      username: u.username,
      createdAt: u.createdAt,
      expiresAt: u.expiresAt,
      isExpired: isUserExpired(u),
      isActive: u.isActive
    }));
  res.json({ success: true, customers, total: customers.length });
});

app.post('/api/admin/users', (req, res) => {
  const { username, password, durationMinutes } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, error: 'Username and password required' });
  }

  if (findUser(username)) {
    return res.status(400).json({ success: false, error: 'Username already exists' });
  }

  const durationMs = (parseInt(durationMinutes, 10) || 1440) * 60 * 1000;
  const newUser = {
    id: 'user_' + Date.now(),
    username: username.trim(),
    password: password.trim(),
    role: 'customer',
    isActive: true,
    createdAt: Date.now(),
    expiresAt: Date.now() + durationMs
  };

  users.push(newUser);
  res.json({ success: true, user: newUser });
});

app.put('/api/admin/users/:id/password', (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ success: false, error: 'User not found' });
  if (!newPassword || newPassword.length < 3) {
    return res.status(400).json({ success: false, error: 'Password too short' });
  }
  user.password = newPassword;
  res.json({ success: true });
});

app.delete('/api/admin/users/:id', (req, res) => {
  const { id } = req.params;
  users = users.filter(u => u.id !== id);
  res.json({ success: true });
});

app.delete('/api/admin/users/expired', (req, res) => {
  users = users.filter(u => u.role === 'admin' || !isUserExpired(u));
  res.json({ success: true });
});

// Exchange Transaction API
app.post('/api/exchange', (req, res) => {
  const { coins, usd, recipient } = req.body;
  res.json({
    success: true,
    txId: String(Date.now()),
    coins,
    usd,
    recipient,
    timestamp: new Date().toISOString()
  });
});

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(`  TikTok LIVE Rewards Exchange Server   `);
  console.log(`  Running at: http://localhost:${PORT}  `);
  console.log(`========================================`);
});
