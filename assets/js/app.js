import { render as navbar } from './components/navbar.js';

function init() {
    const app = document.getElementById('app');
    app.append(navbar());

    const pageContainer = document.createElement('div');
    pageContainer.id = 'page-content';
    app.append(pageContainer);

    const footer = document.createElement('footer');
    footer.id = 'app-footer';
    app.append(footer);

    async function router() {

        pageContainer.innerHTML = '';
        const hash = location.hash.replace('#', '') || 'home';

        let mod;
        switch (hash) {
            case 'home':    mod = await import('./pages/home.js'); break;
            case 'calendar':mod = await import('./pages/calendar.js'); break;
            case 'alumni':  mod = await import('./pages/alumni.js'); break;
            case 'gallery': mod = await import('./pages/gallery.js'); break;
            case 'admin':   mod = await import('./pages/admin.js'); break;
            default:        mod = await import('./pages/home.js'); break;
        }

        if (mod && mod.render) {
            pageContainer.append(mod.render());
        }

        footer.innerHTML = `
            <p>&copy; ${new Date().getFullYear()} Alumni Mansyaul Huda 02 — Kalamashada</p>
            <p><a href="https://wa.me/628123456789">Hubungi Kami</a></p>
        `;
    }

    window.addEventListener('hashchange', router);
    router();
}

init();