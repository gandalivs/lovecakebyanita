Jika tujuan Anda adalah agar **Codex bisa bekerja secara mandiri dan berurutan**, maka Source of Truth harus dilengkapi dengan **Execution Plan (Roadmap Implementasi)**.

Dokumen ini berfungsi sebagai "kontrak kerja" untuk Codex:

* Apa yang harus dibuat
* Urutan pengerjaan
* Kriteria selesai
* Struktur file
* Dependency antar fitur
* Output setiap fase

---

# IMPLEMENTATION PLAN FOR CODEX

## LoveCakeByAnita V1

---

# RULE UTAMA

Codex WAJIB mengikuti urutan fase.

Tidak boleh mengerjakan fase berikutnya sebelum fase saat ini selesai.

Prioritas:

```text
Foundation
↓
Layout
↓
Components
↓
Dummy Data
↓
Pages
↓
SEO
↓
Backend Ready
↓
Database Ready
```

---

# PHASE 0

## Project Initialization

### Objective

Membuat fondasi project.

### Task

Buat struktur folder:

```text
/
├── index.html

├── pages/
│   ├── about.html
│   ├── products.html
│   ├── product-detail.html
│   ├── gallery.html
│   ├── testimonials.html
│   ├── faq.html
│   └── contact.html

├── assets/
│   ├── css/
│   ├── js/
│   ├── data/
│   ├── images/
│   └── icons/

├── components/
│   ├── navbar.html
│   ├── footer.html
│   ├── hero.html
│   ├── product-card.html
│   ├── category-card.html
│   └── testimonial-card.html
```

### Deliverable

```text
Project structure created
```

---

# PHASE 1

## Global Layout System

### Objective

Membuat layout dasar seluruh website.

### Task

Buat:

```html
<header>
<main>
<footer>
```

Responsive:

```text
Mobile
Tablet
Desktop
```

Gunakan:

```html
Tailwind Play CDN
```

### Requirements

Navbar sticky.

Container:

```html
max-w-7xl mx-auto px-4
```

### Deliverable

```text
Responsive layout ready
```

---

# PHASE 2

## Dynamic Menu System

### Objective

Menu tidak boleh hardcoded.

### Task

Buat:

```text
/data/menu.json
```

Contoh:

```json
[
 {
   "name":"Home",
   "url":"/"
 },
 {
   "name":"Products",
   "url":"/products"
 }
]
```

Navbar membaca JSON.

### Deliverable

```text
Dynamic menu rendered
```

---

# PHASE 3

## Design System

### Objective

Membuat reusable UI.

### Task

Buat file:

```text
assets/js/theme.js
```

Berisi:

```javascript
const theme = {
 colors:{},
 typography:{},
 spacing:{}
}
```

### Deliverable

```text
Design system initialized
```

---

# PHASE 4

## Dummy Database JSON

### Objective

Seluruh data berasal dari JSON.

### Task

Buat:

```text
categories.json
products.json
gallery.json
faq.json
testimonials.json
settings.json
social-media.json
```

### Product Minimum

```text
20 Cake
20 Tart
20 Bolen
```

### Deliverable

```text
Dummy data completed
```

---

# PHASE 5

## Homepage

### Objective

Membuat landing page.

### Section

```text
Hero
Category
Best Seller
About Preview
Instagram Feed
Testimonials
CTA Order
```

### Deliverable

```text
Homepage completed
```

---

# PHASE 6

## Product Module

### Objective

Membuat katalog produk.

### Page

```text
/products.html
```

### Features

Category Filter

Search

Sort

Pagination

Product Card

### Deliverable

```text
Catalog page completed
```

---

# PHASE 7

## Product Detail

### Objective

Menampilkan detail produk.

### URL Pattern

```text
/product-detail.html?id=1
```

### Features

Gallery

Price

Description

Related Product

WhatsApp CTA

### Deliverable

```text
Product detail completed
```

---

# PHASE 8

## Gallery Module

### Objective

Menampilkan hasil karya.

### Features

Grid Gallery

Lightbox

Filter Category

