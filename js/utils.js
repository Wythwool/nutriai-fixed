window.Nutri = window.Nutri || {};

window.Nutri.qs = (selector, root = document) => root.querySelector(selector);
window.Nutri.qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

window.Nutri.clamp = (value, min, max) => Math.min(Math.max(value, min), max);

window.Nutri.scrollToId = (id) => {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

window.Nutri.onReady = (fn) => {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, { once: true });
  else fn();
};
