# 🗺️ GIS LeafletJS Application

Aplikasi Sistem Informasi Geografis (GIS) yang modern dan interaktif menggunakan LeafletJS, Node.js/Express, dan MongoDB.

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
Tugas UTS/
├── public/                 # Frontend files
│   ├── css/
│   │   └── style.css      # Styling aplikasi
│   ├── js/
│   │   ├── config.js      # Konfigurasi API & Map
│   │   ├── app.js         # Logic untuk mode full
│   │   └── app-demo.js    # Logic untuk mode demo
│   ├── index.html         # Main page (mode full)
│   └── demo.html          # Demo page (mode demo)
├── server/                # Backend files
│   ├── models/
│   │   └── Location.js    # MongoDB schema
│   ├── routes/
│   │   └── locations.js   # API routes
│   └── index.js           # Server utama
├── package.json           # Dependencies
├── .env.example           # Environment variables template
└── README.md             # Dokumentasi
```

## 🚀 Cara Menjalankan

### Mode Demo (Tanpa Backend)

1. **Buka file HTML langsung di browser:**
   ```bash
   # Buka demo.html dengan browser
   # Double click pada file atau
   # Klik kanan > Open with > Browser pilihan Anda
   ```

2. **Atau gunakan Live Server:**
   - Install ekstensi Live Server di VS Code
   - Klik kanan pada `demo.html` > Open with Live Server

**Mode demo** menggunakan LocalStorage untuk menyimpan data, jadi tidak perlu setup backend atau database.

### Mode Full (Dengan Backend & MongoDB)

#### 1. Install Dependencies

```bash
npm install
```

#### 2. Setup MongoDB

**Opsi A: MongoDB Local**
- Install MongoDB Community Edition
- Jalankan MongoDB service
- Database akan dibuat otomatis dengan nama `gis_database`

**Opsi B: MongoDB Atlas (Cloud - Gratis)**
- Daftar di [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Buat cluster gratis
- Dapatkan connection string

#### 3. Setup Environment Variables

```bash
# Copy .env.example ke .env
cp .env.example .env

# Edit .env dengan connection string Anda
MONGODB_URI=mongodb://localhost:27017/gis_database
# Atau untuk MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gis_database

PORT=3000
```

#### 4. Jalankan Backend Server

```bash
# Development mode (dengan auto-restart)
npm run dev

# Production mode
npm start
```

Server akan berjalan di: `http://localhost:3000`

#### 5. Buka Frontend

Buka browser dan akses: `http://localhost:3000`

Atau buka `public/index.html` dengan Live Server dan pastikan API_CONFIG.BASE_URL di `config.js` mengarah ke backend Anda.

## 🌐 Deploy ke GitHub Pages

### Cara 1: Deploy Demo Version (Tanpa Backend)

1. **Copy demo.html sebagai index.html:**
   ```bash
   Copy-Item public/demo.html public/index.html
   ```

2. **Push ke GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/repository.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Buka Settings > Pages
   - Source: Deploy from a branch
   - Branch: main, folder: / (root)
   - Save

4. **Website akan tersedia di:**
   ```
   https://username.github.io/repository/
   ```

### Cara 2: Deploy Full Version (Frontend + Backend)

**Frontend di GitHub Pages:**
- Ikuti langkah di atas tapi gunakan `index.html`
- Update `API_CONFIG.BASE_URL` di `config.js` dengan URL backend Anda

**Backend di Platform Cloud:**

**Opsi A: Railway**
1. Daftar di [Railway.app](https://railway.app)
2. New Project > Deploy from GitHub
3. Pilih repository Anda
4. Add MongoDB service
5. Set environment variables
6. Deploy

**Opsi B: Render**
1. Daftar di [Render.com](https://render.com)
2. New > Web Service
3. Connect repository
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add environment variables
7. Deploy

**Opsi C: Heroku**
1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create app-name`
4. Add MongoDB: `heroku addons:create mongolab`
5. Deploy: `git push heroku main`

## 📝 API Endpoints

### Locations

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/locations` | Get semua lokasi |
| GET | `/api/locations?category=restaurant` | Filter by category |
| GET | `/api/locations?search=keyword` | Search lokasi |
| GET | `/api/locations/:id` | Get lokasi by ID |
| POST | `/api/locations` | Tambah lokasi baru |
| PUT | `/api/locations/:id` | Update lokasi |
| DELETE | `/api/locations/:id` | Hapus lokasi |

### Contoh Request Body (POST/PUT)

```json
{
  "name": "Restoran Sederhana",
  "category": "restaurant",
  "coordinates": {
    "lat": -6.200000,
    "lng": 106.816666
  },
  "address": "Jl. Contoh No. 123, Jakarta",
  "description": "Restoran dengan masakan Indonesia",
  "rating": 4.5,
  "imageUrl": "https://example.com/image.jpg"
}
```

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

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database NoSQL
- **Mongoose** - ODM untuk MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

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