### Deliverable

```text
Gallery completed
```

---

# PHASE 9

## About Module

### Objective

Profil usaha.

### Section

```text
Story
Vision
Mission
Why Choose Us
```

### Deliverable

```text
About page completed
```

---

# PHASE 10

## Testimonial Module

### Objective

Social proof.

### Features

Carousel

Rating

Customer Photo

### Deliverable

```text
Testimonial page completed
```

---

# PHASE 11

## FAQ Module

### Objective

Mengurangi pertanyaan customer.

### Features

Accordion

Search FAQ

### Deliverable

```text
FAQ completed
```

---

# PHASE 12

## Contact Module

### Objective

Meningkatkan konversi.

### Features

WhatsApp

Instagram

Google Maps

Contact Form

### Deliverable

```text
Contact page completed
```

---

# PHASE 13

## Instagram Integration Layer

Website harus siap mengambil data Instagram di masa depan.

Buat adapter:

```javascript
InstagramService
```

Mode:

```text
dummy
api
```

Default:

```text
dummy
```

### Deliverable

```text
Instagram adapter completed
```

---

# PHASE 14

## SEO Layer

### Objective

Google indexing.

### Task

Setiap halaman memiliki:

```html
title
meta description
og:image
canonical
```

Generate:

```json
schema.org
```

Type:

```text
Bakery
LocalBusiness
```

### Deliverable

```text
SEO ready
```

---

# PHASE 15

## WhatsApp Ordering

### Objective

Lead generation.

### Format

```text
Halo LoveCakeByAnita,

Saya tertarik dengan produk:

Nama:
Harga:

Mohon info ketersediaannya.
```

### Deliverable

```text
WhatsApp order working
```

---

# PHASE 16

## Backend Preparation

### Objective

Memisahkan data source.

### Task

Buat repository pattern:

```javascript
MenuRepository
ProductRepository
GalleryRepository
```

Source:

```text
json
api
```

### Deliverable

```text
Backend ready architecture
```

---

# PHASE 17

## SQL Generator Preparation

### Objective

JSON dapat diubah menjadi SQL.

### Task

Buat mapping:

```text
products.json
→ products table

categories.json
→ categories table

gallery.json
→ galleries table

faq.json
→ faqs table

testimonials.json
→ testimonials table
```

### Deliverable

```text
Migration mapping document
```

---

# PHASE 18

## MySQL Database Design

Generate:

```sql
categories
products
product_images
gallery
faq
testimonials
settings
social_media
```

### Deliverable

```text
database.sql
```

---

# PHASE 19

## REST API Design

Generate specification:

```text
GET /products
GET /products/:id
GET /categories

GET /gallery

GET /faq

GET /testimonials
```

### Deliverable

```text
openapi.yaml
```

---

# PHASE 20

## Admin CMS Blueprint

Module:

```text
Dashboard
Products
Categories
Gallery
FAQ
Testimonials
Settings
Users
```

### Deliverable

```text
cms-specification.md
```

---

# FINAL SUCCESS CRITERIA

Codex dianggap selesai apabila:

✓ Semua halaman responsive
✓ Semua data berasal dari JSON
✓ Tidak ada menu hardcoded
✓ Komponen reusable
✓ SEO Ready
✓ Backend Ready
✓ SQL Ready
✓ API Ready
✓ CMS Ready
✓ Siap migrasi ke NodeJS + MySQL

---

### Prompt Master untuk Codex

Setelah SoT dan Implementation Plan selesai, gunakan prompt berikut saat memberikan tugas ke Codex:

```text
Read SOURCE_OF_TRUTH.md first.

Read IMPLEMENTATION_PLAN.md second.

Execute only one phase at a time.

Do not skip phases.

After completing a phase:

1. Show created files
2. Show modified files
3. Explain architecture decisions
4. Wait for approval before continuing

All UI must be responsive.

Use:
- HTML5
- TailwindCSS Play CDN
- JavaScript

All data must come from JSON files.

No framework allowed.

Architecture must be ready for future migration to NodeJS + MySQL backend.
```


