# CALMATS Website MVP — Development Guide

> **Tujuan:** Panduan kerja untuk mengembangkan website CALMATS berdasarkan hasil interview, kebutuhan sistem, dan WBS awal.
>
> **Status:** Baseline awal. Detail kecil yang belum diputuskan mengikuti praktik yang sederhana, konsisten, aman, dan mudah dipelihara. Perubahan yang memengaruhi scope, keamanan, integritas stok, arsitektur, atau biaya besar harus ditinjau sebelum diterapkan.

---

## 1. Project Overview

CALMATS adalah brand fashion dengan perpaduan gaya **elegan dan streetwear**. Brand menekankan produk sederhana yang memiliki identitas dan cerita, serta filosofi tentang proses, kegagalan, keraguan, perjuangan, dan pertumbuhan. Konsep *Cupid* mengangkat perasaan, pilihan, arah, dan keberanian.

Website versi pertama (MVP) berfungsi sebagai:
- Etalase digital dan katalog produk.
- Media untuk menyampaikan cerita dan filosofi brand.
- Sarana pelanggan memilih produk dan mengirim permintaan pesanan melalui WhatsApp.
- Sarana admin mengelola artikel, varian, harga, stok, promosi, dan konten Community.

**Model transaksi:** website tidak memproses pembayaran dan tidak mengonfirmasi pesanan secara otomatis. Checkout membuat ringkasan pesanan lalu membuka WhatsApp untuk meminta konfirmasi manual kepada admin. Pesan WhatsApp adalah **permintaan pesanan**, bukan bukti bahwa pesanan sudah dikonfirmasi.

### Target pengguna
- Target pasar Indonesia, terutama usia sekitar 15–22 tahun.
- Pelajar, mahasiswa, dan dewasa muda.
- Menyukai gaya bersih, elegan, dan memiliki identitas.
- Kisaran harga produk awal yang pernah dibahas: Rp120.000–Rp160.000.

## 2. Scope MVP

### 2.1 Termasuk MVP
- Landing page.
- Katalog produk.
- Pencarian nama artikel.
- Filter kategori dan ketersediaan.
- Sorting katalog.
- Halaman detail artikel, foto, warna, ukuran, harga, stok, dan promosi.
- Keranjang guest dan pelanggan login.
- Checkout melalui WhatsApp dengan ringkasan pesanan.
- Halaman About.
- Halaman Community.
- Registrasi, login, logout, dan profil dasar pelanggan.
- Dashboard admin tunggal.
- CRUD kategori, artikel, foto, warna, ukuran, varian, harga, stok, dan promosi.
- Pengaturan nomor WhatsApp utama melalui dashboard.
- Moderasi foto Community oleh admin.
- Pengujian, deployment, dan dokumentasi dasar.

### 2.2 Tidak termasuk MVP
- Payment gateway atau pembayaran otomatis.
- Konfirmasi pesanan otomatis.
- Sistem pemrosesan dan pelacakan pesanan lengkap.
- Riwayat pesanan pelanggan di website.
- Wishlist dan alamat pengiriman tersimpan.
- Multi-role admin dengan izin kompleks.
- Filter rentang harga, warna, dan ukuran pada katalog.
- Penjadwalan publikasi atau promosi otomatis.
- Pilihan bahasa oleh pelanggan.
- Fuzzy search atau pencarian yang mentoleransi salah ketik.

## 3. Aktor dan Hak Akses

### Guest / Pengunjung
- Melihat halaman publik, katalog, detail produk, About, dan Community.
- Mencari, memfilter, dan mengurutkan produk.
- Menambahkan produk ke keranjang di browser.
- Checkout melalui WhatsApp tanpa login.
- Tidak dapat mengunggah foto Community.

### Pelanggan terdaftar
- Registrasi, login, logout.
- Melihat dan mengedit profil dasar.
- Menggunakan keranjang yang tersimpan di server dan dapat diakses lintas perangkat.
- Mengunggah foto Community.
- Tidak memiliki riwayat pesanan, wishlist, atau alamat tersimpan pada MVP.

