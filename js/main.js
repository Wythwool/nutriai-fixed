(() => {
  const { qs } = window.Nutri;

  function initCursorGlow() {
    const glow = qs('.cursor-glow');
    if (!glow) return;

    let x = -200;
    let y = -200;
    let tx = x;
    let ty = y;

    window.addEventListener('pointermove', (event) => {
      tx = event.clientX;
      ty = event.clientY;
      glow.style.opacity = '1';
    });

    window.addEventListener('pointerleave', () => {
      glow.style.opacity = '0';
    });

    function loop() {
      x += (tx - x) * .14;
      y += (ty - y) * .14;
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      requestAnimationFrame(loop);
    }
    loop();
  }

  function initNextButton() {
    const button = qs('[data-scroll-next]');
    if (!button) return;
    button.addEventListener('click', () => {
      const next = qs('#story');
      if (next) next.scrollIntoView({ behavior: 'smooth' });
    });
  }

  window.Nutri.onReady(() => {
    window.Nutri.initMenu();
    window.Nutri.initReveal();
    window.Nutri.initFeatures();
    window.Nutri.initCompare();
    window.Nutri.initWeightChart();
    window.Nutri.initTypewriter();
    window.Nutri.initAudioPlayer();
    window.Nutri.initDownloadLinks();
    initCursorGlow();
    initNextButton();
  });
})();
