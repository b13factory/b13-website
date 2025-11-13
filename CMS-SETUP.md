# B13 Factory Website - Netlify CMS Setup Guide

## 🎯 Akses CMS

Untuk mengakses CMS dan mengedit konten website:
1. Buka: `https://b13garment.id/admin`
2. Login menggunakan Netlify Identity atau GitHub

## 🔐 Setup Netlify Identity (Required)

Agar CMS bisa berfungsi, Anda perlu setup Netlify Identity:

### Langkah-langkah:
1. Login ke [Netlify Dashboard](https://app.netlify.com)
2. Pilih site: `b13factory-garmentadv`
3. Go to **Site Settings** → **Identity**
4. Click **Enable Identity**
5. Di **Registration preferences**, pilih **Invite only** (recommended)
6. Di **External providers**, enable **GitHub** atau **Google**
7. Di **Services** → **Git Gateway**, klik **Enable Git Gateway**

### Invite User:
1. Go to **Identity** tab
2. Click **Invite users**
3. Masukkan email Anda
4. Check email dan set password
5. Sekarang Anda bisa login ke `/admin`

## 📝 Cara Menggunakan CMS

### Mengedit Home Page:
1. Login ke `/admin`
2. Klik **Home Page** di sidebar
3. Klik **Home Page Content**
4. Edit Hero Title, Subtitle, Image, dll
5. Klik **Save** (publish langsung)

### Menambah Produk:
1. Klik **Products** di sidebar
2. Klik **New Products**
3. Isi form:
   - Product Name
   - Category (pilih: kaos, bordir, banner, merchandise)
   - Price
   - Image
   - Description
   - Features (bisa tambah beberapa)
4. Klik **Save**
5. Produk akan langsung muncul di website

### Menambah Portfolio:
1. Klik **Portfolio** di sidebar
2. Klik **New Portfolio**
3. Isi form project details
4. Upload gambar project
5. Klik **Save**

### Mengedit Site Configuration:
1. Klik **Site Configuration**
2. Edit informasi seperti:
   - Site Title
   - Contact Email
   - Phone Number
   - Address
3. Klik **Save**

## 🗂️ Struktur Content

Semua konten disimpan di folder:
```
public/content/
├── home/
│   └── home.md          # Home page content
├── products/            # Semua produk (.md files)
├── portfolio/           # Portfolio projects
├── services/            # Services
├── blog/               # Blog posts
├── pages/              # Static pages
├── testimonials/       # Customer testimonials
├── team/               # Team members
└── settings/
    └── site.json       # Site configuration
```

## 🔄 Workflow Publishing

**Mode: Immediate Publish**
- Setiap perubahan langsung publish ke website
- Tidak perlu approval workflow
- Real-time updates

## 📸 Upload Media

1. Di editor CMS, klik field Image
2. Click **Choose an image**
3. Upload dari komputer atau pilih dari media library
4. Gambar akan tersimpan di `public/uploads/`
5. Path akan otomatis di-set

## ⚠️ Troubleshooting

### CMS tidak bisa diakses:
- Pastikan Netlify Identity sudah enabled
- Pastikan Git Gateway sudah enabled
- Clear browser cache dan coba lagi

### Konten tidak muncul di website:
- Check apakah file sudah tersimpan di `public/content/`
- Check console browser untuk error
- Pastikan format markdown sudah benar

### Image tidak muncul:
- Pastikan image sudah terupload di `public/uploads/`
- Check path image di CMS (harus dimulai dengan `/uploads/`)
- Pastikan image size tidak terlalu besar (max 5MB recommended)

## 🚀 Deployment

Setiap kali Anda save content di CMS:
1. CMS akan commit changes ke GitHub
2. Netlify akan otomatis detect changes
3. Build akan triggered
4. Website akan update dalam 2-5 menit

## 📧 Support

Jika ada masalah:
1. Check error di browser console (F12)
2. Check build logs di Netlify Dashboard
3. Lihat commit history di GitHub

## 🔗 Links Penting

- Website: https://b13garment.id
- CMS Admin: https://b13garment.id/admin
- Netlify Dashboard: https://app.netlify.com