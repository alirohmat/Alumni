# Rencana: Website Alumni Mansyaul Huda 02 (Kalamashada)

## 1. Project Overview
**Nama:** Sistem Informasi Alumni Pondok Pesantren Mansyaul Huda 02 (Kalamashada)
**Tipe:** Progressive Web App (PWA) — bisa offline, install di HP
**Stack:** Vanilla JS (minimal, cepat, tanpa build step)
**Hosting:** GitHub Pages (gratis, custom domain ready)

---

## 2. Struktur File (MVP — Single Page App-ish)
/root/alumni
├── index.html              # Landing + routing SPA
├── assets/
│   ├── css/
│   │   ├── base.css        # Variabel warna, reset, typo
│   │   ├── components.css  # Button, card, modal
│   │   └── pages.css       # Halaman spesifik
│   └── js/
│       ├── app.js          # Router, init
│       ├── pages/          # Tiap halaman
│       │   ├── home.js
│       │   ├── calendar.js
│       │   ├── alumni.js
│       │   ├── gallery.js
│       │   └── admin.js
│       ├── components/     # Reusable UI
│       │   ├── navbar.js
│       │   ├── modal.js
│       │   └── toast.js
│       └── data/
│           ├── events.json     # Rutinan + agenda
│           └── alumni.json     # Data alumni
├── manifest.json           # PWA manifest
└── sw.js                   # Service worker (offline)
```

**Skala file:** Maksimal 1 file per modul, <300 baris per file. Kalau lebih — pecah.

---

## 3. Fitur per Halaman

### 3.1 Landing / Home (`home.js`)
- Hero: nama komunitas, tagline
- Countdown event berikutnya
- 3 card shortcut: Kalender | Direktori Alumni | Galeri
- Berita/pengumuman singkat (3 terbaru)
- Footer: kontak, social link

### 3.2 Kalender (`calendar.js`)
- Library: **FullCalendar.js v6** (CDN, MIT license)
- View: bulan + minggu
- Event dari `events.json`
- Rutinan: field `recurrence: { freq: "monthly", byday: "FR", "bysetpos": -1 }` — auto generate tanggal
- Click event → modal detail
- Filter: Rutinan / Agenda Tahunan / Semua

### 3.3 Direktori Alumni (`alumni.js`)
- Tabel/list dengan filter:
  - Filter angkatan (select dropdown)
  - Search nama
  - Filter status (aktif di organisasi / umum)
- Card profil: Nama, angkatan, foto (avatar placeholder jika kosong), no. WhatsApp (wa.me link)
- Tombol "Daftar Alumni Baru" → form modal
- Submit form → simpan ke `alumni.json` via admin (POST ke file atau localStorage)
- Pagination: 20 per halaman

### 3.4 Galeri (`gallery.js`)
- Grid foto dokumentasi kegiatan
- Lightbox onclick
- Filter per event/kegiatan
- Lazy load image

### 3.5 Admin Panel (`admin.js`)
- Simple auth (password hardcoded — ini MVP, bukan production-grade security)
- CRUD events:
  - Tambah/edit/hapus agenda
  - Toggle rutinan aktif/nonaktif
- CRUD alumni: approve pendaftaran baru, edit data
- Upload foto galeri (base64 ke JSON — batasi size) atau placeholder image URL
- Export data alumni (JSON download)

### 3.6 Notifikasi / Reminder
- Di homepage: tampilkan "Event besok" kalau ada
- WhatsApp link di setiap event (kirim wa.me dengan template pesan)

---

## 4. Data Model

### 4.1 `events.json`
```json
[
  {
    "id": "evt-001",
    "title": "Kajian Bulanan",
    "description": "Kajian rutin bulanan...",
    "type": "rutinan",
    "recurrence": { "freq": "monthly", "byday": "FR", "bysetpos": -1 },
    "time": "15:00",
    "location": "Mesjid Al-Huda",
    "contact": "628123456789",
    "active": true
  },
  {
    "id": "evt-002",
    "title": "Reuni Akbar 2026",
    "description": "...",
    "type": "agenda",
    "date": "2026-08-17",
    "time": "08:00",
    "location": "Ponpes Mansyaul Huda 02",
    "contact": "628123456789",
    "rsvp": true,
    "active": true
  }
]
```

### 4.2 `alumni.json`
```json
[
  {
    "id": "alm-001",
    "name": "Ahmad Fauzi",
    "nickname": "Upi",
    "generation": 2010,
    "graduation_year": 2016,
    "phone": "628123456789",
    "city": "Sidoarjo",
    "occupation": "Guru",
    "photo_url": "",
    "social": { "instagram": "..." },
    "status": "pending",
    "registered_at": "2026-07-25"
  }
]
```

---

## 5. Desain Sistem

**Warna tema** (default, bisa diubah):
- Primary: `#1B5E20` (hijau tua — warna khas pesantren)
- Secondary: `#81C784` (hijau muda)
- Accent: `#FFD54F` (gold — nuansa Islami)
- Background: `#FAFAFA`
- Text: `#212121`

