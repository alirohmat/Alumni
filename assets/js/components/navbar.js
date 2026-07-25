import { toast } from './toast.js';

export function render() {
    const nav = document.createElement('nav');
    nav.className = 'navbar';
    nav.innerHTML = `
        <a href="#home" class="navbar-brand">Kalamashada</a>
        <button type="button" class="navbar-toggle" aria-label="Buka menu" aria-expanded="false">
            <i class="ph ph-list"></i>
        </button>
        <ul class="navbar-links">
            <li><a href="#home" data-route="home">Beranda</a></li>
            <li><a href="#calendar" data-route="calendar">Kalender</a></li>
            <li><a href="#alumni" data-route="alumni">Alumni</a></li>
            <li><a href="#gallery" data-route="gallery">Galeri</a></li>
            <li><a href="#admin" data-route="admin">Admin</a></li>
        </ul>
    `;

    const toggle = nav.querySelector('.navbar-toggle');
    const links = nav.querySelector('.navbar-links');

    function closeMenu() {
        links.classList.remove('open');
        toggle.innerHTML = '<i class="ph ph-list"></i>';
        toggle.setAttribute('aria-label', 'Buka menu');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
    }

    function openMenu() {
        links.classList.add('open');
        toggle.innerHTML = '<i class="ph ph-x"></i>';
        toggle.setAttribute('aria-label', 'Tutup menu');
        document.body.classList.add('nav-open');
    }

    toggle.addEventListener('click', () => {
        if (links.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => closeMenu());
    });

    return nav;
}

export function setActiveRoute(route) {
    document.querySelectorAll('.navbar-links a').forEach(a => {
        a.classList.toggle('active', a.dataset.route === route);
    });
}

export function logoutPrompt() {
    toast('Anda telah logout.', 'success');
}
