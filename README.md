# 🗺️ GIS LeafletJS Application - Frontend

Aplikasi Frontend Sistem Informasi Geografis (GIS) yang modern dan interaktif menggunakan LeafletJS.

> **Backend Repository**: https://github.com/violasptntels/Backend-Geographic-Information-System

![GIS App](https://img.shields.io/badge/GIS-LeafletJS-green)
![Node.js](https://img.shields.io/badge/Node.js-Express-blue)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)

## ✨ Fitur Utama

- 🗺️ **Peta Interaktif** dengan LeafletJS
- 📍 **Marker Kustom** dengan ikon kategori yang berbeda
- 🔍 **Pencarian & Filter** lokasi berdasarkan kategori
- ➕ **CRUD Operations** - Tambah, Edit, Hapus lokasi
- 📱 **Responsive Design** - Mobile friendly
- 🎨 **UI Modern** dengan animasi smooth
- 🌍 **Geolocation** - Deteksi lokasi pengguna
- 💾 **Dua Mode**:
  - **Mode Full**: Backend + MongoDB
  - **Mode Demo**: LocalStorage (tanpa backend)

## 📁 Struktur Folder

```
Geographic-Information-System (Frontend)/
├── public/                 # Frontend files
│   ├── css/
│   │   └── style.css      # Styling aplikasi
│   ├── js/
│   │   ├── config.js      # Konfigurasi API & Map
│   │   ├── app.js         # Logic aplikasi (mode full)
│   │   └── app-demo.js    # Logic aplikasi (mode demo)
│   ├── index.html         # Main page (mode full)
│   └── demo.html          # Demo page (mode demo)
├── package.json           # Dependencies frontend
├── README.md              # Dokumentasi
└── .gitignore

Backend-Geographic-Information-System (Terpisah)/
├── server/
│   ├── models/
│   │   └── Location.js
│   ├── routes/
│   │   └── locations.js
│   └── index.js
├── import-data.js
├── package.json
├── .env.example
└── README.md
```

## 🚀 Cara Menjalankan

### Mode Demo (Tanpa Backend)

1. **Gunakan Live Server atau HTTP Server:**
   ```bash
   npm install
   npm run dev
   ```

2. **Atau buka langsung di browser:**
   - Klik kanan pada `public/demo.html` > Open with Live Server
   - Atau buka `public/demo.html` di browser

**Mode demo** menggunakan LocalStorage untuk menyimpan data lokal di browser.

### Mode Full (Dengan Backend)

1. **Setup Backend terlebih dahulu:**
   ```bash
   git clone https://github.com/violasptntels/Backend-Geographic-Information-System.git
   cd Backend-Geographic-Information-System
   npm install
   npm run dev
   ```

2. **Backend akan berjalan di:** `http://localhost:3001`

3. **Setup Frontend:**
   ```bash
   npm install
   npm run dev
   ```

4. **Buka di browser:** `http://localhost:3000`

> **Catatan**: Pastikan Backend sudah running sebelum menggunakan mode full.

## 🌐 Deploy

### Frontend di GitHub Pages

```bash
npm run deploy:pages
```

Aplikasi akan live di:
```
https://violasptntels.github.io/Geographic-Information-System/
```

### Backend di Vercel

Lihat dokumentasi di repository backend:
https://github.com/violasptntels/Backend-Geographic-Information-System

### Update API URL (Setelah Backend Deploy)

Edit `public/js/config.js`:

```javascript
const API_CONFIG = {
    BASE_URL: 'https://your-vercel-backend.vercel.app/api'
};
```

Setelah itu, push ulang ke update frontend.


## 📡 API Endpoints

Semua endpoint API tercantum di repository Backend:
https://github.com/violasptntels/Backend-Geographic-Information-System

Backend Base URL (production): `https://your-vercel-backend.vercel.app/api`

## 🎨 Kategori Lokasi

- 🍽️ **Restaurant** - Restoran
- 🏨 **Hotel** - Hotel
- 📸 **Tourist Spot** - Tempat Wisata
- 🏫 **School** - Sekolah
- 🏥 **Hospital** - Rumah Sakit
- 🛒 **Shop** - Toko
- 📍 **Other** - Lainnya

## 🛠️ Teknologi yang Digunakan

### Frontend
- **LeafletJS** - Library peta interaktif
- **HTML5** - Struktur aplikasi
- **CSS3** - Styling dengan animasi modern
- **JavaScript (Vanilla)** - Logic aplikasi
- **Font Awesome** - Icons
- **Google Fonts** - Typography (Poppins)

### Backend (Repository Terpisah)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database NoSQL
- **Mongoose** - ODM untuk MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

Lihat: https://github.com/violasptntels/Backend-Geographic-Information-System

## 📱 Fitur UI/UX

- ✅ Desain modern dengan gradient dan shadow
- ✅ Animasi smooth untuk interaksi
- ✅ Custom marker dengan ikon kategori
- ✅ Popup informatif di peta
- ✅ Modal untuk form dan detail
- ✅ Toast notification
- ✅ Responsive design (mobile & desktop)
- ✅ Search dan filter real-time
- ✅ Geolocation untuk lokasi pengguna

## 🔧 Konfigurasi

### Map Configuration (`config.js`)

```javascript
const MAP_CONFIG = {
    DEFAULT_CENTER: [-6.200000, 106.816666], // Jakarta
    DEFAULT_ZOOM: 13,
    MIN_ZOOM: 5,
    MAX_ZOOM: 18,
    TILE_LAYER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
};
```

### API Configuration (`config.js`)

```javascript
const API_CONFIG = {
    BASE_URL: 'http://localhost:3000/api',
    // Untuk production, ganti dengan URL backend Anda
};
```

## 🐛 Troubleshooting

### MongoDB Connection Error
```
❌ MongoDB Connection Error: MongooseServerSelectionError
```
**Solusi:**
- Pastikan MongoDB service berjalan
- Check connection string di `.env`
- Pastikan IP Anda di-whitelist (untuk MongoDB Atlas)

### CORS Error
```
Access to fetch has been blocked by CORS policy
```
**Solusi:**
- CORS sudah di-enable di `server/index.js`
- Pastikan backend berjalan
- Check `API_CONFIG.BASE_URL` di `config.js`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solusi:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Atau ubah PORT di .env
PORT=3001
```

## 📄 License

MIT License - Feel free to use this project for your learning purposes.

## 👨‍💻 Author

Dibuat untuk Tugas UTS - Sistem Informasi Geografis

## 🙏 Credits

- [LeafletJS](https://leafletjs.com/) - Peta interaktif
- [OpenStreetMap](https://www.openstreetmap.org/) - Tile provider
- [Font Awesome](https://fontawesome.com/) - Icons
- [MongoDB](https://www.mongodb.com/) - Database

## 📞 Support

Jika ada pertanyaan atau masalah, silakan buat issue di repository ini.

---

⭐ **Star this repository** jika Anda merasa terbantu!

**Happy Coding! 🚀**
