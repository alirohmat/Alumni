export function render() {
    const page = document.createElement('div');
    page.className = 'page';
    page.innerHTML = `
        <h1>Direktori Alumni</h1>
        <div style="margin-bottom: 1rem; display: flex; gap: 0.5rem;">
            <input type="text" class="input" id="search" placeholder="Cari nama alumni...">
            <select class="input" id="filter-angkatan">
                <option value="">Semua Angkatan</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
            </select>
        </div>
        <div class="grid" id="alumni-list">
            <p>Memuat data...</p>
        </div>
        <div style="margin-top: 2rem; text-align: center;">
            <button class="btn" id="add-alumni">Daftar Alumni Baru</button>
        </div>
    `;

    // Dummy load data
    const list = page.querySelector('#alumni-list');
    fetch('assets/data/alumni.json')
        .then(res => res.json())
        .then(data => {
            list.innerHTML = '';
            data.forEach(alumni => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <h3>${alumni.name}</h3>
                    <p>Angkatan: ${alumni.graduation_year}</p>
                    <p>${alumni.occupation}</p>
                    <a href="https://wa.me/${alumni.phone}" target="_blank">WhatsApp</a>
                `;
                list.appendChild(card);
            });
        })
        .catch(() => list.innerHTML = '<p>Gagal memuat data.</p>');

    return page;
}