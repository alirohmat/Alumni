export function render() {
    const page = document.createElement('div');
    page.className = 'page';
    page.innerHTML = `
        <h1>Galeri Dokumentasi</h1>
        <div style="margin-bottom: 1rem;">
            <button class="btn" id="filter-all">Semua</button>
            <button class="btn btn-outline" id="filter-rutinan">Rutinan</button>
            <button class="btn btn-outline" id="filter-agenda">Agenda</button>
        </div>
        <div class="grid" id="gallery-grid">
            <p>Memuat dokumentasi...</p>
        </div>
    `;

    const gallery = page.querySelector('#gallery-grid');

    fetch('assets/data/gallery.json')
        .then(res => res.json())
        .then(photos => {
            gallery.innerHTML = '';
            photos.forEach(photo => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <img src="${photo.url}" alt="${photo.title}" style="width: 100%; border-radius: 8px;">
                    <h4 style="margin-top: 0.5rem;">${photo.title}</h4>
                    <p><small>${photo.event || ''}</small></p>
                `;
                gallery.appendChild(card);
            });
        })
        .catch(() => gallery.innerHTML = '<p>Gagal memuat dokumentasi.</p>');

    // Placeholder filter
    page.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            page.querySelectorAll('button').forEach(b => {
                b.classList.remove('btn');
                b.classList.add('btn-outline');
            });
            btn.classList.remove('btn-outline');
            btn.classList.add('btn');
        });
    });

    return page;
}