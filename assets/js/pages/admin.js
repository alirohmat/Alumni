import { toast } from '../components/toast.js';

export function render() {
    const page = document.createElement('div');
    page.className = 'page';

    // Simple hardcoded auth check
    const isLoggedIn = sessionStorage.getItem('admin_auth') === 'true';

    if (!isLoggedIn) {
        page.innerHTML = `
            <h1>Login Admin</h1>
            <form id="admin-login" style="max-width: 400px; margin: 2rem auto;">
                <label style="display: block; margin-bottom: .5rem;">Password:</label>
                <input type="password" class="input" id="admin-password" placeholder="Masukkan password...">
                <button type="submit" class="btn" style="margin-top: 1rem; width: 100%;">Masuk</button>
            </form>
        `;
        page.querySelector('#admin-login').addEventListener('submit', (e) => {
            e.preventDefault();
            if (document.getElementById('admin-password').value === 'mansyaul2026') {
                sessionStorage.setItem('admin_auth', 'true');
                toast('Berhasil login.');
                location.hash = '#admin';
            } else {
                toast('Password salah.', 'error');
            }
        });
        return page;
    }

    // Load pending alumni
    page.innerHTML = `
        <div class="admin-header">
            <h1>Admin Panel</h1>
            <button type="button" class="btn" id="admin-logout">Logout</button>
        </div>
        <h3 style="margin-top: 1.5rem;">Pendaftaran Alumni Menunggu Konfirmasi</h3>
        <div class="grid" id="pending-list" style="margin-top: 1rem;">
            <p>Memuat...</p>
        </div>
    `;

    page.querySelector('#admin-logout').addEventListener('click', () => {
        sessionStorage.removeItem('admin_auth');
        toast('Logout berhasil.');
        location.hash = '#home';
    });

    // Fetch alumni and filter pending
    fetch('assets/data/alumni.json')
        .then(res => res.json())
        .then(data => {
            const pending = data.filter(a => a.status === 'pending');
            const list = page.querySelector('#pending-list');
            if (pending.length === 0) {
                list.innerHTML = '<p>Tidak ada pendaftaran baru.</p>';
                return;
            }
            list.innerHTML = '';
            pending.forEach(a => {
                const item = document.createElement('div');
                item.className = 'card admin-row';
                item.innerHTML = `
                    <div>
                        <h4>${a.name} <small>(Angkatan ${a.graduation_year})</small></h4>
                        <p>${a.city} | ${a.occupation}</p>
                    </div>
                    <div class="admin-actions">
                        <button type="button" class="btn approve-btn" data-id="${a.id}">Setujui</button>
                        <button type="button" class="btn btn-outline reject-btn" data-id="${a.id}">Tolak</button>
                    </div>
                `;
                list.appendChild(item);
            });

            list.querySelectorAll('.approve-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.dataset.id;
                    const updated = data.map(a => a.id === id ? { ...a, status: 'approved' } : a);
                    // In a real app, this would POST to a backend
                    downloadJSON(updated, 'alumni.json');
                    toast('Alumni disetujui! File JSON diunduh.');
                });
            });

            list.querySelectorAll('.reject-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.dataset.id;
                    const updated = data.filter(a => a.id !== id);
                    downloadJSON(updated, 'alumni.json');
                    toast('Alumni ditolak dan dihapus. File JSON diunduh.');
                });
            });
        })
        .catch(err => toast('Gagal memuat data.', 'error'));

    return page;
}

function downloadJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}