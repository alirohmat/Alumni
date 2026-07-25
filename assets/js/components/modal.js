export function open(title, content, onClose) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = `
        <div class="modal-content">
            <h2 id="modal-title">${title}</h2>
            <div id="modal-body">${content}</div>
            <div style="margin-top:1rem;">
                <button type="button" class="btn btn-outline" id="modal-close-btn" style="width:100%;">Tutup</button>
            </div>
        </div>
    `;
    overlay.setAttribute('aria-labelledby', 'modal-title');

    function close() {
        overlay.classList.remove('show');
        setTimeout(() => {
            overlay.remove();
            document.body.classList.remove('nav-open');
            if (onClose) onClose();
        }, 200);
    }

    function onKey(e) {
        if (e.key === 'Escape') close();
    }

    document.body.classList.add('nav-open');
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('show'));

    overlay.querySelector('#modal-close-btn').addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
    });
    document.addEventListener('keydown', onKey, { once: true });

    return overlay.querySelector('#modal-body');
}