## Kasir App

Aplikasi kasir sederhana berbasis React untuk memilih menu, menambahkan ke keranjang, dan menyimpan riwayat pesanan.

## Fitur Utama

- Kategori menu: `Makanan`, `Minuman`, `Cemilan`
- Daftar produk dengan gambar
- Keranjang belanja (tambah, edit jumlah/keterangan, hapus)
- Checkout/Bayar
- Halaman riwayat pesanan
- Fallback data hardcode jika API tidak tersedia

## Tech Stack

- React (Create React App)
- React Bootstrap
- Axios
- json-server (mock API lokal)

## Sumber Data

Data mock lokal disimpan di:

- `db.json`

Resource utama:

- `categories`
- `products`
- `keranjangs`
- `pesanans`

## Menjalankan Project (Lokal)

Install dependency:

```bash
npm install
```

Jalankan frontend + json-server dalam 1 terminal:

```bash
npm run dev
```

App berjalan di:

- Frontend: `http://localhost:3000`
- API: `http://localhost:3004`

## Scripts

- `npm start` -> jalankan React app
- `npm run server` -> jalankan json-server (`db.json`, port 3004)
- `npm run dev` -> jalankan React app + json-server bersamaan
- `npm run build` -> build production

## Catatan Deploy (Vercel)

- Konfigurasi API saat ini memakai `http://localhost:3004/` di `src/utils/constants.js`.
- Saat deploy, endpoint localhost tidak tersedia.
- Supaya menu tetap tampil, project ini sudah punya fallback `FALLBACK_CATEGORIES` dan `FALLBACK_PRODUCTS` di frontend.
- Fitur yang butuh simpan data (`keranjang`, `riwayat`) tetap memerlukan backend publik agar persisten.

## Push ke GitHub

Pastikan file berikut ikut ter-commit:

- `db.json`
- `package.json`
- `package-lock.json`
- `public/assets/images/` (jika ada perubahan gambar)

Contoh:

```bash
git add .
git commit -m "Update kasir app"
git push
```
