(() => {
  const { qsa, qs, clamp } = window.Nutri;

  function setSplit(root, value) {
    const split = clamp(Number(value), 0, 100);
    const stage = qs('.compare__stage', root);
    const after = qs('[data-compare-after]', root);
    const handle = qs('[data-compare-handle]', root);
    const ratio = Math.max(split / 100, .01);

    if (stage) {
      stage.style.setProperty('--split', `${split}%`);
      stage.style.setProperty('--split-num', String(ratio));
    }
    if (after) {
      after.style.width = `${split}%`;
      after.style.setProperty('--split-num', String(ratio));
    }
    if (handle) handle.style.left = `${split}%`;
  }

  function initCompare() {
    qsa('[data-compare]').forEach((root) => {
      const range = qs('[data-compare-range]', root);
      if (!range) return;
      setSplit(root, range.value);
      range.addEventListener('input', () => setSplit(root, range.value));
    });
  }

  function initImageFallbacks() {
    qsa('img[data-fallback]').forEach((img) => {
      const useFallback = () => {
        if (img.dataset.usedFallback) return;
        img.dataset.usedFallback = 'true';
        img.src = img.dataset.fallback;
      };

      img.addEventListener('error', useFallback);
      if (img.complete && img.naturalWidth === 0) useFallback();
    });
  }

  window.Nutri.initCompare = () => {
    initImageFallbacks();
    initCompare();
  };
})();
