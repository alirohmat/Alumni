import { openLightbox } from '../components/gallery-lightbox.js';

export function render() {
    const page = document.createElement('div');
    page.className = 'page';
    page.innerHTML = `
        <h1 class="page-title">Galeri Dokumentasi</h1>
        <div class="filter-bar" id="gallery-filters">
            <button type="button" class="btn" data-filter="all">Semua</button>
            <button type="button" class="btn btn-outline" data-filter="rutinan">Rutinan</button>
            <button type="button" class="btn btn-outline" data-filter="agenda">Agenda</button>
        </div>
        <div class="grid" id="gallery-grid">
            <p>Memuat dokumentasi...</p>
        </div>
    `;

    const gallery = page.querySelector('#gallery-grid');
    let photos = [];
    let activeFilter = 'all';

    function paint() {
        const filtered = activeFilter === 'all'
            ? photos
            : photos.filter(p => (p.category || '').toLowerCase() === activeFilter
                || (p.event || '').toLowerCase().includes(activeFilter));
        if (!filtered.length) {
            gallery.innerHTML = '<p>Tidak ada foto.</p>';
            return;
        }
        gallery.innerHTML = '';
        filtered.forEach(photo => {
            const card = document.createElement('div');
            card.className = 'card gallery-item';
            card.innerHTML = `
                <img src="${photo.url}" alt="${photo.title}" loading="lazy" width="400" height="300">
                <div class="gallery-meta">
                    <h4>${photo.title}</h4>
                    <p><small>${photo.event || ''}</small></p>
                </div>
            `;
            card.addEventListener('click', () => openLightbox(photo.url, photo.title));
            gallery.appendChild(card);
        });
    }

    fetch('assets/data/gallery.json')
        .then(res => res.json())
        .then(data => {
            photos = data;
            paint();
        })
        .catch(() => { gallery.innerHTML = '<p>Gagal memuat dokumentasi.</p>'; });

    page.querySelectorAll('#gallery-filters button').forEach(btn => {
        btn.addEventListener('click', () => {
            page.querySelectorAll('#gallery-filters button').forEach(b => {
                b.classList.toggle('btn', b === btn);
                b.classList.toggle('btn-outline', b !== btn);
            });
            activeFilter = btn.dataset.filter;
            paint();
        });
    });

    return page;
}
