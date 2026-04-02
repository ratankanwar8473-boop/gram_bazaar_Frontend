# 🌾 Gram Bazaar – Full Stack Mobile Web App

**Rural India ke liye complete marketplace** – Node.js + Express + MySQL + Socket.io

---

## 📁 Project Structure

```
gram_bazaar/
├── index.html                  ← Landing page (entry point)
├── manifest.json               ← PWA manifest
│
├── backend/                    ← Node.js + Express API
│   ├── server.js               ← Main server entry point
│   ├── .env.example            ← Environment variables template
│   ├── package.json
│   ├── config/
│   │   └── db.js               ← MySQL connection pool
│   ├── middleware/
│   │   └── auth.js             ← JWT auth + role guard
│   ├── controllers/
│   │   ├── authController.js   ← Register, Login, Profile
│   │   ├── orderController.js  ← Create, Update, List orders
│   │   ├── sellerController.js ← Seller dashboard, services, reviews
│   │   ├── adminController.js  ← Admin panel APIs
│   │   ├── paymentController.js← UPI payment flow
│   │   └── notificationController.js
│   ├── routes/
│   │   └── index.js            ← All API routes
│   └── socket/
│       └── index.js            ← Real-time Socket.io events
│
├── frontend/
│   ├── auth/
│   │   └── login.html          ← Login + Register page
│   ├── customer/
│   │   └── index.html          ← Customer App (your original + API)
│   ├── seller/
│   │   └── index.html          ← Seller App (your original + API)
│   ├── admin/
│   │   └── index.html          ← Admin Panel (full dashboard)
│   └── shared/
│       └── js/
│           └── api.js          ← API client + Socket helper
│
└── database/
    └── gram_bazaar_schema.sql  ← Full MySQL schema + seed data
```

---

## 🚀 Setup – Step by Step

### Step 1 – MySQL Database Setup

```bash
# MySQL mein login karein
mysql -u root -p

# Schema import karein
mysql -u root -p < database/gram_bazaar_schema.sql
```

### Step 2 – Backend Setup

```bash
cd backend

# Dependencies install karein
npm install

# .env file banayein
cp .env.example .env

# .env mein apni details bharein:
# DB_PASSWORD=apna_mysql_password
# JWT_SECRET=koi_bhi_secret_string_change_kar_lo
```

### Step 3 – Server Start Karein

```bash
# Development mode (auto-restart)
npm run dev

# Production mode
npm start
```

Server chalega: `http://localhost:5000`

### Step 4 – Frontend Kholo

```bash
# Project ke root folder mein
cd ..

# Simple HTTP server start karein
npx serve .
# Ya
python3 -m http.server 8080
```

Browser mein: `http://localhost:8080`

---

## 🔑 Default Login Credentials

| Role | Phone | Password |
|------|-------|----------|
| Admin | 9999999999 | Admin@123 |

---

## 📡 API Endpoints

### Auth
| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/auth/register` | Naya user register |
| POST | `/api/auth/login` | Login + JWT token |
| GET | `/api/auth/profile` | Profile dekhein |
| PUT | `/api/auth/profile` | Profile update |
| PUT | `/api/auth/change-password` | Password change |

### Orders
| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/orders` | Naya order banayein |
| GET | `/api/orders/my` | Customer ke orders |
| GET | `/api/orders/seller` | Seller ke orders |
| GET | `/api/orders/:id` | Order detail |
| PUT | `/api/orders/:id/status` | Status update |

### Sellers
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/sellers` | Saare sellers list |
| GET | `/api/sellers/:id` | Seller detail |
| GET | `/api/seller/dashboard` | Seller stats |
| POST | `/api/seller/toggle-online` | Online/Offline toggle |
| POST | `/api/seller/services` | Service add/update |

### Payment
| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/payment/upi/initiate` | UPI link generate |
| POST | `/api/payment/confirm` | Payment confirm |
| GET | `/api/payment/transactions` | Transaction history |

### Admin
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/admin/overview` | Dashboard stats |
| GET | `/api/admin/users` | All users list |
| PUT | `/api/admin/users/:id/toggle` | User activate/deactivate |
| GET | `/api/admin/orders` | All orders |
| POST | `/api/admin/broadcast` | Notification bhejein |

---

## ⚡ Real-time Events (Socket.io)

| Event | Direction | Description |
|-------|-----------|-------------|
| `new_order` | Server → Seller | Nayi booking aayi |
| `order_update` | Server → Customer | Order status change |
| `payment_received` | Server → Seller | Payment aa gayi |
| `broadcast` | Server → All | Admin notification |
| `seller_status` | Client → Server | Online/Offline change |

---

## 🛠️ Environment Variables (.env)

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=gram_bazaar
JWT_SECRET=change_this_to_something_secret
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:8080
```

---

## 📦 Deploy Karne ke Options

### Option 1 – VPS (Recommended)
```bash
# Server par
git clone ... / zip upload
cd gram_bazaar/backend
npm install --production
# PM2 se run karein
npm install -g pm2
pm2 start server.js --name gram-bazaar
pm2 startup && pm2 save
```

### Option 2 – Railway / Render (Free)
1. GitHub par push karein
2. Railway.app → New Project → GitHub repo
3. Environment variables set karein
4. MySQL addon add karein

### Option 3 – Local (XAMPP + Node)
1. XAMPP se MySQL start karein
2. Schema import karein
3. `npm run dev` backend start karein
4. `npx serve .` frontend start karein

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js 18+ + Express 4 |
| Database | MySQL 8 |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Real-time | Socket.io 4 |
| Frontend | Vanilla HTML/CSS/JS (PWA) |
| Security | Helmet + Rate Limiting + CORS |

---

*🌾 Gram Bazaar v1.0 – Built for Rural India*
