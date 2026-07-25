// Mobile countdown function
function updateCountdown(targetDate, el) {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        el.textContent = "Event sedang berlangsung!";
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    el.textContent = `${d}h ${h}j ${m}m ${s}d`;
}

export function render() {
    const page = document.createElement('div');
    page.className = 'page';
    page.innerHTML = `
        <section class="hero">
            <h1>Keluarga Alumni Mansyaul Huda 02</h1>
            <p>Menyambung silaturahmi, merawat tradisi.</p>
        </section>
        <section class="shortcut-grid">
            <h2>Event Berikutnya Dalam:</h2>
            <div class="countdown" id="countdown"></div>
            <div class="grid">
                <a href="#calendar" class="card shortcut-card">
                    <h3>Kalender Kegiatan</h3>
                    <p>Lihat semua jadwal rutinan dan agenda tahunan.</p>
                </a>
                <a href="#alumni" class="card shortcut-card">
                    <h3>Direktori Alumni</h3>
                    <p>Cari teman seangkatan, perluas jaringan.</p>
                </a>
                <a href="#gallery" class="card shortcut-card">
                    <h3>Galeri Foto</h3>
                    <p>Kenangan momen kebersamaan kita.</p>
                </a>
            </div>
        </section>
    `;

    const countdownEl = page.querySelector('#countdown');
    if (countdownEl) {
        const nextEvent = new Date();
        nextEvent.setDate(nextEvent.getDate() + 10);
        updateCountdown(nextEvent, countdownEl);
        setInterval(() => updateCountdown(nextEvent, countdownEl), 1000);
    }

    return page;
}
