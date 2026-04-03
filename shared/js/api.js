// ═══ Gram Bazaar – API Client ═══
// Production mein VITE_API_URL ya window.GB_API_BASE se URL aata hai
const API_BASE = window.GB_API_BASE || 'https://gram-bazaar-backend.up.railway.app/api';

const api = {
  token: () => localStorage.getItem('gb_token'),

  headers() {
    const h = { 'Content-Type': 'application/json' };
    if (this.token()) h['Authorization'] = 'Bearer ' + this.token();
    return h;
  },

  async request(method, path, body) {
    try {
      const res = await fetch(API_BASE + path, {
        method,
        headers: this.headers(),
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await res.json();
      if (res.status === 401) {
        localStorage.clear();
        window.location.href = '../auth/login.html';
        return;
      }
      return data;
    } catch (err) {
      console.error('API Error:', err);
      return { success: false, message: 'Network error. Server se connect nahi ho pa raha.' };
    }
  },

  get:    (path)        => api.request('GET',    path),
  post:   (path, body)  => api.request('POST',   path, body),
  put:    (path, body)  => api.request('PUT',    path, body),
  delete: (path)        => api.request('DELETE', path),

  // ─── Auth helpers ──────────────────────────────────
  isLoggedIn: () => !!localStorage.getItem('gb_token'),
  getUser:    () => JSON.parse(localStorage.getItem('gb_user') || 'null'),
  getRole:    () => localStorage.getItem('gb_role'),

  setSession(token, user) {
    localStorage.setItem('gb_token', token);
    localStorage.setItem('gb_user',  JSON.stringify(user));
    localStorage.setItem('gb_role',  user.role);
  },

  async logout() {
    try {
      await fetch(API_BASE + '/auth/logout', {
        method: 'POST',
        headers: this.headers()
      });
    } catch(e) { /* ignore network errors on logout */ }
    localStorage.clear();
    window.location.href = '../auth/login.html';
  }
};

// ─── Socket.io real-time ────────────────────────────────
const SOCKET_BASE = window.GB_SOCKET_BASE || 'https://gram-bazaar-backend.up.railway.app';

function initSocket() {
  if (!api.token() || typeof io === 'undefined') return null;
  const socket = io(SOCKET_BASE, { auth: { token: api.token() } });

  socket.on('connect', () => console.log('🔌 Socket connected'));

  socket.on('new_order', (data) => {
    showToast('🔔 Nayi booking! ' + data.customer_name + ' – ₹' + data.total_amount, 'info');
    if (typeof onNewOrder === 'function') onNewOrder(data);
  });

  socket.on('order_update', (data) => {
    showToast('📦 Order update: ' + data.status);
    if (typeof onOrderUpdate === 'function') onOrderUpdate(data);
  });

  socket.on('payment_received', (data) => {
    showToast('💰 Payment mili! ₹' + data.amount, 'success');
  });

  socket.on('broadcast', (data) => {
    showToast('📢 ' + data.title + ': ' + data.body, 'info');
  });

  return socket;
}

// ─── Toast utility ──────────────────────────────────────
let _toastTimer;
function showToast(msg, type = 'default') {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    document.body.appendChild(t);
  }
  t.textContent  = msg;
  t.className    = 'toast show toast-' + type;
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}