### Admin / Owner
- Satu akun admin pada MVP.
- Mengelola kategori, artikel, foto, varian, harga, stok, promosi, dan nomor WhatsApp.
- Mengelola status publikasi artikel.
- Meninjau dan memoderasi unggahan Community.
- Mengakses dashboard setelah autentikasi.

## 4. Product and Inventory Rules

### 4.1 Artikel dan publikasi
- Artikel memiliki status `Draft` atau `Published`.
- Publikasi dilakukan manual, tanpa penjadwalan.
- Draft tidak boleh tampil di halaman publik.
- Artikel Published tetap terlihat meskipun seluruh variannya Sold Out.
- Simpan waktu publikasi untuk sorting; waktu publikasi tidak harus ditampilkan kepada pelanggan.
- Artikel tidak dapat dipublikasikan jika data wajib atau foto per warna belum lengkap.

### 4.2 Foto produk
- Artikel dapat memiliki beberapa foto.
- Setiap warna wajib memiliki minimal satu foto khusus warna sebelum artikel dapat dipublikasikan.
- Foto tambahan bersifat opsional.
- Sebelum pelanggan memilih warna, tampilkan foto utama artikel.
- Setelah warna dipilih, tampilkan foto khusus warna tersebut.
- Mengubah atau mereset warna akan mereset pilihan ukuran; reset warna mengembalikan galeri ke foto utama.

### 4.3 Varian
Setiap varian merupakan kombinasi artikel, warna, dan ukuran. Harga serta stok dikelola pada tingkat varian.
- Tidak ada warna atau ukuran yang otomatis dipilih ketika halaman detail dibuka.
- Pelanggan dapat memilih warna atau ukuran terlebih dahulu; ketersediaan diperbarui sesuai pilihan.
- Ukuran Sold Out tetap terlihat, tetapi tidak dapat dipilih.
- Harga katalog adalah harga final terendah dari varian yang dapat dipesan.
- Jika semua varian Sold Out, sembunyikan harga dan tombol pembelian.

### 4.4 Status ketersediaan
- `Ready Stock`: varian memiliki stok tersedia.
- `Pre-order`: status diatur manual oleh admin untuk varian yang stoknya kosong; sifatnya informasional pada MVP.
- `Sold Out`: varian tidak memiliki stok dan tidak diaktifkan sebagai Pre-order.
- Pre-order tidak otomatis aktif saat stok mencapai nol.
- Varian Pre-order tidak dapat dipilih untuk masuk keranjang; pelanggan diarahkan menggunakan informasi kontak yang tersedia.
- Varian yang masih memiliki stok tetap Ready Stock meskipun admin mengaktifkan Pre-order untuk artikel yang sama.

### 4.5 Stok
- Stok dikelola per artikel/warna/ukuran.
- Admin memasukkan perubahan stok sebagai angka positif untuk penambahan atau pengurangan, kemudian mengonfirmasi ringkasan perubahan.
- Stok akhir tidak boleh negatif.
- Pengurangan melebihi stok tersedia harus ditolak.
- Alasan penyesuaian bersifat opsional.
- Riwayat stok tidak termasuk MVP; nilai stok terbaru yang disimpan.
- Validasi penting dilakukan di server, bukan hanya frontend.
- Jika data berubah sebelum konfirmasi, lakukan validasi ulang dan minta konfirmasi ulang bila perlu.

### 4.6 Promosi
- Mendukung diskon persentase dan nominal tetap.
- Promosi dapat berlaku pada artikel atau varian.
- Promosi artikel memiliki prioritas; promosi artikel dan varian tidak digabungkan.
- Jika promosi artikel tidak aktif, promosi varian dapat berlaku.
- Aktivasi dan deaktivasi dilakukan manual; tidak ada penjadwalan.
- Tampilkan harga normal dicoret, harga promosi, dan label diskon pada detail.
- Harga katalog memakai harga final terendah dari varian yang dapat dipesan.
- Validasi agar harga final tidak negatif.

## 5. Catalog and Navigation Rules

