import { toast } from './toast.js';

export function render() {
    const nav = document.createElement('nav');
    nav.className = 'navbar';
    nav.innerHTML = `
        <a href="#home" class="navbar-brand" style="text-decoration:none;color:#fff;font-weight:bold;font-size:1.2rem;">Kalamashada</a>
        <button class="navbar-toggle" aria-label="Toggle menu">&#9776;</button>
        <ul class="navbar-links">
            <li><a href="#home">Beranda</a></li>
            <li><a href="#calendar">Kalender</a></li>
            <li><a href="#alumni">Alumni</a></li>
            <li><a href="#gallery">Galeri</a></li>
            <li><a href="#admin">Admin</a></li>
        </ul>
    `;
    const toggle = nav.querySelector('.navbar-toggle');
    const links = nav.querySelector('.navbar-links');
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    return nav;
}

export function logoutPrompt() {
    toast('Anda telah logout.', 'success');
}