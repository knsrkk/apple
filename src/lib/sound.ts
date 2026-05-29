/** Победный аккорд через Web Audio API */
export function playVictorySound(): void {
  if (typeof window === "undefined") return;

  try {
    const ctx = new (
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    )();

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
    const now = ctx.currentTime;

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      osc.connect(gain);
      gain.connect(ctx.destination);

      const start = now + i * 0.08;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.18, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.45);

      osc.start(start);
      osc.stop(start + 0.5);
    });

    window.setTimeout(() => void ctx.close(), 1200);
  } catch {
    // Audio недоступен — тихо игнорируем
  }
}
