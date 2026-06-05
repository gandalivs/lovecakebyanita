# LOVECAKEBYANITA

## SOURCE OF TRUTH (SOT) VERSION 1.0

---

# 1. PROJECT OVERVIEW

## Project Name

LoveCakeByAnita

## Business Type

Bakery & Cake Shop

## Main Products

* Cake
* Kue Tart
* Bolen
* Cookies
* Hampers
* Seasonal Cake

## Website Goal

Menampilkan katalog produk dan meningkatkan penjualan melalui:

* WhatsApp Order
* Instagram
* Marketplace (future)

Website berfungsi sebagai:

* Company Profile
* Product Catalog
* Landing Page Marketing
* SEO Website

---

# 2. REFERENCE WEBSITES

## Business Reference

* larittabakery.com
* makobakery.com
* hollandbakery.co.id

## UI Reference

Bellaria Cake & Bakery Template

Style yang diadopsi:

* Premium
* Elegant
* Warm
* Clean
* Modern Bakery

---

# 3. TECHNOLOGY STACK

## Phase 1

Frontend Only

Technology:

* HTML5
* Tailwind CSS Play CDN
* Javascript 
* JSON Data

No Framework

---

## Phase 2

Backend

Technology:

* NodeJS
* ExpressJS
* MySQL

---

## Phase 3

Admin CMS

Technology:

* NodeJS
* ExpressJS
* MySQL
* Authentication JWT

---

# 4. DESIGN SYSTEM

## Primary Color

Cream
#FFF8F0

## Secondary Color

Soft Pink
#FADADD

## Accent Color

Chocolate
#6B4226

## Text Color

Dark Brown
#3A2A1A

## Background

White
#FFFFFF

---

## Typography

Heading

Playfair Display

Body

Poppins

---

## Border Radius

Large

rounded-2xl

---

## Shadow

Soft

shadow-lg

---

# 5. WEBSITE STRUCTURE

## Public Pages

1 Home
2 About Us
3 Products
4 Product Detail
5 Gallery
6 Testimonials
7 FAQ
8 Contact
9 Order Guide

---

# 6. NAVIGATION MENU

[
{
"id":1,
"name":"Home",
"url":"/"
},
{
"id":2,
"name":"About",
"url":"/about"
},
{
"id":3,
"name":"Products",
"url":"/products"
},
{
"id":4,
"name":"Gallery",
"url":"/gallery"
},
{
"id":5,
"name":"Testimonials",
"url":"/testimonials"
},
{
"id":6,
"name":"FAQ",
"url":"/faq"
},
{
"id":7,
"name":"Contact",
"url":"/contact"
}
]

Menu harus dibaca secara dinamis dari file JSON.

---

# 7. HOMEPAGE STRUCTURE

## Hero Banner

Menampilkan:

* Tagline
* CTA Order Now
* CTA View Products

---

## Featured Categories

* Cake
* Tart
* Bolen
* Cookies

---

## Best Seller Products

Maksimal 8 produk.

---

## Why Choose Us

* Fresh Daily
* Premium Ingredients
* Custom Design
* Trusted Bakery

---

## Instagram Feed

Menampilkan posting terbaru.

Source:

Instagram LoveCakeByAnita

Jika API tidak tersedia gunakan dummy data.

---

## Testimonials

Minimal 6 testimonial.

---

## CTA WhatsApp

Sticky Floating Button.

---

# 8. PRODUCT CATEGORIES

Cake

Tart

Bolen

Cookies

Hampers

Seasonal

---

# 9. PRODUCT DATA STRUCTURE

Product

{
"id":1,
"category_id":1,
"name":"Chocolate Cake",
"slug":"chocolate-cake",
"short_description":"",
"description":"",
"price":150000,
"weight":"1kg",
"is_best_seller":true,
"is_featured":true,
"thumbnail":"",
"gallery":[],
"stock_status":"available"
}

---

# 10. GALLERY DATA

{
"id":1,
"title":"Birthday Cake",
"image":""
}

---

# 11. TESTIMONIAL DATA

{
"id":1,
"name":"Customer",
"photo":"",
"rating":5,
"review":"Cake sangat enak"
}

---

# 12. FAQ DATA

{
"id":1,
"question":"",
"answer":""
}

---

# 13. CONTACT INFORMATION

Store Name

LoveCakeByAnita

WhatsApp

Dynamic Setting

Instagram

@lovecake_byanita

Address

Dynamic Setting

Google Maps

Dynamic Setting

---

# 14. SEO REQUIREMENTS

Every page must have:

* Title
* Meta Description
* Meta Keywords
* Open Graph Tags

Slug required.

Example:

/products/chocolate-cake

---

# 15. IMAGE STANDARD

Thumbnail

800x800

Banner

1920x800

Gallery

1200x1200

Format

WebP

---

# 16. RESPONSIVE REQUIREMENTS

Mobile First

Breakpoint:

sm
md
lg
xl
2xl

---

# 17. FILE STRUCTURE

/project

index.html

/about.html

/products.html

/product-detail.html

/gallery.html

/contact.html

/assets

/css

/js

/data

/images

/components

header.html

footer.html

navbar.html

---

# 18. DYNAMIC COMPONENTS

Components loaded dynamically:

* Header
* Navbar
* Footer
* Product Card
* Testimonial Card

Using Fetch API.

---

# 19. FUTURE DATABASE TABLES

menus

categories

products

product_images

testimonials

faq

gallery

settings

social_media

users

roles

orders

order_items

customers

---

# 20. FUTURE API ENDPOINTS

GET /api/products

GET /api/products/{slug}

GET /api/categories

GET /api/gallery

GET /api/testimonials

GET /api/faqs

GET /api/settings

---

# 21. ADMIN PANEL MODULES

Dashboard

Menu Management

Category Management

Product Management

Gallery Management

FAQ Management

Testimonials Management

Settings Management

User Management

Order Management

---

# 22. CODING RULES FOR CODEX

1. Build frontend first.
2. Use reusable components.
3. No framework.
4. Mobile first.
5. Tailwind Play CDN.
6. Dummy JSON data first.
7. Dynamic rendering using Javascript.
8. All content must come from JSON.
9. No hardcoded menu.
10. Prepare architecture for migration to API backend.
