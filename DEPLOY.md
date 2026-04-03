# 🌾 Gram Bazaar v2 – Deploy Guide

## Frontend (Vercel)
1. Is zip ke files Vercel dashboard mein upload karein
2. Root directory `/` set karein
3. Deploy karein – koi build step nahi chahiye

## Backend (Railway)
1. Backend zip Railway mein deploy karein
2. Environment variables set karein:
   - `JWT_SECRET` = koi bhi random string (e.g. `grambazaar_secret_2024`)
   - `MYSQLHOST`, `MYSQLPORT`, `MYSQLUSER`, `MYSQLPASSWORD`, `MYSQLDATABASE` (Railway auto-set karta hai)
3. **First deployment ke baad** ek baar run karein:
   ```
   npm run setup
   ```
   Ya Railway Console mein: `node setup-superadmin.js`

## Super Admin Access
- 🔑 Phone: **8875448173**
- 🔒 Password: **Laksh@8173**
- 🌐 URL: `https://your-app.vercel.app/super-admin/index.html`
- Ya login page par Customer button ke neeche chhupa hua **dot (·)** 3 baar click karein

## Super Admin Features
- 📊 Dashboard – users, sellers, orders, revenue
- 👥 All Users – search, filter, block/unblock
- 🏪 Sellers – manage, license assign
- 🪪 Licenses – sellers ko paid license assign/renew/revoke
  - Customer: HAMESHA FREE
  - Seller: Monthly ₹299 / Yearly ₹2499 / Lifetime
- 📦 Orders – sabhi orders monitor
- 📢 Broadcast – notifications bhejein
- ⚙️ Settings – app on/off, pricing
- 🔑 Password change – apna password change karein

## PWA Install
- **Android**: Automatically banner show hoga
- **iPhone/iPad**: Share button → "Add to Home Screen"
- Play Store / App Store ki zaroorat NAHI hai!