- Katalog hanya menampilkan artikel Published.
- Default sorting: terbaru.
- Opsi sorting: terbaru, terlama, termurah, termahal.
- Jika waktu publikasi sama, gunakan ID ascending sebagai tie-breaker.
- Pencarian berdasarkan sebagian nama artikel, case-insensitive.
- Trim spasi awal/akhir dan gabungkan spasi berulang.
- Hasil pencarian diperbarui saat pengguna mengetik.
- Saat pencarian aktif, gunakan sorting terbaru dan nonaktifkan dropdown sorting.
- Saat pencarian aktif, tampilkan seluruh hasil pencarian dan nonaktifkan Load More.
- Menghapus keyword dengan tombol `×` mempertahankan filter kategori/ketersediaan, mengatur sorting ke terbaru, mengembalikan tampilan awal enam item, dan mengaktifkan dropdown sorting.
- `Reset Filter` menghapus keyword dan seluruh filter serta mengembalikan sorting ke terbaru.
- Tanpa pencarian, katalog menampilkan enam item awal; `Load More` menambahkan enam item.
- Sembunyikan/nonaktifkan `Load More` ketika semua item sudah tampil.
- Filter kategori dan ketersediaan dapat digabung.
- Kategori tidak ditampilkan sebagai pilihan filter jika tidak ada artikel Published di kategori tersebut.
- Filter ketersediaan: Ready Stock, Pre-order, Sold Out.
- Filter Sold Out hanya menampilkan artikel jika semua variannya Sold Out dan tidak ada varian Pre-order.
- Kartu katalog tidak menampilkan label status ketersediaan.
- Setelah halaman kembali aktif, data katalog perlu diperbarui; halaman detail memvalidasi ulang data sebelum add-to-cart.

### Bahasa dan harga
- Navigasi/label brand dapat memakai istilah Inggris seperti `Home`, `Shop`, `About`, `Community`, `Shop Now`, dan `View Details`.
- Pesan transaksi dan sistem menggunakan Bahasa Indonesia.
- Format harga: `Rp120.000` tanpa desimal.
- Simpan harga sebagai nilai numerik di database, bukan string berformat.
- Timestamp disimpan dalam UTC dan ditampilkan/dioperasikan menggunakan zona waktu `Asia/Jakarta` (WIB).

## 6. Cart and WhatsApp Checkout

### 6.1 Keranjang
- Guest cart disimpan di browser.
- Cart pelanggan login disimpan di server; server menjadi sumber kebenaran.
- Tidak ada tombol hapus seluruh keranjang.
- Tombol minus ketika jumlah item satu meminta konfirmasi sebelum menghapus item.
- Setiap item memiliki tombol hapus dengan konfirmasi.
- Keranjang kosong menyediakan tombol `Shop Now` atau `Belanja Sekarang`.
- Ketika guest login, gabungkan guest cart dan server cart.
- Varian yang sama dijumlahkan; varian berbeda tetap terpisah.
- Setelah merge, jumlah dibatasi sesuai stok dan pengguna diberi tahu jika ada penyesuaian.
- Merge harus idempotent agar pengulangan proses tidak menggandakan jumlah lagi.
- Jika harga berubah, perbarui harga dan total serta beri tahu pengguna.
- Jika stok turun, sesuaikan jumlah dan beri tahu pengguna.
- Jika stok menjadi nol, tandai item tidak tersedia dan blokir checkout sampai diperbaiki/dihapus.
- Jika artikel menjadi Draft, hapus atau tandai item tidak tersedia dan beri tahu pengguna.

