import { open } from '../components/modal.js';
import { toast } from '../components/toast.js';

export function render() {
    const page = document.createElement('div');
    page.className = 'page';
    page.innerHTML = `
        <h1 class="page-title">Direktori Alumni</h1>
        <div class="form-stack" style="margin-bottom:1rem;">
            <input type="search" class="input" id="search" placeholder="Cari nama alumni..." enterkeyhint="search" autocomplete="off">
            <select class="input" id="filter-angkatan" aria-label="Filter angkatan">
                <option value="">Semua Angkatan</option>
            </select>
        </div>
        <div class="grid" id="alumni-list">
            <p>Memuat data...</p>
        </div>
        <div style="margin-top: 1.5rem; text-align: center;">
            <button type="button" class="btn" id="add-alumni" style="width:100%;max-width:320px;">Daftar Alumni Baru</button>
        </div>
    `;

    const list = page.querySelector('#alumni-list');
    const searchEl = page.querySelector('#search');
    const angkatanEl = page.querySelector('#filter-angkatan');
    let all = [];

    function paint() {
        const q = searchEl.value.trim().toLowerCase();
        const ang = angkatanEl.value;
        const rows = all.filter(a => a.status !== 'pending').filter(a => {
            const matchQ = !q || a.name.toLowerCase().includes(q) || (a.nickname || '').toLowerCase().includes(q);
            const matchA = !ang || String(a.graduation_year) === ang || String(a.generation) === ang;
            return matchQ && matchA;
        });
        if (!rows.length) {
            list.innerHTML = '<p>Tidak ada alumni cocok.</p>';
            return;
        }
        list.innerHTML = '';
        rows.forEach(alumni => {
            const card = document.createElement('div');
            card.className = 'card alumni-card';
            card.innerHTML = `
                <h3>${alumni.name}${alumni.nickname ? ` <small>(${alumni.nickname})</small>` : ''}</h3>
                <p>Angkatan lulus: ${alumni.graduation_year}</p>
                <p>${alumni.occupation || '—'} · ${alumni.city || '—'}</p>
                <a class="wa-link" href="https://wa.me/${alumni.phone}" target="_blank" rel="noopener">WhatsApp</a>
            `;
            list.appendChild(card);
        });
    }

    fetch('assets/data/alumni.json')
        .then(res => res.json())
        .then(data => {
            all = data;
            const years = [...new Set(data.map(a => a.graduation_year))].sort();
            years.forEach(y => {
                const opt = document.createElement('option');
                opt.value = y;
                opt.textContent = y;
                angkatanEl.appendChild(opt);
            });
            paint();
        })
        .catch(() => { list.innerHTML = '<p>Gagal memuat data.</p>'; });

    searchEl.addEventListener('input', paint);
    angkatanEl.addEventListener('change', paint);

    page.querySelector('#add-alumni').addEventListener('click', () => {
        open('Daftar Alumni Baru', `
            <form id="alumni-form" class="form-stack">
                <div>
                    <label for="f-name">Nama lengkap</label>
                    <input class="input" id="f-name" name="name" required autocomplete="name">
                </div>
                <div>
                    <label for="f-year">Tahun lulus</label>
                    <input class="input" id="f-year" name="year" type="number" inputmode="numeric" min="1990" max="2030" required>
                </div>
                <div>
                    <label for="f-phone">WhatsApp</label>
                    <input class="input" id="f-phone" name="phone" type="tel" inputmode="tel" placeholder="628..." required>
                </div>
                <div>
                    <label for="f-city">Kota</label>
                    <input class="input" id="f-city" name="city" autocomplete="address-level2">
                </div>
                <div>
                    <label for="f-job">Pekerjaan</label>
                    <input class="input" id="f-job" name="job" autocomplete="organization-title">
                </div>
                <button type="submit" class="btn" style="width:100%;">Kirim Pendaftaran</button>
            </form>
        `);
        const form = document.getElementById('alumni-form');
        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            toast('Pendaftaran tersimpan (dummy). Admin akan review.', 'success');
            form.closest('.modal-overlay')?.remove();
        });
    });

    return page;
}
