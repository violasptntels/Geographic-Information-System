# 🚀 Deploy ke Vercel

Panduan lengkap untuk deploy aplikasi GIS ke Vercel.

## ✅ Prasyarat

- GitHub account dengan repository GIS
- Vercel account (gratis, login via GitHub)
- MongoDB Atlas account (cloud database gratis)

## 📋 Langkah-Langkah Deploy

### 1. Setup MongoDB Atlas (Cloud Database)

```
1. Buka https://www.mongodb.com/cloud/atlas
2. Sign up dengan GitHub account Anda
3. Create free cluster
4. Buat user database:
   - Username: violasptntels
   - Password: (generate secure password)
5. Whitelist IP: Allow Access from Anywhere (0.0.0.0/0)
6. Dapatkan connection string:
   mongodb+srv://username:password@cluster.mongodb.net/gis_database?retryWrites=true&w=majority
7. Copy connection string, Anda butuh ini untuk Vercel
```

### 2. Push ke GitHub

```powershell
# Commit semua perubahan
git add .
git commit -m "Prepare for Vercel deployment - add vercel.json and update config"
git push origin main
```

### 3. Deploy ke Vercel

```
1. Buka https://vercel.com
2. Login dengan GitHub
3. Klik "New Project"
4. Pilih repository "Geographic-Information-System"
5. Framework Preset: Other (biarkan default)
6. Build & Output Settings:
   - Build Command: npm install
   - Output Directory: public
   - Install Command: npm install
7. Environment Variables, tambahkan:
   - MONGODB_URI: mongodb+srv://username:password@cluster.mongodb.net/gis_database
   - PORT: 3001
8. Klik "Deploy"
9. Tunggu build selesai ✅
```

### 4. Verifikasi Deployment

Aplikasi akan live di:
```
https://your-vercel-domain.vercel.app
```

**Test endpoints:**
- Frontend: `https://your-vercel-domain.vercel.app`
- API: `https://your-vercel-domain.vercel.app/api/locations`

## 🔧 Struktur Vercel

File `vercel.json` sudah dikonfigurasi untuk:

```json
{
  "builds": [
    {
      "src": "server/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "public/$1"
    }
  ]
}
```

Ini membuat:
- `/api/*` → Backend Express server
- `/*` → Serve file statis dari `public/`

## 🎯 Testing Lokal Vercel

Untuk test deployment lokal sebelum push ke Vercel:

```powershell
# Install Vercel CLI
npm install -g vercel

# Login ke Vercel
vercel login

# Build & test lokal
vercel dev
```

Aplikasi akan jalan di `http://localhost:3000` dengan setup sama seperti di production.

## ⚠️ Tips & Troubleshooting

### Aplikasi tidak koneksi ke MongoDB
- **Solusi**: Pastikan IP whitelist di MongoDB Atlas aktif (0.0.0.0/0)
- Atau tambahkan IP Vercel ke whitelist

### API endpoint 404
- Pastikan `vercel.json` sudah benar
- Check routes di `vercel.json` sesuai struktur folder

### Build failure di Vercel
- Check build logs di Vercel dashboard
- Pastikan `package.json` semua dependencies tercantum
- Run `npm install` lokal untuk test

### Database Bloat
- Vercel free tier cocok untuk aplikasi kecil
- Untuk production, upgrade ke Vercel Pro atau gunakan platform lain

## 🔄 Update Aplikasi

Setiap kali push ke `main` branch di GitHub, Vercel otomatis redeploy:

```powershell
# Edit kode lokal
# Commit & push
git add .
git commit -m "Update fitur xyz"
git push origin main

# Vercel otomatis build & deploy
# Check status di https://vercel.com/dashboard
```

## 📊 Environment Variables di Vercel

Untuk ubah atau tambah environment variables:

```
1. Buka https://vercel.com/dashboard
2. Pilih project GIS
3. Settings > Environment Variables
4. Edit/Tambah variable
5. Re-deploy jika perlu
```

## ✨ Custom Domain (Opsional)

Untuk gunakan domain custom (misal: gis.yourdomain.com):

```
1. Vercel Dashboard > Project > Settings > Domains
2. Add Custom Domain
3. Update DNS records di domain registrar Anda
4. Tunggu DNS propagate (~24 jam)
```

---

**Status**: ✅ Siap deploy ke Vercel

**Perintah Deploy Quick:**
```powershell
git add .
git commit -m "Update untuk Vercel"
git push origin main
# Vercel otomatis deploy!
```

🎉 Selamat, aplikasi Anda sudah production-ready!
