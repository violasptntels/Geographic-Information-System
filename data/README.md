# 📊 Sample Data Locations

File ini berisi 18 sample data lokasi di Jakarta dan sekitarnya untuk aplikasi GIS.

## 📁 File yang Tersedia

- **sample-locations.json** - Data JSON siap import ke MongoDB

## 📍 Data yang Tersedia

### Tempat Wisata (Tourist Spot) - 3 lokasi
1. Monas (Monumen Nasional)
2. Kota Tua Jakarta
3. Taman Mini Indonesia Indah (TMII)

### Toko/Mall (Shop) - 3 lokasi
4. Grand Indonesia
5. Plaza Indonesia
6. Pacific Place Jakarta

### Hotel - 3 lokasi
7. Hotel Indonesia Kempinski
8. The Ritz-Carlton Jakarta, Pacific Place
9. The Dharmawangsa Jakarta

### Restoran (Restaurant) - 3 lokasi
10. Café Batavia
11. Plataran Menteng
12. Lara Djonggrang

### Sekolah (School) - 3 lokasi
13. Universitas Indonesia (UI)
14. Universitas Negeri Jakarta (UNJ)
15. SMA Negeri 8 Jakarta

### Rumah Sakit (Hospital) - 3 lokasi
16. RSUPN Dr. Cipto Mangunkusumo
17. RS Pondok Indah
18. Siloam Hospitals Lippo Village

## 🚀 Cara Import Data

### Cara 1: Menggunakan NPM Script (Recommended)

```bash
npm run import
```

### Cara 2: Menggunakan Node.js

```bash
node import-data.js
```

### Cara 3: Menggunakan MongoDB Compass

1. Buka MongoDB Compass
2. Connect ke database `gis_database`
3. Pilih collection `locations`
4. Klik "Add Data" > "Import File"
5. Pilih file `sample-locations.json`
6. Import

### Cara 4: Menggunakan MongoDB Shell

```bash
mongosh
use gis_database
db.locations.insertMany(<paste JSON content here>)
```

### Cara 5: Import via mongoimport (CLI)

```bash
mongoimport --db gis_database --collection locations --file data/sample-locations.json --jsonArray
```

## 📝 Format Data

Setiap lokasi memiliki struktur:

```json
{
  "name": "Nama Lokasi",
  "description": "Deskripsi lokasi",
  "category": "restaurant|hotel|tourist_spot|school|hospital|shop|other",
  "coordinates": {
    "lat": -6.123456,
    "lng": 106.123456
  },
  "address": "Alamat lengkap",
  "rating": 4.5,
  "imageUrl": "https://example.com/image.jpg"
}
```

## 🔄 Update Data

Jika ingin menambah data baru:

1. Edit file `sample-locations.json`
2. Tambahkan data baru dengan format yang sama
3. Jalankan `npm run import`

**Note:** Script import akan menghapus data lama dan menggantinya dengan data baru. Jika ingin keep data lama, comment baris `deleteMany()` di file `import-data.js`.

## 🗺️ Sumber Koordinat

Koordinat diambil dari Google Maps untuk akurasi lokasi yang tepat.

## 📸 Sumber Gambar

Gambar menggunakan Unsplash dengan lisensi bebas untuk keperluan demonstrasi.
