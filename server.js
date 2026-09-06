const express = require('express');
const cors = require('cors');
const path = require('path');
const https = require('https');
const fs = require('fs');

// Auto-load .env file if present
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = (match[2] || '').trim();
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        if (!process.env[key]) process.env[key] = value;
      }
    });
  } catch (e) {
    console.error('Error loading .env file:', e.message);
  }
}

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

// Pre-configured creator profiles with exact real data
const lalipopProfile = {
  unique_id: 'lalipop992',
  username: 'lalipop992',
  nickname: 'Sgjjdvnkbb',
  display_name: 'Sgjjdvnkbb',
  avatar: '/assets/lalipop-avatar.png',
  avatar_url: '/assets/lalipop-avatar.png',
  avatarMedium: '/assets/lalipop-avatar.png',
  follower_count: 502,
  following_count: 121,
  heart_count: 695,
  likes: 695
};

const ronbProfile = {
  unique_id: 'routineofnepalbanda',
  username: 'routineofnepalbanda',
  nickname: 'Routine of Nepal banda 🇳🇵',
  display_name: 'Routine of Nepal banda 🇳🇵',
  avatar: '/assets/ronb-avatar.png',
  avatar_url: '/assets/ronb-avatar.png',
  avatarMedium: '/assets/ronb-avatar.png',
  follower_count: 1600000,
  following_count: 9,
  heart_count: 248900000,
  likes: 248900000
};

const queenlakshmiProfile = {
  unique_id: 'queenlakshmii_17',
  username: 'queenlakshmii_17',
  nickname: 'queenlakshmii_17',
  display_name: 'queenlakshmii_17',
  avatar: '/assets/queenlakshmi-avatar.png',
  avatar_url: '/assets/queenlakshmi-avatar.png',
  avatarMedium: '/assets/queenlakshmi-avatar.png',
  follower_count: 554500,
  following_count: 67,
  heart_count: 0,
  likes: 0
};

