(() => {
  const { qs } = window.Nutri;

  function typeLine(el, speed = 34) {
    if (!el || el.dataset.typed === 'true') return;
    const text = el.textContent.trim();
    el.dataset.typed = 'true';
    el.textContent = '';

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      el.textContent = text.slice(0, index);
      if (index >= text.length) window.clearInterval(timer);
    }, speed);
  }

  function initTypewriter() {
    const machine = qs('[data-quote-machine]');
    const line = qs('[data-type-line]');
    if (!machine || !line) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        typeLine(line);
        observer.disconnect();
      });
    }, { threshold: .45 });

    observer.observe(machine);
  }

  window.Nutri.initTypewriter = initTypewriter;
})();
