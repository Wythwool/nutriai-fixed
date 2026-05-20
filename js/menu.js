(() => {
  const { qs, qsa, scrollToId } = window.Nutri;
  const data = window.NUTRIAI_DATA;

  function buildRail() {
    const rail = qs('[data-rail]');
    const grid = qs('[data-menu-links]');
    if (!rail || !grid) return;

    rail.innerHTML = '';
    grid.innerHTML = '';

    data.chapters.forEach((chapter) => {
      const railButton = document.createElement('button');
      railButton.type = 'button';
      railButton.textContent = chapter.number;
      railButton.setAttribute('aria-label', `${chapter.number}. ${chapter.title}`);
      railButton.dataset.goto = chapter.id;
      rail.appendChild(railButton);

      const card = document.createElement('button');
      card.type = 'button';
      card.dataset.goto = chapter.id;
      card.innerHTML = `<b>${chapter.number}</b><span>${chapter.title}</span>`;
      grid.appendChild(card);
    });
  }

  function setupMenu() {
    const body = document.body;
    const button = qs('[data-menu-button]');
    const menu = qs('[data-menu]');
    const closeButtons = qsa('[data-menu-close]');

    if (!button || !menu) return;

    const setOpen = (isOpen) => {
      body.classList.toggle('menu-open', isOpen);
      button.setAttribute('aria-expanded', String(isOpen));
      menu.setAttribute('aria-hidden', String(!isOpen));
    };

    button.addEventListener('click', () => setOpen(!body.classList.contains('menu-open')));
    closeButtons.forEach((close) => close.addEventListener('click', () => setOpen(false)));

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setOpen(false);
    });

    document.addEventListener('click', (event) => {
      const goto = event.target.closest('[data-goto]');
      if (!goto) return;
      setOpen(false);
      scrollToId(goto.dataset.goto);
    });
  }

  function trackActiveChapter() {
    const sections = qsa('.scene[data-chapter]');
    const numberEl = qs('[data-chapter-num]');
    const nameEl = qs('[data-chapter-name]');
    const railButtons = qsa('[data-rail] button');

    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      const section = visible.target;
      const id = section.id;
      const chapter = data.chapters.find((item) => item.id === id);
      if (!chapter) return;

      if (numberEl) numberEl.textContent = chapter.number;
      if (nameEl) nameEl.textContent = chapter.title;

      railButtons.forEach((btn) => btn.classList.toggle('is-active', btn.dataset.goto === id));
    }, { threshold: [0.25, 0.45, 0.65] });

    sections.forEach((section) => observer.observe(section));
  }

  window.Nutri.initMenu = () => {
    buildRail();
    setupMenu();
    trackActiveChapter();
  };
})();