const customCreators = new Map([
  ['lalipop992', lalipopProfile],
  ['lalipop929', lalipopProfile],
  ['lapipop929', lalipopProfile],
  ['lapipop992', lalipopProfile],
  ['sgjjdvnkbb', lalipopProfile],
  ['lalipop', lalipopProfile],
  ['lapipop', lalipopProfile],
  ['routineofnepalbanda', ronbProfile],
  ['routineofnepal', ronbProfile],
  ['routine_of_nepal_banda', ronbProfile],
  ['ronb', ronbProfile],
  ['queenlakshmii_17', queenlakshmiProfile],
  ['queenlakshmi_17', queenlakshmiProfile],
  ['queenlakshmii', queenlakshmiProfile],
  ['queenlakshmi', queenlakshmiProfile],
  ['raushx', {
    unique_id: 'raushx',
    username: 'raushx',
    nickname: 'Alex D',
    display_name: 'Alex D',
    avatar: '/assets/tiktok-logo.webp',
    avatar_url: '/assets/tiktok-logo.webp',
    avatarMedium: '/assets/tiktok-logo.webp',
    follower_count: 104000,
    following_count: 120,
    heart_count: 12400,
    likes: 12400
  }],
  ['rajdk', {
    unique_id: 'rajdk',
    username: 'rajdk',
    nickname: 'Raj DK',
    display_name: 'Raj DK',
    avatar: '/assets/tiktok-logo.webp',
    avatar_url: '/assets/tiktok-logo.webp',
    avatarMedium: '/assets/tiktok-logo.webp',
    follower_count: 626000,
    following_count: 180,
    heart_count: 45000,
    likes: 45000
  }],
  ['way2masoom', {
    unique_id: 'way2masoom',
    username: 'way2masoom',
    nickname: 'Way2masoom',
    display_name: 'Way2masoom',
    avatar: 'https://unavatar.io/tiktok/way2masoom',
    avatar_url: 'https://unavatar.io/tiktok/way2masoom',
    avatarMedium: 'https://unavatar.io/tiktok/way2masoom',
    follower_count: 388000,
    following_count: 154,
    heart_count: 5420,
    likes: 5420
  }],
  ['ram', {
    unique_id: 'ram',
    username: 'ram',
    nickname: 'Ram',
    display_name: 'Ram',
    avatar: '/assets/tiktok-logo.webp',
    avatar_url: '/assets/tiktok-logo.webp',
    avatarMedium: '/assets/tiktok-logo.webp',
    follower_count: 329,
    following_count: 12,
    heart_count: 0,
    likes: 0
  }],
  ['khaby.lame', {
    unique_id: 'khaby.lame',
    username: 'khaby.lame',
    nickname: 'Khabane lame',
    display_name: 'Khabane lame',
    avatar: 'https://unavatar.io/tiktok/khaby.lame',
    avatar_url: 'https://unavatar.io/tiktok/khaby.lame',
    avatarMedium: 'https://unavatar.io/tiktok/khaby.lame',
    follower_count: 162500000,
    following_count: 78,
    heart_count: 2400000000,
    likes: 2400000000
  }],
  ['mrbeast', {
    unique_id: 'mrbeast',
    username: 'mrbeast',
    nickname: 'MrBeast',
    display_name: 'MrBeast',
    avatar: 'https://unavatar.io/tiktok/mrbeast',
    avatar_url: 'https://unavatar.io/tiktok/mrbeast',
    avatarMedium: 'https://unavatar.io/tiktok/mrbeast',
    follower_count: 105200000,
    following_count: 325,
    heart_count: 980000000,
    likes: 980000000
  }],
  ['charlidamelio', {
    unique_id: 'charlidamelio',
    username: 'charlidamelio',
    nickname: 'charli d\'amelio',
    display_name: 'charli d\'amelio',
    avatar: 'https://unavatar.io/tiktok/charlidamelio',
    avatar_url: 'https://unavatar.io/tiktok/charlidamelio',
    avatarMedium: 'https://unavatar.io/tiktok/charlidamelio',
    follower_count: 155800000,
    following_count: 1200,
    heart_count: 11500000000,
    likes: 11500000000
  }],
  ['bellapoarch', {
    unique_id: 'bellapoarch',
    username: 'bellapoarch',
    nickname: 'Bella Poarch',
    display_name: 'Bella Poarch',
    avatar: 'https://unavatar.io/tiktok/bellapoarch',
    avatar_url: 'https://unavatar.io/tiktok/bellapoarch',
    avatarMedium: 'https://unavatar.io/tiktok/bellapoarch',
    follower_count: 94100000,
    following_count: 530,
    heart_count: 2300000000,
    likes: 2300000000
  }],
  ['addisonre', {
    unique_id: 'addisonre',
    username: 'addisonre',
    nickname: 'Addison Rae',
    display_name: 'Addison Rae',
    avatar: 'https://unavatar.io/tiktok/addisonre',
    avatar_url: 'https://unavatar.io/tiktok/addisonre',
    avatarMedium: 'https://unavatar.io/tiktok/addisonre',
    follower_count: 88400000,
    following_count: 2400,
    heart_count: 5900000000,
    likes: 5900000000
  }],
  ['zachking', {
    unique_id: 'zachking',
    username: 'zachking',
    nickname: 'Zach King',
    display_name: 'Zach King',
    avatar: 'https://unavatar.io/tiktok/zachking',
    avatar_url: 'https://unavatar.io/tiktok/zachking',
    avatarMedium: 'https://unavatar.io/tiktok/zachking',
    follower_count: 82000000,
    following_count: 112,
    heart_count: 1200000000,
    likes: 1200000000
  }]
]);

// Helper for fuzzy username matching
function findMatchingCreator(handle) {
  if (customCreators.has(handle)) {
    return customCreators.get(handle);
  }
  // Check variations without special chars
  const sanitized = handle.replace(/[^a-z0-9]/g, '');
  for (const [key, creator] of customCreators.entries()) {
    const keySanitized = key.replace(/[^a-z0-9]/g, '');
    if (sanitized === keySanitized) {
      return creator;
    }
  }
  return null;
}

