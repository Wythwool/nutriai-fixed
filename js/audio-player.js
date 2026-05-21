(() => {
  const AUDIO_SRC = 'assets/audio/trainer-review.mp3';

  function $(selector, root = document) {
    return root.querySelector(selector);
  }

  function formatTime(value) {
    if (!Number.isFinite(value)) return '0:00';

    const total = Math.floor(value);
    const minutes = Math.floor(total / 60);
    const seconds = String(total % 60).padStart(2, '0');

    return `${minutes}:${seconds}`;
  }

  function setStatus(root, text) {
    const status = $('[data-audio-status]', root);
    if (status) status.textContent = text;
  }

  function updateUi(root, audio) {
    const button = $('[data-audio-toggle]', root);
    const progress = $('[data-audio-progress]', root);
    const current = $('[data-audio-current]', root);
    const duration = $('[data-audio-duration]', root);

    const playing = !audio.paused && !audio.ended;

    root.classList.toggle('is-playing', playing);

    if (button) button.textContent = playing ? '❚❚' : '▶';
    if (current) current.textContent = formatTime(audio.currentTime);
    if (duration) duration.textContent = formatTime(audio.duration);

    if (progress) {
      const percent = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
      progress.style.width = `${percent}%`;
    }
  }

  function initAudioCard() {
    const root = $('[data-voice-card]');
    if (!root) return;

    const audio = $('[data-trainer-audio]', root);
    const button = $('[data-audio-toggle]', root);

    if (!audio || !button) return;

    audio.src = AUDIO_SRC;
    audio.preload = 'metadata';
    audio.load();

    button.addEventListener('click', async () => {
      if (!audio.paused) {
        audio.pause();
        return;
      }

      try {
        await audio.play();
        setStatus(root, 'Відтворюється');
      } catch (error) {
        setStatus(root, 'Не вдалося запустити аудіо');
        console.error('Audio error:', error);
      }
    });

    const bar = $('.voice-card__progress', root);

    if (bar) {
      bar.addEventListener('click', (event) => {
        if (!audio.duration) return;

        const rect = bar.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const percent = Math.min(Math.max(x / rect.width, 0), 1);

        audio.currentTime = audio.duration * percent;
        updateUi(root, audio);
      });
    }

    audio.addEventListener('loadedmetadata', () => {
      setStatus(root, 'Аудіо готове');
      updateUi(root, audio);
    });

    audio.addEventListener('timeupdate', () => updateUi(root, audio));
    audio.addEventListener('play', () => updateUi(root, audio));
    audio.addEventListener('pause', () => updateUi(root, audio));

    audio.addEventListener('ended', () => {
      audio.currentTime = 0;
      setStatus(root, 'Аудіо завершено');
      updateUi(root, audio);
    });

    audio.addEventListener('error', () => {
      setStatus(root, 'Файл аудіо не знайдено');
      console.error('Audio file not found:', AUDIO_SRC);
    });

    updateUi(root, audio);
  }

  window.Nutri.initAudioPlayer = initAudioCard;
})();
