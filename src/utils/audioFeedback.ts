/**
 * Zero-dependency Web Audio API tactile sound synthesizer
 * Provides subtle mechanical clicks, page-flip swishes, and celebration chimes.
 */

let audioCtx: AudioContext | null = null;
let soundEnabled = false;

// Initialize AudioContext safely on user interaction
function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isAudioEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  return soundEnabled;
}

export function toggleAudio(force?: boolean): boolean {
  soundEnabled = force !== undefined ? force : !soundEnabled;
  if (soundEnabled) {
    getAudioContext();
    playClickSound(800, 0.04);
  }
  return soundEnabled;
}

/**
 * Tactile mechanical switch click (for buttons, chapter scrubbers, cards)
 */
export function playClickSound(freq = 600, duration = 0.03): void {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Ignore audio errors gracefully
  }
}

/**
 * Soft swish / whoosh (for chapter transitions, 3D book flips, card glides)
 */
export function playSwishSound(): void {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const bufferSize = ctx.sampleRate * 0.08;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Filtered pink-ish noise burst
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  } catch {
    // Ignore audio errors gracefully
  }
}

/**
 * Harmonic victory chime (for easter eggs, Konami code, resume download)
 */
export function playSuccessChime(): void {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.07);

      gain.gain.setValueAtTime(0.05, ctx.currentTime + index * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.07 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + index * 0.07);
      osc.stop(ctx.currentTime + index * 0.07 + 0.35);
    });
  } catch {
    // Ignore audio errors gracefully
  }
}

/**
 * Playful two-tone mascot boop sound (for chibi easter egg and dark mode boop)
 */
export function playMascotBoopSound(): void {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Fast chirpy ascending arpeggio with warm sine tone
    const freqs = [680, 1020];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.045);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.15, ctx.currentTime + idx * 0.045 + 0.08);

      gain.gain.setValueAtTime(0.09, ctx.currentTime + idx * 0.045);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.045 + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.045);
      osc.stop(ctx.currentTime + idx * 0.045 + 0.09);
    });
  } catch {
    // Ignore audio errors gracefully
  }
}

/**
 * Deep cosmic warp frequency sweep (for gravitational wormhole pulse)
 */
export function playWarpSound(): void {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(260, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.45);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.45);
  } catch {
    // Ignore audio errors gracefully
  }
}

