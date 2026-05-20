(() => {
  const { qs } = window.Nutri;
  const weights = window.NUTRIAI_DATA.weights;

  function buildTable(root) {
    const table = qs('[data-weight-table]', root);
    if (!table) return [];

    const min = 75;
    const max = 110;

    table.innerHTML = weights.map((point) => {
      const height = ((point.weight - min) / (max - min)) * 100;
      return `
        <article class="weight-row" data-weight-row>
          <div class="weight-row__bar" style="height:${Math.max(18, height)}%"></div>
          <b>${point.weight}</b>
          <span>${point.label}</span>
        </article>
      `;
    }).join('');

    return Array.from(table.querySelectorAll('[data-weight-row]'));
  }

  function fitCanvas(canvas) {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    canvas.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
    return rect;
  }

  function drawChart(canvas, progress) {
    const rect = fitCanvas(canvas);
    const ctx = canvas.getContext('2d');
    const w = rect.width;
    const h = rect.height;
    const compact = w < 520;
    const padX = compact ? 24 : (w < 700 ? 42 : 68);
    const padY = compact ? 34 : (w < 700 ? 58 : 78);
    const min = 75;
    const max = 110;

    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let i = 0; i < 5; i += 1) {
      const y = padY + ((h - padY * 2) / 4) * i;
      ctx.strokeStyle = 'rgba(244,240,232,.07)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padX, y);
      ctx.lineTo(w - padX, y);
      ctx.stroke();
    }

    const points = weights.map((point, index) => {
      const x = padX + ((w - padX * 2) / (weights.length - 1)) * index;
      const y = padY + (1 - ((point.weight - min) / (max - min))) * (h - padY * 2);
      return { x, y, weight: point.weight, label: point.label };
    });

    const revealX = padX + (w - padX * 2) * progress;

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, revealX, h);
    ctx.clip();

    const gradient = ctx.createLinearGradient(padX, 0, w - padX, 0);
    gradient.addColorStop(0, '#ff554d');
    gradient.addColorStop(.45, '#ffc857');
    gradient.addColorStop(1, '#35d07f');

    ctx.strokeStyle = 'rgba(0,0,0,.42)';
    ctx.lineWidth = 12;
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 5;
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();

    points.forEach((point) => {
      if (point.x > revealX + 4) return;
      ctx.fillStyle = '#07100d';
      ctx.strokeStyle = '#35d07f';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      const showLabel = !compact || point === points[0] || point === points[points.length - 1] || (points.indexOf(point) % 2 === 0);
      if (showLabel) {
        const labelOffset = compact && points.indexOf(point) % 4 === 2 ? 24 : -16;
        ctx.fillStyle = 'rgba(244,240,232,.92)';
        ctx.font = compact ? '800 10px system-ui, sans-serif' : '800 12px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${point.weight} кг`, point.x, point.y + labelOffset);
      }
    });
    ctx.restore();

    const last = points[points.length - 1];
    if (progress > .96) {
      const pulse = 1 + Math.sin(Date.now() / 160) * .16;
      ctx.strokeStyle = 'rgba(53,208,127,.35)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(last.x, last.y, 20 * pulse, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();
  }

  function animateChart(root) {
    const canvas = qs('[data-weight-canvas]', root);
    if (!canvas) return;

    root.classList.add('chart-live');
    const start = performance.now();
    const duration = 1500;

    function tick(now) {
      const raw = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - raw, 3);
      drawChart(canvas, eased);
      if (raw < 1) requestAnimationFrame(tick);
      else {
        drawChart(canvas, 1);
        root.dataset.chartDone = 'true';
      }
    }

    requestAnimationFrame(tick);
  }

  function startWeightLab(root) {
    if (root.dataset.started) return;
    root.dataset.started = 'true';

    const rows = buildTable(root);
    rows.forEach((row, index) => {
      window.setTimeout(() => row.classList.add('is-live'), index * 110);
    });

    window.setTimeout(() => animateChart(root), rows.length * 110 + 420);
  }

  function initWeightLab() {
    const root = qs('[data-weight-lab]');
    if (!root) return;
    buildTable(root);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        startWeightLab(root);
        observer.disconnect();
      });
    }, { threshold: .35 });

    observer.observe(root);

    window.addEventListener('resize', () => {
      if (root.dataset.chartDone === 'true') {
        const canvas = qs('[data-weight-canvas]', root);
        if (canvas) drawChart(canvas, 1);
      }
    });
  }

  window.Nutri.initWeightChart = initWeightLab;
})();