**Typography:** Google Fonts — `Poppins` (heading) + `Open Sans` (body)

**Icon:** Phosphor Icons (CDN, MIT)

**Responsive:** Mobile-first, breakpoint di 768px dan 1024px

**Font-size scale:**
- h1: 2.5rem
- h2: 2rem
- h3: 1.5rem
- body: 1rem
- small: 0.875rem

---

## 6. Tahap Implementasi

### Fase 1 — Fondasi (1-2 jam)
- [ ] Setup struktur folder
- [ ] `index.html` + routing SPA sederhana
- [ ] `base.css` + `components.css`
- [ ] Navbar + footer component
- [ ] Toast notification

### Fase 2 — Home + Kalender (2-3 jam)
- [ ] Halaman home (hero, countdown, shortcut)
- [ ] FullCalendar.js integration
- [ ] `events.json` dengan sample data (rutinan + 3 agenda)
- [ ] Event detail modal

### Fase 3 — Direktori Alumni (2-3 jam)
- [ ] Halaman alumni dengan filter & search
- [ ] Form pendaftaran alumni (modal)
- [ ] `alumni.json` dengan sample 10 data
- [ ] Pagination

### Fase 4 — Galeri + Admin (2-3 jam)
- [ ] Galeri grid + lightbox
- [ ] Admin panel (auth + CRUD events + CRUD alumni)
- [ ] Service worker untuk offline

### Fase 5 — Polish (1-2 jam)
- [ ] Responsive check (HP + desktop)
- [ ] PWA manifest
- [ ] Custom domain setup (kalau ada)
- [ ] Test all flows

**Estimasi total:** ~10-15 jam kerja

---

## 7. Clarifying Questions (yang perlu dijawab sebelum eksekusi)

| # | Pertanyaan | Opsi |
|---|---|---|
| 1 | **Rutinan bulanan ada berapa jenis?** | (misal: kajian, remaja mesjid, dll) — supaya saya bisa seed data akurat |
| 2 | **Agenda tahunan yang sudah ada?** | Haflul Amtsar, haul, MTQ, dll — untuk seed data |
| 3 | **Periode tahun ajaran?** | (misal: tahun Hijriah atau Masehi?) — untuk format angkatan |
| 4 | **Nama domain?** | Kalau ada yang sudah punya — kasih tau, saya set di GitHub Pages. Kalau belum — pakai subdomain dulu (mansyaul-huda02.netlify.app) |
| 5 | **Admin cuma satu orang atau banyak?** | Menentukan apakah perlu role-based auth |
| 6 | **WhatsApp group link?** | — Bakal saya taruh di footer dan di setiap event detail |
| 7 | **Foto/logo pesantren?** | — Kalau ada, kasih saya file-nya atau link-nya. Kalau belum — pakai placeholder dulu |

---

Jawab yang bisa dijawab. Yang belum tahu, saya buatkan default dan bisa diubah nanti. Kalau semua sudah clear, saya langsung eksekusi.