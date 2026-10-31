# Rencana Implementasi CALMATS MVP

Rencana ini mengikuti dependensi pada development guide. Status repo saat ini: prototipe landing, katalog, dan galeri Community statis; belum ada backend atau database.

| Urutan | WBS | Hasil | Dependensi | Status |
|---|---|---|---|---|
| 0 | 2.1–2.7 | Review arsitektur dan ERD | Tidak ada | Usulan terdokumentasi; menunggu review |
| 1 | 3.1–3.9 | Laravel, environment, database, auth/admin, dashboard dasar, CRUD kategori, nomor WhatsApp | Urutan 0 | Belum mulai |
| 2 | 5.1–5.11 | CRUD artikel/foto/varian, harga, stok, promo, aturan publikasi dan inventori | Urutan 1 | Belum mulai |
| 3 | 4.1–4.12 | Layout publik server-rendered, About, katalog, pencarian/filter/sort/load more, detail/varian | Urutan 2 | UI statis sebagian; integrasi data belum mulai |
| 4 | 6.1–6.13 | Guest/server cart, merge idempotent, validasi ulang, checkout WhatsApp dan fallback | Urutan 2–3 | Belum mulai |
| 5 | 7.1–7.6 | Registrasi/login/profile pelanggan dan integrasi cart | Urutan 1, 4 | Belum mulai |
| 6 | 8.1–8.8 | Upload foto login-only, antrean moderasi, tampilan foto Approved | Urutan 1 | Galeri statis; alur upload/moderasi belum mulai |
| 7 | 9.1–9.12 | Test, UAT, keamanan/responsif, deployment, dokumentasi dan handover | Urutan 1–6 | Belum mulai |

Assignee, estimate, dan tanggal milestone belum ditetapkan dalam guide; tidak diisi agar tidak mengarang kapasitas atau jadwal tim.

## Keputusan setelah review arsitektur

Setelah stack dan ERD disetujui, pecah Urutan 1 menjadi issue kecil: bootstrap/env, migrasi dasar, autentikasi/role, middleware admin, layout dashboard, CRUD kategori, dan pengaturan kontak. Jangan mulai form produk atau checkout sebelum model varian dan aturan harga/stok siap.