### 6.2 Checkout
- Guest dapat checkout tanpa login.
- Sebelum membuka WhatsApp, tampilkan ringkasan item, varian, jumlah, harga, dan total sementara.
- Validasi ulang status publikasi, harga, promo, dan stok dari server sebelum checkout.
- Jika data berubah, perbarui ringkasan dan minta persetujuan pengguna sebelum melanjutkan.
- Nama/email akun dapat dimasukkan ke pesan untuk pelanggan login; identitas guest tidak otomatis diisi.
- Tidak ada field catatan checkout tambahan pada MVP.
- Pesan WhatsApp menyebutkan bahwa detail pesanan perlu dikonfirmasi admin.
- Website tidak boleh mengklaim pesanan sudah terkirim atau terkonfirmasi sebelum benar-benar diketahui.
- Jika WhatsApp gagal dibuka, pertahankan ringkasan dan sediakan `Copy Order Message` serta `Try Open WhatsApp Again`.

### 6.3 Kontak
- Nomor WhatsApp utama diatur melalui dashboard.
- Validasi format nomor internasional; jika input tidak valid, tolak perubahan dan pertahankan nomor sebelumnya.
- Instagram dan email menggunakan konfigurasi kode.
- Footer publik memuat logo/nama, tagline, navigasi, WhatsApp, Instagram, dan copyright.
- Tidak ada halaman Contact khusus pada MVP.

## 7. Customer Account

- Registrasi, login, logout, profil dasar.
- Profil mencakup nama, email, dan pengaturan akun dasar.
- Pengguna dapat mengedit profil sesuai implementasi MVP.
- Password harus disimpan dengan hashing aman.
- Gunakan proteksi autentikasi dan validasi input.
- Jangan menambahkan riwayat pesanan, wishlist, atau alamat tersimpan kecuali scope diubah secara resmi.

## 8. Community

- Guest dapat melihat foto yang sudah Approved.
- Hanya pengguna login yang dapat mengunggah foto.
- Foto baru berstatus `Pending`.
- Foto Pending tidak ditampilkan di halaman publik.
- Admin dapat menyetujui atau menolak foto.
- Hanya foto `Approved` yang ditampilkan publik.
- Simpan informasi pengunggah, file, timestamp, dan status moderasi.
- Validasi tipe dan ukuran file; simpan upload dengan aman.
- Status minimal: `Pending`, `Approved`, `Rejected`.

## 9. Initial Data Model

Ini adalah entitas awal untuk dianalisis lebih lanjut, bukan skema final yang sudah diimplementasikan.

| Entity | Purpose |
|---|---|
| `User` | Akun pelanggan dan admin |
| `Category` | Kategori artikel |
| `Article` | Informasi artikel, deskripsi, kategori, status publikasi |
| `ArticleImage` | Foto artikel, warna terkait, urutan galeri |
| `Color` | Pilihan warna |
| `Size` | Pilihan ukuran |
| `ArticleVariant` | Kombinasi artikel, warna, ukuran, harga, stok, ketersediaan |
| `Promotion` | Jenis diskon dan target artikel/varian |
| `Cart` | Keranjang pelanggan login |
| `CartItem` | Varian dan jumlah di keranjang |
| `CommunityPhoto` | Foto, pengunggah, waktu, status moderasi |
| `SiteSetting` | Nomor WhatsApp utama dan pengaturan situs |

Relasi inti:
- Satu artikel memiliki banyak varian dan foto.
- Satu artikel termasuk dalam kategori.
- Satu varian merujuk pada satu warna dan satu ukuran.
- Promosi dapat berlaku untuk artikel atau varian dengan aturan prioritas.
- Satu keranjang memiliki banyak item.
- Satu pengguna dapat mengunggah banyak foto Community.
- Guest cart tidak harus tersimpan di tabel sebelum login.
- Jangan membuat tabel transaksi/order final pada MVP kecuali scope disetujui berubah.

## 10. WBS (Work Breakdown Structure)

WBS berikut adalah baseline awal. Durasi, assignee, dan milestone final ditetapkan setelah kapasitas tim serta dependensi direview.

### 1.0 Project Management
- **1.1** Finalisasi scope MVP dan baseline kebutuhan
- **1.2** Memelihara WBS dan backlog
- **1.3** Menyusun timeline dan milestone
- **1.4** Menetapkan penanggung jawab task
- **1.5** Menetapkan workflow GitHub dan Definition of Done
- **1.6** Memantau progres, hambatan, dan risiko
- **1.7** Mengelola perubahan scope
- **1.8** Menyusun laporan dan penutupan proyek

