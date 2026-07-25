import { open } from '../components/modal.js';
import { fetchEvents } from '../data/events.js';

// Helper to format recurrence
function formatRecurrence(event) {
    if (event.type === 'rutinan' && event.recurrence) {
        const { freq, byday, bysetpos } = event.recurrence;
        if (freq === 'monthly') {
            return setiapBulan(byday, bysetpos);
        }
    }
    return '';
}

function setiapBulan(byday, bysetpos) {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const dayName = days[parseInt(byday)];
    if (bysetpos === -1) return `Setiap bulan terakhir ${dayName}`;
    return `Setiap bulan ${dayName}`;
}

export function render() {
    const page = document.createElement('div');
    page.className = 'page';
    page.innerHTML = `
        <h1>Kalender Kegiatan</h1>
        <div style="margin-bottom: 1rem;">
            <button class="btn" id="filter-rutinan">Rutinan</button>
            <button class="btn btn-outline" id="filter-agenda">Agenda</button>
            <button class="btn btn-outline" id="filter-all">Semua</button>
        </div>
        <div id="calendar"></div>
        <div id="event-detail" style="margin-top: 2rem;"></div>
    `;

    // Mock FullCalendar integration for now
    const calendarEl = page.querySelector('#calendar');
    calendarEl.innerHTML = `
        <div style="border: 1px solid #ddd; padding: 1rem; text-align: center; background: #fafafa;">
            <h3>FullCalendar.js akan di-load di sini</h3>
            <p style="font-size: 0.9rem; color: #666;">
                Integrasi dengan FullCalendar.js v6 (MIT License) akan ditambahkan.
            </p>
            <div id="event-list" style="margin-top: 1rem;"></div>
        </div>
    `;

    // Event list
    const eventList = page.querySelector('#event-list');
    fetchEvents().then(events => {
        let html = '';
        events.filter(e => e.active).forEach(event => {
            html += `
                <div style="border: 1px solid #ddd; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px;">
                    <h4>${event.title}</h4>
                    <p>${formatRecurrence(event)}</p>
                    <p><small>⏰ ${event.time} | 📍 ${event.location}</small></p>
                </div>
            `;
        });
        eventList.innerHTML = html || '<p>Tidak ada kegiatan aktif.</p>';
    });

    // Filter buttons
    const filters = {
        'filter-rutinan': () => 'rutinan',
        'filter-agenda': () => 'agenda',
        'filter-all': () => null
    };

    Object.entries(filters).forEach(([id, getFilter]) => {
        const btn = page.querySelector(`#${id}`);
        btn.addEventListener('click', () => {
            document.querySelectorAll('#calendar button').forEach(b => {
                b.classList.remove('btn');
                b.classList.add('btn-outline');
            });
            btn.classList.remove('btn-outline');
            btn.classList.add('btn');

            // TODO: Implement actual filtering
            fetchEvents().then(events => {
                const filtered = getFilter() 
                    ? events.filter(e => e.type === getFilter())
                    : events;
                console.log('Filtered events:', filtered);
            });
        });
    });

    return page;
}