export function open(title, content, onClose) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
        <div class="modal-content">
            <h2>${title}</h2>
            <div id="modal-body">${content}</div>
            <div style="margin-top:1rem;text-align:right;">
                <button class="btn" id="modal-close-btn">Tutup</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector('#modal-close-btn').addEventListener('click', () => {
        overlay.remove();
        if (onClose) onClose();
    });
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) { overlay.remove(); if (onClose) onClose(); }
    });
    return overlay.querySelector('#modal-body');
}