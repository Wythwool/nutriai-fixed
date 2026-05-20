(() => {
  const { qs } = window.Nutri;

  function formatTime(value) {
    if (!Number.isFinite(value)) return '0:00';
    const total = Math.max(0, Math.floor(value));
    const minutes = Math.floor(total / 60);
    const seconds = String(total % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  function updateUi(root, audio) {
    const button = qs('[data-audio-toggle]', root);
    const progress = qs('[data-audio-progress]', root);
    const current = qs('[data-audio-current]', root);
    const duration = qs('[data-audio-duration]', root);
    const isPlaying = !audio.paused && !audio.ended;

    root.classList.toggle('is-playing', isPlaying);
    if (button) button.textContent = isPlaying ? '❚❚' : '▶';
    if (current) current.textContent = formatTime(audio.currentTime);
    if (duration) duration.textContent = formatTime(audio.duration);
    if (progress) {
      const ratio = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
      progress.style.width = `${ratio}%`;
    }
  }

  function initAudioCard() {
    const root = qs('[data-voice-card]');
    if (!root) return;

    const audio = qs('[data-trainer-audio]', root);
    const button = qs('[data-audio-toggle]', root);
    if (!audio || !button) return;

    button.addEventListener('click', async () => {
      if (!audio.paused) {
        audio.pause();
        return;
      }
      try {
        await audio.play();
      } catch (error) {
        console.error(error);
      }
    });

    root.addEventListener('click', (event) => {
      if (event.target.closest('[data-audio-toggle]')) return;
      if (!event.target.closest('.voice-card__progress')) return;
      const bar = event.target.closest('.voice-card__progress');
      const rect = bar.getBoundingClientRect();
      const ratio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
      if (audio.duration) {
        audio.currentTime = audio.duration * ratio;
        updateUi(root, audio);
      }
    });

    ['loadedmetadata', 'timeupdate', 'play', 'pause', 'ended'].forEach((eventName) => {
      audio.addEventListener(eventName, () => updateUi(root, audio));
    });

    updateUi(root, audio);
  }

  window.Nutri.initAudioPlayer = initAudioCard;
})();
