# Usulan Arsitektur CALMATS MVP

**Status: menunggu review.** Dokumen ini mengusulkan arah teknis sebelum backend dan database dibuat. Aplikasi saat ini masih berupa prototipe statis; belum ada keputusan framework, skema database, atau akun admin.

## Rekomendasi

- **Backend:** Laravel 13 pada PHP 8.5.
- **UI:** Blade untuk halaman server-rendered; gunakan Livewire hanya untuk interaksi yang memang memerlukan pembaruan server tanpa pindah halaman. Pertahankan CSS dan JavaScript ringan Calmats saat memigrasikan UI.
- **Autentikasi:** starter kit resmi Laravel, dengan registrasi publik berperan `customer`; akun admin dibuat terpisah melalui seeder atau perintah deployment, bukan registrasi publik.
- **Database:** SQLite untuk pengembangan lokal dan pengujian; MySQL/MariaDB untuk deployment. Laravel mendukung kedua koneksi; runtime saat ini memiliki PDO untuk keduanya.
- **Penyimpanan foto:** filesystem lokal melalui abstraksi Storage Laravel. Validasi tipe dan ukuran di server, buat nama file sendiri, dan jangan menyajikan file Pending Community sebagai konten publik.
- **Checkout:** server menghitung ulang harga, promosi, status publikasi, dan stok sebelum menampilkan ringkasan. Setelah persetujuan pelanggan, buat pesan permintaan pesanan dan buka `wa.me` ke nomor yang disetel admin. Tidak ada tabel Order atau klaim pesanan terkonfirmasi.

Laravel dipilih karena kebutuhan akun, sesi, validasi server, migrasi, penyimpanan, dan CRUD admin akan membutuhkan banyak mekanisme keamanan jika dibuat sendiri. Blade mempertahankan alur server sederhana dan memungkinkan CSS/JS yang sudah ada dipindahkan bertahap tanpa SPA baru.

## Batasan yang dipertahankan

- Tidak ada payment gateway, order processing, order history, wishlist, alamat tersimpan, role/permission kompleks, atau penjadwalan.
- Guest cart tetap di browser. Cart pelanggan login tersimpan di database. Server tetap sumber kebenaran untuk harga dan stok.
- Promo diaktifkan manual; promo artikel mengalahkan promo varian dan keduanya tidak ditumpuk.
- Hanya artikel Published dan foto Community Approved yang dapat diakses publik.
- Jangan menghapus prototipe HTML saat bootstrap. Pindahkan halaman satu per satu setelah versi server-rendered siap.

## Struktur aplikasi yang disarankan

Ikuti struktur Laravel standar: `routes/web.php`, controller tipis, model Eloquent, migrations, Blade views, dan public assets. Letakkan validasi publikasi, kalkulasi harga final, penyesuaian stok, merge cart, serta validasi checkout di server. Gunakan transaksi database dan row lock ketika menyimpan perubahan stok.

Simpan nomor WhatsApp di `site_settings`, jangan hardcode nomor pribadi ke HTML/JavaScript. Simpan kredensial dan konfigurasi deployment di environment; jangan commit `.env`.

## Tahapan implementasi

1. **Bootstrap dan akses:** buat aplikasi Laravel, konfigurasi SQLite, migrasi awal, autentikasi, akun admin tunggal, proteksi dashboard, CRUD kategori, dan pengaturan WhatsApp.
2. **Produk dan inventori:** kategori, artikel, foto per warna, warna, ukuran, varian, promosi, status Ready Stock/Pre-order/Sold Out, serta penyesuaian stok dengan validasi ulang.
3. **Toko publik:** migrasikan landing, katalog, About, dan Community; implementasikan katalog dari data Published dan halaman detail/varian.
4. **Cart dan checkout:** guest cart, server cart, merge idempotent setelah login, ringkasan yang tervalidasi server, serta fallback salin pesan WhatsApp.
5. **Community dan rilis:** upload pelanggan login, moderasi admin, pengujian alur utama, keamanan, responsif, UAT, deployment, dan handover.

## Yang perlu direview sebelum bootstrap

1. Persetujuan stack Laravel 13 + Blade/Livewire + SQLite lokal + MySQL/MariaDB deployment.
2. Ketersediaan layanan MySQL/MariaDB di target deployment.
3. Kesesuaian ERD awal di [database-erd.md](database-erd.md).

Perubahan stack atau database setelah migrasi dibuat akan berdampak ke autentikasi, migrasi, deployment, dan seluruh modul produk; review dilakukan sebelum mengunci fondasi tersebut.

## Referensi teknis

- [Laravel 13 installation](https://laravel.com/framework/docs): penggunaan PHP, Composer, starter kit, dan SQLite/MySQL.
- [Laravel 13 starter kits](https://laravel.com/framework/docs/starter-kits): starter kit menyediakan routes/controllers/views autentikasi dan tersedia opsi Livewire.
- [Laravel 13 database](https://laravel.com/framework/docs/database): konfigurasi database dan dukungan SQLite/MySQL/MariaDB.