### 2.0 System Design
- **2.1** Menyusun spesifikasi sistem
- **2.2** Membuat use case
- **2.3** Membuat ERD
- **2.4** Membuat flowchart proses utama
- **2.5** Membuat wireframe
- **2.6** Membuat UI design
- **2.7** Menentukan arsitektur dan struktur project

### 3.0 Foundation & Admin
- **3.1** Setup repository dan project
- **3.2** Setup environment dan konfigurasi
- **3.3** Setup database dan migrasi awal
- **3.4** Implementasi autentikasi admin
- **3.5** Implementasi proteksi akses dashboard
- **3.6** Membuat layout dashboard
- **3.7** Membuat CRUD kategori
- **3.8** Membuat pengaturan nomor WhatsApp
- **3.9** Membuat validasi dan penanganan error dasar

### 4.0 Public Website
- **4.1** Membuat layout publik
- **4.2** Membuat navbar dan footer
- **4.3** Membuat landing page
- **4.4** Membuat About
- **4.5** Membuat halaman katalog
- **4.6** Membuat pencarian
- **4.7** Membuat filter kategori/ketersediaan
- **4.8** Membuat sorting
- **4.9** Membuat Load More
- **4.10** Membuat halaman detail artikel
- **4.11** Membuat galeri dan pilihan varian
- **4.12** Membuat layout responsif

### 5.0 Product & Inventory
- **5.1** CRUD artikel dan status publikasi
- **5.2** Pengelolaan foto artikel dan foto per warna
- **5.3** Pengelolaan warna dan ukuran
- **5.4** Pengelolaan varian
- **5.5** Pengaturan harga varian
- **5.6** Pengelolaan stok
- **5.7** Penyesuaian stok dengan konfirmasi
- **5.8** Aturan Ready Stock/Pre-order/Sold Out
- **5.9** Pengelolaan promosi artikel/varian
- **5.10** Validasi publikasi artikel
- **5.11** Validasi konsistensi harga, stok, dan status di server

### 6.0 Cart & WhatsApp Checkout
- **6.1** Membuat struktur keranjang
- **6.2** Membuat guest cart di browser
- **6.3** Membuat server cart untuk pelanggan login
- **6.4** Implementasi add-to-cart
- **6.5** Implementasi update kuantitas
- **6.6** Implementasi hapus item dan konfirmasi
- **6.7** Implementasi merge cart setelah login
- **6.8** Validasi harga, stok, promo, dan status publikasi
- **6.9** Penanganan perubahan data pada cart
- **6.10** Membuat ringkasan checkout
- **6.11** Membuat pesan pesanan WhatsApp
- **6.12** Implementasi buka WhatsApp
- **6.13** Fallback copy message dan retry

### 7.0 Customer Account
- **7.1** Registrasi
- **7.2** Login pelanggan
- **7.3** Logout
- **7.4** Halaman profil
- **7.5** Edit profil
- **7.6** Integrasi akun dan cart

### 8.0 Community
- **8.1** Membuat halaman Community
- **8.2** Menampilkan foto Approved
- **8.3** Implementasi upload foto
- **8.4** Validasi file upload
- **8.5** Menyimpan foto berstatus Pending
- **8.6** Membuat dashboard moderasi
- **8.7** Implementasi approve/reject
- **8.8** Penanganan status dan tampilan moderasi

### 9.0 Testing & Deployment
- **9.1** Menyusun test case dari acceptance criteria
- **9.2** Menguji autentikasi dan hak akses
- **9.3** Menguji katalog, pencarian, filter, dan sorting
- **9.4** Menguji detail produk, varian, stok, dan promosi
- **9.5** Menguji cart dan merge
- **9.6** Menguji checkout WhatsApp dan fallback
- **9.7** Menguji Community dan moderasi
- **9.8** Menguji keamanan dasar
- **9.9** Menguji responsivitas
- **9.10** Melaksanakan UAT
- **9.11** Deployment
- **9.12** Dokumentasi dan handover

