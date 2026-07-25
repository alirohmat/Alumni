export function openLightbox(src, title = '') {
    const prev = document.querySelector('.lightbox-overlay');
    if (prev) prev.remove();

    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', title || 'Pratinjau foto');
    overlay.innerHTML = `
        <button type="button" class="lightbox-close" aria-label="Tutup">×</button>
        <img src="${src}" alt="${title}">
    `;

    function close() {
        overlay.remove();
        document.body.classList.remove('nav-open');
        document.removeEventListener('keydown', onKey);
    }

    function onKey(e) {
        if (e.key === 'Escape') close();
    }

    overlay.querySelector('.lightbox-close').addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
    });
    document.addEventListener('keydown', onKey);
    document.body.classList.add('nav-open');
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('show'));
    return overlay;
}