// Apify Actor (usestring/tiktok-profiles) live scraper function
function fetchApifyTikTokProfile(username, token) {
  return new Promise((resolve) => {
    if (!token) return resolve(null);
    const postData = JSON.stringify({
      profiles: [username],
      maxItems: 1,
      concurrency: 1
    });

    const req = https.request({
      hostname: 'api.apify.com',
      path: '/v2/actors/usestring~tiktok-profiles/run-sync-get-dataset-items',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.trim()}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 15000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const results = JSON.parse(data);
          if (Array.isArray(results) && results.length > 0) {
            const item = results[0];
            const name = item.nickname || item.name || item.username || item.handle || username;
            const handle = item.username || item.handle || username;
            const avatar = item.profileImageUrl || item.avatar || item.avatarUrl || '/assets/tiktok-logo.webp';
            const followers = item.followerCount ?? item.followers ?? 0;
            const following = item.followingCount ?? item.following ?? 0;
            const likes = item.likeCount ?? item.likes ?? item.likesCount ?? 0;
            const videos = item.videoCount ?? item.videos ?? 0;

            resolve({
              unique_id: handle,
              username: handle,
              nickname: name,
              display_name: name,
              avatar: avatar,
              avatar_url: avatar,
              avatarMedium: avatar,
              follower_count: followers,
              following_count: following,
              heart_count: likes,
              likes: likes,
              likes_count: likes,
              video_count: videos,
              is_verified: item.isVerified || false,
              bio: item.biography || item.bio || '',
              bio_description: item.biography || item.bio || '',
              stats: {
                follower_count: followers,
                following_count: following,
                heart_count: likes
              }
            });
          } else {
            resolve(null);
          }
        } catch (e) {
          console.error('Apify parse error:', e.message);
          resolve(null);
        }
      });
    });

    req.on('error', (e) => {
      console.error('Apify request error:', e.message);
      resolve(null);
    });
    req.on('timeout', () => {
      req.destroy();
      console.error('Apify request timeout');
      resolve(null);
    });
    req.write(postData);
    req.end();
  });
}

// TikTok Research API query function
function fetchTikTokResearchUser(username, token) {
  return new Promise((resolve) => {
    if (!token) return resolve(null);
    const postData = JSON.stringify({ username });
    const fields = 'display_name,bio_description,avatar_url,is_verified,follower_count,following_count,likes_count,video_count';
    const req = https.request({
      hostname: 'open.tiktokapis.com',
      path: `/v2/research/user/info/?fields=${encodeURIComponent(fields)}`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.trim()}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 6000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const u = json?.data?.user_info || json?.data;
          if (u && (u.display_name || u.follower_count !== undefined)) {
            resolve({
              unique_id: username,
              username: username,
              nickname: u.display_name || username,
              display_name: u.display_name || username,
              avatar: u.avatar_url || '/assets/tiktok-logo.webp',
              avatar_url: u.avatar_url || '/assets/tiktok-logo.webp',
              avatarMedium: u.avatar_url || '/assets/tiktok-logo.webp',
              follower_count: u.follower_count ?? 0,
              following_count: u.following_count ?? 0,
              heart_count: u.likes_count ?? u.likes ?? 0,
              likes: u.likes_count ?? u.likes ?? 0,
              likes_count: u.likes_count ?? u.likes ?? 0,
              video_count: u.video_count ?? 0,
              is_verified: u.is_verified || false,
              bio_description: u.bio_description || '',
              stats: {
                follower_count: u.follower_count ?? 0,
                following_count: u.following_count ?? 0,
                heart_count: u.likes_count ?? u.likes ?? 0
              }
            });
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    });
    req.on('error', () => resolve(null));
    req.on('timeout', () => { req.destroy(); resolve(null); });
    req.write(postData);
    req.end();
  });
}