## 11. Main Dependencies and Suggested Build Order

1. Requirements baseline dan rancangan sistem.
2. Repository, environment, database, autentikasi admin.
3. Kategori, artikel, foto, varian, harga, stok, promosi.
4. Public layout, landing page, About, katalog, detail produk.
5. Guest cart, server cart, validasi cart, ringkasan checkout, WhatsApp.
6. Registrasi/login/profil dan integrasi cart.
7. Community upload dan moderasi.
8. Pengujian integrasi, keamanan, responsivitas, dan UAT.
9. Deployment dan handover.

Pekerjaan desain UI, penulisan test case, dan dokumentasi dapat berjalan paralel bila tidak menghambat dependensi teknis.

## 12. Definition of Done (DoD)

Sebuah task dianggap selesai apabila:
- Implementasi sesuai deskripsi dan acceptance criteria.
- Validasi penting dilakukan di server bila relevan.
- Tampilan berfungsi pada desktop dan mobile sesuai kebutuhan.
- Tidak ada error kritis yang diketahui pada alur yang disentuh.
- Perubahan diuji secara manual dan/atau otomatis sesuai jenis task.
- Kode sudah direview melalui Pull Request bila workflow tim menggunakannya.
- Dokumentasi/configuration yang relevan diperbarui.
- Perubahan sudah digabungkan ke branch integrasi yang disepakati.

Jangan tandai fitur selesai hanya karena tampilannya sudah dibuat; alur dan kondisi error juga perlu diuji.

## 13. Acceptance Criteria MVP

- [ ] Pengunjung hanya dapat melihat artikel Published.
- [ ] Draft tidak tampil di halaman publik.
- [ ] Pencarian, filter, sorting, dan Load More mengikuti aturan katalog.
- [ ] Varian warna/ukuran menampilkan harga dan ketersediaan yang benar.
- [ ] Artikel tidak dapat dipublikasikan jika data/foto wajib belum lengkap.
- [ ] Admin dapat mengubah stok tanpa membuat stok negatif.
- [ ] Promosi artikel dan varian mengikuti aturan prioritas.
- [ ] Guest dapat menggunakan cart dan checkout tanpa login.
- [ ] Cart pelanggan login tersimpan di server.
- [ ] Perubahan harga, stok, dan status publikasi ditangani sebelum checkout.
- [ ] Ringkasan checkout tidak mengklaim transaksi telah dikonfirmasi.
- [ ] Jika WhatsApp gagal, ringkasan tetap tersedia dan pengguna bisa menyalin pesan atau mencoba lagi.
- [ ] Nomor WhatsApp dapat diubah admin dengan validasi.
- [ ] Foto Community tidak tampil sebelum Approved.
- [ ] Profil, About, Community, dan footer dapat diakses sesuai hak akses.
- [ ] Website responsif, memiliki pesan error yang jelas, dan memenuhi keamanan dasar.

## 14. GitHub Issues / Project Workflow

### Recommended status
`Todo` → `In Progress` → `Review` → `Done`

Tambahkan status `Blocked` jika ada pekerjaan yang tertahan.

### Recommended issue fields
- **Title:** kata kerja + hasil yang spesifik.
- **WBS ID:** misalnya `5.7`.
- **Description:** tujuan, cakupan, dan konteks.
- **Acceptance Criteria:** daftar kondisi untuk menyatakan selesai.
- **Dependencies:** issue yang harus selesai terlebih dahulu.
- **Priority:** High / Medium / Low.
- **Assignee:** satu penanggung jawab utama.
- **Estimate:** diisi setelah task direview.
- **Milestone:** diisi setelah timeline dibuat.

### Example issue

**Title:** `[5.7] Implementasi penyesuaian stok dengan konfirmasi`

**Description:** Admin dapat menambah atau mengurangi stok varian dengan memasukkan jumlah perubahan dan mengonfirmasi sebelum perubahan disimpan.

