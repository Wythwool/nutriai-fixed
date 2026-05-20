(() => {
  const { qsa } = window.Nutri;

  function initReveal() {
    const items = qsa('[data-anim]');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        entry.target.dispatchEvent(new CustomEvent('nutri:visible', { bubbles: true }));
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.22, rootMargin: '0px 0px -8% 0px' });

    items.forEach((item) => observer.observe(item));
  }

  function initSceneEvents() {
    const scenes = qsa('.scene');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('scene-live');
        entry.target.dispatchEvent(new CustomEvent('nutri:scene-live', { bubbles: true }));
      });
    }, { threshold: 0.35 });

    scenes.forEach((scene) => observer.observe(scene));
  }

  window.Nutri.initReveal = () => {
    initReveal();
    initSceneEvents();
  };
})();
