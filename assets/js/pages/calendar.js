import { fetchEvents } from '../data/events.js';

const DAYS = { SU: 'Minggu', MO: 'Senin', TU: 'Selasa', WE: 'Rabu', TH: 'Kamis', FR: 'Jumat', SA: 'Sabtu' };

function formatRecurrence(event) {
    if (event.type !== 'rutinan' || !event.recurrence) return event.date || '';
    const { freq, byday, bysetpos } = event.recurrence;
    if (freq === 'monthly') {
        const dayName = DAYS[byday] || byday;
        if (bysetpos === -1) return `Setiap bulan, ${dayName} terakhir`;
        return `Setiap bulan, ${dayName}`;
    }
    return '';
}

function paintList(container, events) {
    if (!events.length) {
        container.innerHTML = '<p>Tidak ada kegiatan aktif.</p>';
        return;
    }
    container.innerHTML = events.map(event => `
        <article class="event-item">
            <h4>${event.title}</h4>
            <p>${event.description || ''}</p>
            <p>${formatRecurrence(event)}</p>
            <p>⏰ ${event.time || '—'} · 📍 ${event.location || '—'}</p>
            ${event.contact ? `<p><a class="btn btn-sm" style="margin-top:.5rem;display:inline-flex;" href="https://wa.me/${event.contact}?text=${encodeURIComponent('Halo, info kegiatan: ' + event.title)}" target="_blank" rel="noopener">WhatsApp</a></p>` : ''}
        </article>
    `).join('');
}

export function render() {
    const page = document.createElement('div');
    page.className = 'page';
    page.innerHTML = `
        <h1 class="page-title">Kalender Kegiatan</h1>
        <div class="filter-bar" id="cal-filters">
            <button type="button" class="btn" data-filter="all">Semua</button>
            <button type="button" class="btn btn-outline" data-filter="rutinan">Rutinan</button>
            <button type="button" class="btn btn-outline" data-filter="agenda">Agenda</button>
        </div>
        <div class="event-list" id="event-list">
            <p>Memuat...</p>
        </div>
    `;

    const listEl = page.querySelector('#event-list');
    let all = [];
    let filter = 'all';

    function apply() {
        const rows = all.filter(e => e.active !== false)
            .filter(e => filter === 'all' || e.type === filter);
        paintList(listEl, rows);
    }

    fetchEvents().then(events => {
        all = events;
        apply();
    }).catch(() => {
        listEl.innerHTML = '<p>Gagal memuat kegiatan.</p>';
    });

    page.querySelectorAll('#cal-filters button').forEach(btn => {
        btn.addEventListener('click', () => {
            page.querySelectorAll('#cal-filters button').forEach(b => {
                b.classList.toggle('btn', b === btn);
                b.classList.toggle('btn-outline', b !== btn);
            });
            filter = btn.dataset.filter;
            apply();
        });
    });

    return page;
}