// TikTok User Profile Lookup API
app.get('/api/tiktok-user', async (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ success: false, error: 'Username is required' });
  }

  const cleanHandle = username.replace(/^@+/, '').trim().toLowerCase();

  // 1. Check in-memory cache first
  if (tiktokUserCache.has(cleanHandle)) {
    return res.json({ success: true, data: { user: tiktokUserCache.get(cleanHandle) } });
  }

  // 2. Check Apify Actor (usestring/tiktok-profiles) if API token is configured
  const apifyToken = process.env.APIFY_API_TOKEN || process.env.APIFY_TOKEN;
  if (apifyToken) {
    try {
      const apifyUser = await fetchApifyTikTokProfile(cleanHandle, apifyToken);
      if (apifyUser) {
        tiktokUserCache.set(cleanHandle, apifyUser);
        return res.json({ success: true, data: { user: apifyUser } });
      }
    } catch (err) {
      console.error('Apify lookup error:', err.message);
    }
  }

  // 3. Check TikTok Research API if token is provided
  const researchToken = process.env.TIKTOK_RESEARCH_ACCESS_TOKEN || process.env.TIKTOK_ACCESS_TOKEN;
  if (researchToken) {
    try {
      const researchUser = await fetchTikTokResearchUser(cleanHandle, researchToken);
      if (researchUser) {
        tiktokUserCache.set(cleanHandle, researchUser);
        return res.json({ success: true, data: { user: researchUser } });
      }
    } catch (err) {
      console.error('TikTok Research API lookup error:', err.message);
    }
  }

  // 3. Check custom creator profiles registry (exact real avatars and followers)
  const matchedCreator = findMatchingCreator(cleanHandle);
  if (matchedCreator) {
    const payload = {
      ...matchedCreator,
      stats: {
        follower_count: matchedCreator.follower_count,
        following_count: matchedCreator.following_count,
        heart_count: matchedCreator.heart_count || matchedCreator.likes
      }
    };
    tiktokUserCache.set(cleanHandle, payload);
    return res.json({
      success: true,
      data: {
        user: payload
      }
    });
  }

  // 4. Live TikTok creator display name via official oEmbed + avatar
  let displayName = cleanHandle.charAt(0).toUpperCase() + cleanHandle.slice(1);
  let avatarUrl = `https://unavatar.io/tiktok/${cleanHandle}`;
  let followers = 0;
  let likes = 0;
  let following = 0;

  try {
    const oembedPromise = fetchHttpsJson(`https://www.tiktok.com/oembed?url=https://www.tiktok.com/@${encodeURIComponent(cleanHandle)}`);
    const unavatarPromise = fetchHttpsJson(`https://unavatar.io/tiktok/${encodeURIComponent(cleanHandle)}?json`);

    const [oembedData, unavatarData] = await Promise.all([oembedPromise, unavatarPromise]);

    if (oembedData && oembedData.author_name) {
      displayName = oembedData.author_name;
    }

    if (unavatarData && unavatarData.url) {
      avatarUrl = unavatarData.url;
    }
  } catch (e) {
    console.error('TikTok public fetch error:', e.message);
  }

  // Fallback realistic baseline stats if no Research API token configured
  let hash = 0;
  for (let i = 0; i < cleanHandle.length; i++) {
    hash = (hash * 31 + cleanHandle.charCodeAt(i)) % 10000000;
  }
  followers = followers || ((hash % 850000) + 120);
  likes = likes || (hash % 50000);
  following = following || ((hash % 1200) + 12);

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

// API to save/override any custom TikTok creator profile dynamically
app.post('/api/custom-creator', (req, res) => {
  const { username, nickname, avatar, followers, following, likes } = req.body;
  if (!username) {
    return res.status(400).json({ success: false, error: 'Username is required' });
  }
  const clean = username.replace(/^@+/, '').trim().toLowerCase();
  const creatorData = {
    unique_id: clean,
    username: clean,
    nickname: nickname || clean,
    display_name: nickname || clean,
    avatar: avatar || '/assets/tiktok-logo.webp',
    avatar_url: avatar || '/assets/tiktok-logo.webp',
    avatarMedium: avatar || '/assets/tiktok-logo.webp',
    follower_count: parseInt(followers, 10) || 500,
    following_count: parseInt(following, 10) || 100,
    heart_count: parseInt(likes, 10) || 500,
    likes: parseInt(likes, 10) || 500
  };
  customCreators.set(clean, creatorData);
  tiktokUserCache.delete(clean);
  res.json({ success: true, user: creatorData });
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

module.exports = app;

