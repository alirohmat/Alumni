function pad(n) {
    return String(n).padStart(2, '0');
}

function getNextEvent() {
    const now = new Date();
    // Next Saturday 19:00 (rutinan default) or fallback +10 days
    const next = new Date(now);
    const day = next.getDay();
    const add = day === 6 ? (next.getHours() >= 19 ? 7 : 0) : (6 - day + 7) % 7 || 7;
    next.setDate(next.getDate() + add);
    next.setHours(19, 0, 0, 0);
    if (next <= now) next.setDate(next.getDate() + 7);
    return {
        title: 'Kajian Rutin Alumni',
        date: next,
        badge: 'Rutinan',
    };
}

function updateCountdown(el, event) {
    const diff = event.date - new Date();
    if (diff <= 0) {
        el.innerHTML = '<p class="countdown-live">Event sedang berlangsung!</p>';
        return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    el.innerHTML = `
        <div class="countdown-units">
            <div class="countdown-unit"><span class="num">${pad(d)}</span><span class="label">Hari</span></div>
            <div class="countdown-unit"><span class="num">${pad(h)}</span><span class="label">Jam</span></div>
            <div class="countdown-unit"><span class="num">${pad(m)}</span><span class="label">Menit</span></div>
            <div class="countdown-unit"><span class="num">${pad(s)}</span><span class="label">Detik</span></div>
        </div>
        <p class="countdown-event-title">${event.title}</p>
        <span class="countdown-event-badge">${event.badge}</span>
    `;
}

const NEWS = [
    { title: 'Penerimaan Data Alumni 2026', excerpt: 'Lengkapi profil agar mudah ditemukan rekan seangkatan.', date: 'Baru', read: false },
    { title: 'Kajian Rutin Setiap Sabtu', excerpt: 'Jam 19.00 di aula pesantren. Hadir offline atau online.', date: 'Rutinan', read: false },
    { title: 'Galeri Reuni Terbaru', excerpt: 'Foto kegiatan terakhir sudah diunggah di halaman Galeri.', date: '3 hari lalu', read: true },
];

export function render() {
    const page = document.createElement('div');
    page.className = 'page';
    page.innerHTML = `
        <section class="hero">
            <h1>Keluarga Alumni Mansyaul Huda 02</h1>
            <p>Menyambung silaturahmi, merawat tradisi.</p>
        </section>

        <section class="shortcut-grid">
            <div class="news-feed-container">
                <h2>Berita &amp; Update</h2>
                <div id="news-feed" class="news-feed"></div>
            </div>

            <h2 class="section-heading">Event Berikutnya</h2>
            <div class="countdown" id="countdown" aria-live="polite"></div>

            <div class="grid">
                <a href="#calendar" class="card shortcut-card">
                    <div class="shortcut-icon" aria-hidden="true">📅</div>
                    <h3>Kalender Kegiatan</h3>
                    <p>Lihat semua jadwal rutinan dan agenda tahunan.</p>
                </a>
                <a href="#alumni" class="card shortcut-card">
                    <div class="shortcut-icon" aria-hidden="true">👥</div>
                    <h3>Direktori Alumni</h3>
                    <p>Cari teman seangkatan, perluas jaringan.</p>
                </a>
                <a href="#gallery" class="card shortcut-card">
                    <div class="shortcut-icon" aria-hidden="true">📷</div>
                    <h3>Galeri Foto</h3>
                    <p>Kenangan momen kebersamaan kita.</p>
                </a>
            </div>
        </section>
    `;

    const feed = page.querySelector('#news-feed');
    feed.innerHTML = NEWS.map(item => `
        <article class="news-item ${item.read ? 'read' : 'unread'}">
            <h4>${item.title}</h4>
            <p>${item.excerpt}</p>
            <div class="news-meta">
                <span class="news-date">${item.date}</span>
                ${item.read ? '' : '<span class="news-badge">Baru</span>'}
            </div>
        </article>
    `).join('');

    const countdownEl = page.querySelector('#countdown');
    const nextEvent = getNextEvent();
    updateCountdown(countdownEl, nextEvent);
    const timer = setInterval(() => {
        if (!document.body.contains(countdownEl)) {
            clearInterval(timer);
            return;
        }
        updateCountdown(countdownEl, nextEvent);
    }, 1000);

    return page;
}