**Acceptance Criteria**
- Penyesuaian membutuhkan konfirmasi.
- Jumlah input harus berupa bilangan bulat positif.
- Pengurangan tidak boleh melebihi stok tersedia.
- Stok akhir tidak boleh negatif.
- Server memvalidasi ulang nilai stok saat menyimpan.
- Pesan sukses atau error jelas bagi admin.

**Dependencies**
- Database artikel dan varian.
- Autentikasi dan proteksi akses admin.

## 15. Risks and Guardrails

| Risk | Mitigation |
|---|---|
| Scope bertambah selama development | Evaluasi dampak waktu/biaya dan catat setiap perubahan |
| Stok atau harga berubah saat checkout | Validasi ulang di server sebelum membuat pesan |
| Pengguna mengira pesanan sudah dikonfirmasi | Nyatakan checkout sebagai permintaan pesanan |
| Foto tidak pantas tampil publik | Moderasi admin; hanya Approved yang tampil |
| Dashboard diakses pengguna tanpa izin | Middleware/authorization dan validasi server |
| File upload berbahaya atau terlalu besar | Validasi MIME/type/size dan penyimpanan aman |
| Task terlalu besar dan sulit dipantau | Pecah menjadi work package yang dapat diuji |
| Data guest cart hilang saat browser dibersihkan | Jelaskan bahwa guest cart disimpan lokal; login cart tersimpan server |

## 16. Change Management

Jika ada permintaan baru:
1. Catat permintaan dan alasan bisnis.
2. Tentukan apakah termasuk scope MVP.
3. Evaluasi dampak pada waktu, biaya, keamanan, data, dan arsitektur.
4. PM dan stakeholder menyetujui atau menunda permintaan.
5. Perbarui requirements, WBS, issue, dan timeline jika disetujui.
6. Jangan mengerjakan perubahan scope secara diam-diam.

Detail kecil yang belum ditentukan mengikuti solusi sederhana dan aman. Minta keputusan stakeholder hanya bila ada konflik kebutuhan atau dampak material terhadap keamanan, integritas data/stok, biaya, atau arsitektur.

## 17. Open Decisions

Tidak perlu menghambat development untuk detail kecil. Gunakan default sederhana dan aman, lalu catat keputusan implementasi di repository. Eskalasi hanya jika berpengaruh besar terhadap:
- Keamanan.
- Integritas stok/harga.
- Privasi pengguna.
- Biaya.
- Arsitektur.
- Scope bisnis.

Contoh detail yang boleh mengikuti praktik umum: pesan validasi, urutan galeri, batas ukuran gambar yang wajar, dan desain responsif.

## 18. Suggested Repository Documentation

```text
docs/
├── development-guide.md       # Dokumen ini
├── requirements.md            # Requirements baseline
├── wbs.md                     # WBS saja, jika ingin dipisahkan
├── architecture.md             # Arsitektur dan keputusan teknis
├── database-erd.md             # ERD dan penjelasan data
├── testing.md                  # Test strategy dan test cases
├── deployment.md               # Cara deployment dan konfigurasi
└── decisions/
    └── README.md               # Catatan keputusan penting
```

Jika tim ingin menjaga dokumentasi tetap sederhana, dokumen ini dapat menjadi panduan utama dan file terpisah dibuat hanya saat diperlukan.

## 19. Next Steps for the PM

1. Review dan setujui WBS sebagai baseline awal.
2. Tentukan stack/arsitektur teknis bila belum diputuskan.
3. Pecah task besar menjadi GitHub Issues yang bisa dikerjakan dan diuji.
4. Tetapkan dependensi dan penanggung jawab utama.
5. Estimasikan ukuran/durasi berdasarkan kapasitas tim.
6. Susun milestone dan timeline.
7. Mulai development dari fondasi dan modul produk.
8. Pantau progres, risiko, dan perubahan scope secara berkala.

**Prinsip utama:** implementasikan kebutuhan yang sudah disepakati, jaga logika harga/stok di server, jangan menganggap permintaan WhatsApp sebagai transaksi terkonfirmasi, dan hindari menambah kompleksitas yang tidak dibutuhkan MVP.
