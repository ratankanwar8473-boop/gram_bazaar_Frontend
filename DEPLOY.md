# 🚀 Gram Bazaar – Deploy Guide
## Vercel (Frontend) + Railway (Backend + MySQL)

---

## Step 1️⃣ – GitHub Par Upload Karo

```bash
git init
git add .
git commit -m "Initial commit – Gram Bazaar v1.0"
git branch -M main
git remote add origin https://github.com/TERA_USERNAME/gram-bazaar.git
git push -u origin main
```

---

## Step 2️⃣ – Railway Par Backend + MySQL Deploy

### A) Railway Account + Project Banao
1. [railway.app](https://railway.app) pe signup karo (GitHub se)
2. **"New Project"** → **"Deploy from GitHub repo"** → apna `gram-bazaar` repo select karo
3. **Root Directory** set karo: `backend`

### B) MySQL Database Add Karo
1. Railway project mein **"+ New"** → **"Database"** → **"Add MySQL"**
2. MySQL plugin apne aap Railway project se connect ho jayega
3. MySQL plugin pe click karo → **"Data"** tab → **"Query"** section mein SQL paste karo:
   ```sql
   -- Copy karo: database/gram_bazaar_schema.sql ka poora content
   ```
   Ya **"Connect"** tab se connection string copy karo aur MySQL Workbench se import karo.

### C) Backend Environment Variables Set Karo
Railway project → apna service → **"Variables"** tab:

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `JWT_SECRET` | `koi_bhi_random_string_min_32_chars` |
| `JWT_EXPIRES_IN` | `7d` |
| `ADMIN_EMAIL` | `admin@grambazaar.in` |
| `ADMIN_PASSWORD` | `Admin@123` |
| `FRONTEND_URL` | *(Step 3 ke baad Vercel URL daalna)* |

> **Note:** `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` Railway MySQL plugin se auto-link ho jaate hain. Inhe manually add karne ki zarurat nahi.

### D) Railway URL Note Karo
Deploy hone ke baad Railway ek URL deta hai:
`https://gram-bazaar-backend-production.up.railway.app`

---

## Step 3️⃣ – Vercel Par Frontend Deploy

### A) config.js Update Karo
`frontend/shared/js/config.js` mein Railway URL daalo:
```javascript
window.GB_API_BASE    = 'https://TERI_RAILWAY_URL.railway.app/api';
window.GB_SOCKET_BASE = 'https://TERI_RAILWAY_URL.railway.app';
```
Commit + push karo.

### B) Vercel Deploy
1. [vercel.com](https://vercel.com) → **"Add New Project"** → GitHub repo select karo
2. **Root Directory**: `/` (root, backend nahi)
3. **Framework Preset**: `Other`
4. **Build Command**: *(khali choddo)*
5. **Output Directory**: `.` (dot, yaani root)
6. **"Deploy"** click karo

### C) Vercel URL Note Karo
`https://gram-bazaar.vercel.app`

Railway mein **`FRONTEND_URL`** variable update karo with Vercel URL.

---

## Step 4️⃣ – Final Check

```bash
# Backend health check
curl https://TERI_RAILWAY_URL.railway.app/health

# Expected:
# {"status":"ok","app":"Gram Bazaar API","time":"..."}
```

Browser mein open karo: `https://gram-bazaar.vercel.app`

---

## 📲 PWA "Install as App" – Kaise Kaam Karta Hai

App open karne ke baad **2 seconds mein** ek banner aata hai:

> 📲 **App Install Karein** – Home screen par add karein – offline bhi chalega!

- **Android Chrome**: Banner automatically aata hai → "Install" dabao
- **iPhone Safari**: Share button → "Add to Home Screen"
- **Desktop Chrome**: Address bar mein install icon aata hai

---

## 🔧 Local Development (Testing)

```bash
# Terminal 1 – Backend
cd backend
cp .env.example .env
# .env mein DB credentials bharo
npm install
npm run dev

# Terminal 2 – Frontend  
# Root folder mein:
npx serve .
# Browser: http://localhost:3000

# config.js mein localhost URL use karo:
# window.GB_API_BASE = 'http://localhost:5000/api';
```

---

## ⚠️ Common Issues

| Problem | Solution |
|---------|----------|
| CORS error | Railway mein `FRONTEND_URL` = exact Vercel URL daalo |
| DB connect failed | Railway MySQL variables check karo |
| Socket.io disconnect | Railway free tier pe sone lagta hai, upgrade karo |
| Install prompt nahi aaya | HTTPS zaruri hai (Vercel pe automatically HTTPS hota hai) |
| Icons nahi dikh rahi | `frontend/shared/icons/` mein `icon-192.png` aur `icon-512.png` hona chahiye |

---

*🌾 Gram Bazaar v1.0 – Deploy Guide*
