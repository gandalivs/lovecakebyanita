Sangat penting menambahkan **UI/UX Guideline 2026** ke Source of Truth. Tanpa guideline ini, Codex biasanya menghasilkan desain yang terlihat seperti template tahun 2020–2023: terlalu banyak card, padding tidak konsisten, warna terlalu ramai, dan kurang premium.

Untuk **LoveCakeByAnita**, positioning yang cocok adalah:

> Premium Bakery • Modern Luxury • Handmade Cake Boutique • Instagram Friendly • Mobile First

Bukan seperti website toko online biasa, tetapi lebih seperti perpaduan antara:

* Apple (clean)
* Bellaria Bakery (elegant)
* Magnolia Bakery (warm)
* Paris Baguette (premium)
* Modern SaaS landing page (spacing dan hierarchy)

---

# UI_GUIDELINE_2026.md

## Design Philosophy

### Brand Personality

```text
Premium
Elegant
Warm
Luxury
Artisan
Handmade
Trustworthy
Modern
```

Website harus memberikan kesan:

```text
Freshly baked
Handcrafted
Premium ingredients
Instagrammable
Family friendly
Luxury gift
```

---

# Modern Design Principles 2026

## Rule 1

Whitespace is Luxury

Gunakan ruang kosong yang luas.

Jangan membuat tampilan padat.

### Bad

```text
Card mepet
Text rapat
Banyak border
```

### Good

```text
Padding besar
Section lega
Visual fokus
```

---

## Rule 2

Large Typography

### Heading Hero

```css
72px Desktop
56px Tablet
40px Mobile
```

### Section Title

```css
48px Desktop
36px Mobile
```

### Body

```css
16px-18px
```

---

## Rule 3

Visual First

Prioritas:

```text
Image
Headline
CTA
Description
```

Bukan:

```text
Text panjang
Text panjang
Text panjang
```

---

# Color System

## Primary

Cream

```css
#FFF8F0
```

---

## Secondary

Soft Pink

```css
#FADADD
```

---

## Accent

Chocolate

```css
#6B4226
```

---

## Neutral

```css
#FFFFFF
#F8F8F8
#EEEEEE
#111111
```

---

# Typography

## Heading

Playfair Display

Google Font

---

## Body

Poppins

Google Font

---

## Font Weight

```text
400
500
600
700
```

Hindari:

```text
800
900
```

karena terlihat agresif.

---

# Border Radius

Gunakan radius besar.

```css
rounded-2xl
rounded-3xl
```

Hindari:

```css
rounded-none
rounded-sm
```

---

# Shadows

Gunakan shadow lembut.

### Good

```css
shadow-lg
shadow-xl
```

### Bad

```css
shadow-black
shadow berat
```

---

# Layout System

## Container

```html
max-w-7xl mx-auto px-6 lg:px-8
```

---

## Section Spacing

Desktop

```css
120px
```

Mobile

```css
72px
```

---

# Hero Section

## Layout

Split Layout

```text
Left:
Headline
Description
CTA

Right:
Cake Image
```

---

## Hero Height

```css
min-h-screen
```

---

## CTA Button

Primary

```css
Chocolate
```

Secondary

```css
Outline
```

---

# Product Card Design

## Card Style

2026 Style

```text
No border
Large image
Large radius
Soft shadow
```

---

## Structure

```text
Image

Category

Product Name

Price

Order Button
```

---

## Hover

Desktop

```css
translateY(-8px)
```

Smooth

```css
duration-300
```

---

# Product Detail Page

Layout

```text
50% Gallery

50% Information
```

Desktop

---

Mobile

```text
Gallery
Info
```

---

# Image Style

Semua gambar:

```css
rounded-3xl
object-cover
```

---

# Gallery Design

Pinterest Style

Masonry Layout

atau

```text
2 column mobile
4 column desktop
```

---

# Testimonial Design

Card minimalis

```text
Photo

Name

★★★★★

Review
```

---

# Instagram Section

Layout

```text
Grid 2 Mobile

Grid 4 Desktop
```

---

# FAQ Design

Accordion Modern

Open Animation

Smooth Height Transition

---

# Contact Page

Layout

```text
Map

Information

WhatsApp CTA
```

---

# Animation Guideline

Gunakan:

```css
transition-all
duration-300
ease-out
```

---

## Scroll Animation

Allowed:

```text
fade-up
fade-in
zoom-in
```

---

Avoid:

```text
bounce
shake
flash
spin
```

---

# Micro Interaction

Hover Product

Hover Button

Hover Gallery

Hover Menu

WAJIB ADA

---

# Mobile First Requirements

Design dimulai dari:

```text
390px
```

kemudian:

```text
768px
1024px
1440px
```

---

# Accessibility

Minimum:

```text
AA Contrast
Keyboard Navigation
Alt Image
ARIA Label
```

---

# Premium Bakery UI Checklist

Homepage harus memiliki:

```text
✓ Full Screen Hero

✓ Best Seller Carousel

✓ Category Section

✓ Why Choose Us

✓ Instagram Feed

✓ Testimonials

✓ FAQ

✓ WhatsApp CTA

✓ Footer
```

---

# Forbidden Design

Codex TIDAK BOLEH membuat:

```text
Bootstrap style 2020

Admin dashboard style

Kotak kotak terlalu banyak

Border hitam

Gradient berlebihan

Animasi berlebihan

Text terlalu kecil

Layout sempit

Warna mencolok
```

---

# Expected Visual Result

Jika selesai, website harus terlihat seperti kombinasi:

```text
40% Bellaria Bakery

20% Magnolia Bakery

20% Apple Website

20% Luxury Boutique Brand
```

Dengan guideline ini, Codex akan menghasilkan desain yang jauh lebih modern, premium, dan relevan dengan tren UI/UX 2026, bukan sekadar katalog produk biasa. Selain itu, tambahkan aturan wajib berikut ke SoT:

```text
All pages must achieve Lighthouse Score:

Performance >= 90
Accessibility >= 95
Best Practices >= 95
SEO >= 95

Core Web Vitals must pass.
```
