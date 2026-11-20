import confetti from 'canvas-confetti';

const playCelebrationChime = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;
    const frequencies = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6

    frequencies.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = index % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + index * 0.04);

      gain.gain.setValueAtTime(0, now + index * 0.04);
      gain.gain.linearRampToValueAtTime(0.12, now + index * 0.04 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.04 + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + index * 0.04);
      osc.stop(now + index * 0.04 + 0.9);
    });
  } catch (e) {
    // Audio context not allowed or supported without user gesture
    console.debug('Audio chime playback note:', e);
  }
};

export const triggerCelebration = () => {
  playCelebrationChime();

  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 1000,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
      colors: ['#d4ff00', '#dbb8ff', '#e2bbda', '#ffffff', '#b26fff'],
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};
