# Deploy ke GitHub Pages

# 1. Build folder public sebagai root
# Pastikan semua file ada di folder public/

# 2. Buat repository GitHub baru
# 3. Push code ke GitHub

# Untuk GitHub Pages dengan backend terpisah, Anda perlu:
# - Deploy frontend ke GitHub Pages (demo.html sebagai index)
# - Deploy backend ke platform seperti Heroku, Railway, atau Vercel

# Copy demo.html sebagai index.html untuk GitHub Pages
Copy-Item public/demo.html public/index.html

# Init git jika belum
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - GIS LeafletJS App"

# Add remote (ganti dengan URL repository Anda)
# git remote add origin https://github.com/username/repository.git

# Push ke GitHub
# git push -u origin main

# Enable GitHub Pages di Settings > Pages
# Pilih branch: main
# Pilih folder: / (root)
# Save

# Website akan tersedia di: https://username.github.io/repository/
