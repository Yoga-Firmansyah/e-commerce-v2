# E-Commerce Vue.js

## Tentang Project

Antarmuka platform e-commerce berbasis web untuk memudahkan pelanggan dalam berbelanja. Dikembangkan dengan menggunakan **Vue.js** dan **Tailwind CSS** untuk memastikan tampilan yang responsif dan modern. Menggunakan backend yang dibangun menggunakan **Laravel** dan terintegrasi dengan RajaOngkir untuk manajemen pengiriman dan Midtrans untuk manajemen pembayaran untuk memudahkan pelanggan dalam berbelanja. Backend dapat dilihat disini [E-commerce Backend](https://github.com/Yoga-Firmansyah/E-Commerce/tree/main/backend)
### Beberapa Fitur yang tersedia:
    - Daftar produk yang tersedia
    - Detail produk
    - Keranjang belanja
    - Checkout


## Instalasi

1. **Clone repository**  
   ```bash
   git clone https://github.com/Yoga-Firmansyah/e-commerce-v2.git
   cd e-commerce-v2
   ```
2. **Install dependency**  
   ```bash
   npm install
   ```
3. **Ubah URL API sesuai dengan url API kamu**  
   Buka file `axios.ts` dan ubah `axios.defaults.baseURL` sesuai dengan url API kamu
   ```bash
   axios.defaults.baseURL = 'Your_API_URL'
   ```
4. **Jalankan**  
   Untuk development
   ```bash
   npm run dev
   ```
   Untuk production
   ```bash
   npm run build
   ```
