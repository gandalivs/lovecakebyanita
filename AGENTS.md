# AGENTS.md

# LoveCakeByAnita Development Agent Rules

## Purpose

Dokumen ini merupakan aturan utama yang wajib diikuti oleh Codex selama pengembangan aplikasi LoveCakeByAnita.

Codex harus bertindak sebagai Senior Frontend Engineer, UI Engineer, Software Architect, dan Technical Writer yang bekerja berdasarkan dokumen resmi project.

---

# Source of Truth Priority

Jika terdapat konflik antar dokumen, gunakan urutan prioritas berikut:

1. docs/prd.md
2. docs/implementation-plan.md
3. docs/ui-guidelines.md
4. AGENTS.md

PRD selalu menjadi sumber kebenaran utama.

---

# Required Reading Order

Sebelum menulis kode apa pun, Codex WAJIB membaca:

```text
docs/prd.md
docs/implementation-plan.md
docs/ui-guidelines.md
```

Jangan mulai implementasi sebelum seluruh dokumen dibaca.

---

# Development Workflow

Codex WAJIB mengikuti fase pada:

```text
docs/implementation-plan.md
```

Tidak boleh melompati fase.

Tidak boleh mengerjakan beberapa fase sekaligus.

Selalu kerjakan:

```text
1 Phase
↓
Review
↓
Approval
↓
Next Phase
```

---

# Execution Rules

Saat menerima task:

1. Identifikasi phase aktif.
2. Baca requirement phase tersebut.
3. Implementasikan hanya requirement phase tersebut.
4. Jangan menambahkan fitur di luar scope phase.
5. Tampilkan hasil pekerjaan.
6. Tunggu approval.

---

# Required Response Format

Setelah menyelesaikan sebuah phase:

## Completed Phase

Nama phase yang selesai.

## Files Created

Daftar file baru.

## Files Modified

Daftar file yang berubah.

## Summary

Penjelasan singkat implementasi.

## Validation Checklist

Checklist requirement phase.

## Waiting For Approval

Jangan lanjut ke phase berikutnya.

---

# Architecture Rules

Frontend harus menggunakan:

```text
HTML5
Tailwind CSS Play CDN
JavaScript
```

Dilarang menggunakan:

```text
React
Vue
Angular
NextJS
Nuxt
Svelte
Bootstrap
jQuery
```

---

# Data Source Rules

Seluruh data harus berasal dari:

```text
/assets/data/*.json
```

Dilarang hardcode data pada HTML.

Contoh yang dilarang:

```html
<li>Home</li>
```

Contoh yang benar:

```javascript
fetch('/assets/data/menu.json')
```

---

# Dynamic Rendering Rules

Komponen berikut wajib dirender secara dinamis:

```text
Navbar
Footer
Category List
Product List
Gallery
Testimonials
FAQ
Instagram Feed
```

---

# Component Rules

Komponen harus reusable.

Contoh:

```text
components/
├── navbar.html
├── footer.html
├── hero.html
├── product-card.html
├── category-card.html
├── testimonial-card.html
```

Jangan membuat duplikasi UI.

---

# UI Rules

Seluruh implementasi wajib mengikuti:

```text
docs/ui-guidelines.md
```

Jika terjadi konflik antara preferensi developer dan ui-guidelines, gunakan ui-guidelines.

---

# Design Principles

Website harus terlihat:

```text
Premium
Elegant
Modern
Luxury Bakery
Mobile First
Instagram Friendly
```

Bukan:

```text
Corporate Dashboard
Admin Panel
Bootstrap Template
Marketplace Generic
```

---

# Responsive Rules

Wajib Mobile First.

Minimum breakpoint:

```text
390px
768px
1024px
1440px
```

Semua halaman wajib responsive.

---

# Performance Rules

Target Lighthouse:

```text
Performance >= 90
Accessibility >= 95
Best Practices >= 95
SEO >= 95
```

Core Web Vitals harus lulus.

---

# SEO Rules

Setiap halaman wajib memiliki:

```text
Title
Meta Description
Canonical
Open Graph
Structured Data
```

---

# Accessibility Rules

Minimal:

```text
Alt Image
ARIA Labels
Keyboard Navigation
AA Contrast
```

---

# CSS Rules

Gunakan utility Tailwind.

Hindari custom CSS kecuali diperlukan.

Prioritas:

```text
Tailwind Utility
↓
Tailwind Components
↓
Custom CSS
```

---

# JavaScript Rules

Gunakan ES6+.

Gunakan:

```javascript
const
let
async/await
modules
fetch API
```

Hindari:

```javascript
var
jQuery
inline onclick
```

---

# Naming Convention

Files:

```text
kebab-case
```

Examples:

```text
product-card.html
product-detail.html
social-media.json
```

JSON keys:

```text
snake_case
```

Examples:

```json
{
  "product_name": "",
  "category_id": 1
}
```

---

# Future Backend Compatibility

Semua implementasi frontend harus siap migrasi ke:

```text
NodeJS
ExpressJS
MySQL
REST API
```

Jangan membuat arsitektur yang mengikat pada dummy JSON.

Gunakan abstraction layer.

Contoh:

```javascript
ProductRepository
CategoryRepository
GalleryRepository
```

---

# Repository Pattern

Setiap data source harus melalui repository.

Contoh:

```javascript
ProductRepository.getAll()
ProductRepository.getById()
```

Bukan:

```javascript
fetch('products.json')
```

langsung di halaman.

---

# Git Rules

Setiap phase harus dianggap sebagai satu commit.

Format:

```text
feat(phase-x): description
```

Contoh:

```text
feat(phase-1): initialize project structure
feat(phase-5): implement homepage sections
```

---

# Forbidden Actions

Dilarang:

* Skip phase
* Hardcoded menu
* Hardcoded products
* Menambah framework
* Menambah dependency tanpa kebutuhan
* Mengubah PRD tanpa instruksi
* Mengubah UI Guidelines tanpa instruksi
* Membuat fitur di luar scope phase aktif

---

# Completion Criteria

Project dianggap selesai jika:

✓ Semua phase implementation-plan selesai

✓ Semua halaman responsive

✓ Semua data berasal dari JSON

✓ Dynamic rendering berjalan

✓ SEO siap produksi

✓ Backend-ready architecture tersedia

✓ SQL migration siap dibuat

✓ REST API specification tersedia

✓ Admin CMS blueprint tersedia

---

# Final Rule

Jika ragu:

1. Ikuti PRD.
2. Ikuti Implementation Plan.
3. Ikuti UI Guidelines.
4. Jangan berasumsi.
5. Jangan membuat fitur tambahan tanpa instruksi.
6. Selalu minta approval sebelum lanjut ke phase berikutnya.
