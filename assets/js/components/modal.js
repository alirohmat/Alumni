export function open(title, content, onClose) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
        <div class="modal-content">
            <h2>${title}</h2>
            <div id="modal-body">${content}</div>
            <div style="margin-top:1rem;">
                <button type="button" class="btn btn-outline" id="modal-close-btn" style="width:100%;">Tutup</button>
            </div>
        </div>
    `;
    function close() {
        overlay.remove();
        document.body.classList.remove('nav-open');
        if (onClose) onClose();
    }
    document.body.classList.add('nav-open');
    document.body.appendChild(overlay);
    overlay.querySelector('#modal-close-btn').addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
    });
    return overlay.querySelector('#modal-body');
}