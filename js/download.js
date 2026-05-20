(() => {
  function initDownloadLinks() {
    const links = document.querySelectorAll('[data-download-link]');
    if (!links.length) return;

    const isAndroid = /Android/i.test(navigator.userAgent || '');

    links.forEach((link) => {
      if (!isAndroid) {
        link.setAttribute('download', 'NutriAI.apk');
      }

      link.addEventListener('click', (event) => {
        const href = link.getAttribute('href');
        if (!href || !isAndroid) return;

        event.preventDefault();
        window.location.href = href;
      });
    });
  }

  window.Nutri.initDownloadLinks = initDownloadLinks;
})();
