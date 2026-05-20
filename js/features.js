(() => {
  const { qs, qsa } = window.Nutri;
  const features = window.NUTRIAI_DATA.features;

  function renderFeature(root, key) {
    const item = features[key];
    if (!item) return;

    qsa('[data-feature]', root).forEach((button) => {
      const active = button.dataset.feature === key;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', String(active));
    });

    const icon = qs('.scanner-window__plate', root);
    const tags = qs('.scanner-window__tags', root);
    const kicker = qs('[data-feature-kicker]', root);
    const title = qs('[data-feature-title]', root);
    const text = qs('[data-feature-text]', root);
    const display = qs('.feature-display', root);

    if (display) {
      display.animate([
        { opacity: 0, transform: 'translateY(10px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 280, easing: 'cubic-bezier(.19, 1, .22, 1)' });
    }

    if (icon) icon.textContent = item.icon;
    if (tags) tags.innerHTML = item.tags.map((tag) => `<span>${tag}</span>`).join('');
    if (kicker) kicker.textContent = item.kicker;
    if (title) title.textContent = item.title;
    if (text) text.textContent = item.text;
  }

  function initFeatureTabs() {
    const root = qs('[data-feature-tabs]');
    if (!root) return;

    root.addEventListener('click', (event) => {
      const button = event.target.closest('[data-feature]');
      if (!button) return;
      renderFeature(root, button.dataset.feature);
    });
  }

  function initProblemBoard() {
    const board = qs('[data-problem-board]');
    const button = qs('[data-problem-button]');
    if (!board || !button) return;

    const chips = qsa('.problem-chip', board);
    const calmPositions = chips.map((chip) => ({
      x: chip.style.getPropertyValue('--x'),
      y: chip.style.getPropertyValue('--y'),
      r: chip.style.getPropertyValue('--r')
    }));

    function randomize() {
      const scattered = !board.classList.contains('is-scattered');
      board.classList.toggle('is-scattered', scattered);
      button.textContent = scattered ? 'зібрати список' : 'показати список';

      chips.forEach((chip, index) => {
        if (!scattered) {
          chip.style.setProperty('--x', calmPositions[index].x || '0px');
          chip.style.setProperty('--y', calmPositions[index].y || '0px');
          chip.style.setProperty('--r', calmPositions[index].r || '0deg');
          return;
        }

        const x = Math.round((Math.random() - .5) * 360);
        const y = Math.round((Math.random() - .5) * 420);
        const r = Math.round((Math.random() - .5) * 34);
        chip.style.setProperty('--x', `${x}px`);
        chip.style.setProperty('--y', `${y}px`);
        chip.style.setProperty('--r', `${r}deg`);
      });
    }

    button.addEventListener('click', randomize);
  }

  function initVoiceCard() {
    const card = qs('[data-voice-card]');
    const button = qs('[data-wave-button]');
    if (!card || !button) return;

    button.addEventListener('click', () => {
      const playing = card.classList.toggle('is-playing');
      button.textContent = playing ? 'Ⅱ' : '▶';
    });
  }

  window.Nutri.initFeatures = () => {
    initFeatureTabs();
    initProblemBoard();
    initVoiceCard();
  };
})();
