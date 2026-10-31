# ERD Awal CALMATS MVP

**Status: usulan awal; perlu direview sebelum migrations dibuat.** ERD ini hanya mencakup kebutuhan MVP pada `CALMATS_Development_Guide.md`.

```mermaid
erDiagram
    USER ||--o{ CART : owns
    USER ||--o{ COMMUNITY_PHOTO : uploads
    CATEGORY ||--o{ ARTICLE : contains
    ARTICLE ||--o{ ARTICLE_IMAGE : has
    ARTICLE ||--o{ ARTICLE_VARIANT : offers
    COLOR ||--o{ ARTICLE_IMAGE : illustrates
    COLOR ||--o{ ARTICLE_VARIANT : identifies
    SIZE ||--o{ ARTICLE_VARIANT : identifies
    ARTICLE ||--o{ PROMOTION : may_target
    ARTICLE_VARIANT ||--o{ PROMOTION : may_target
    CART ||--o{ CART_ITEM : contains
    ARTICLE_VARIANT ||--o{ CART_ITEM : selected_as
    CART ||--o{ CART_MERGE : records

    USER {
        bigint id PK
        string name
        string email UK
        string password_hash
        enum role "customer, admin"
    }
    CATEGORY {
        bigint id PK
        string name
        string slug UK
        boolean is_active
    }
    ARTICLE {
        bigint id PK
        bigint category_id FK
        string name
        string slug UK
        text description
        enum status "draft, published"
        datetime published_at
    }
    ARTICLE_IMAGE {
        bigint id PK
        bigint article_id FK
        bigint color_id FK "nullable for primary/extra image"
        string storage_path
        unsigned_int sort_order
        boolean is_primary
    }
    COLOR {
        bigint id PK
        string name
        string hex_code "nullable"
    }
    SIZE {
        bigint id PK
        string name UK
        unsigned_int sort_order
    }
    ARTICLE_VARIANT {
        bigint id PK
        bigint article_id FK
        bigint color_id FK
        bigint size_id FK
        unsigned_int price_idr
        unsigned_int stock
        boolean preorder_enabled
        UK article_color_size
    }
    PROMOTION {
        bigint id PK
        bigint article_id FK "nullable"
        bigint article_variant_id FK "nullable"
        enum discount_type "percent, fixed"
        unsigned_int discount_value
        boolean is_active
        datetime updated_at
    }
    CART {
        bigint id PK
        bigint user_id FK UK
        datetime updated_at
    }
    CART_ITEM {
        bigint id PK
        bigint cart_id FK
        bigint article_variant_id FK
        unsigned_int quantity
        UK cart_variant
    }
    CART_MERGE {
        bigint id PK
        bigint cart_id FK
        string merge_key UK
        datetime created_at
    }
    COMMUNITY_PHOTO {
        bigint id PK
        bigint user_id FK
        string storage_path
        enum status "pending, approved, rejected"
        datetime created_at
    }
    SITE_SETTING {
        string key PK
        text value
        datetime updated_at
    }
```

## Aturan dan batasan data

- Harga disimpan sebagai bilangan bulat Rupiah. Format `Rp120.000` dibuat saat ditampilkan.
- Kombinasi artikel/warna/ukuran pada varian harus unik; stok dan harga tidak boleh negatif.
- `preorder_enabled` adalah status manual. Status tampilan dihitung: stok positif berarti Ready Stock; stok nol dan preorder aktif berarti Pre-order; selain itu Sold Out.
- Promosi memiliki tepat satu target (artikel atau varian), nilai positif, dan harga final tidak boleh negatif. Promo artikel aktif dipilih lebih dulu; promo varian dipakai bila tidak ada promo artikel aktif.
- Artikel hanya bisa Published jika informasi wajib dan foto untuk tiap warna tersedia. Draft tidak disertakan dalam query publik.
- Cart hanya berlaku untuk pelanggan login di server; guest cart tidak perlu tabel. Baris merge dengan `merge_key` unik membuat operasi penggabungan dapat diulang tanpa menduplikasi kuantitas.
- Foto Community baru berstatus Pending dan tidak boleh diambil dari endpoint publik hingga Approved.
- Tidak ada entitas Order pada MVP. Ringkasan checkout adalah permintaan konfirmasi melalui WhatsApp.

## Belum diputuskan

- Batas ukuran unggahan foto dan daftar MIME yang diterima. Pilih angka awal konservatif saat fitur upload dibuat.
- Cara mengelola penghapusan artikel yang sudah pernah masuk cart. Rekomendasi: soft delete artikel; detail dan checkout tetap menolak artikel tidak Published.
