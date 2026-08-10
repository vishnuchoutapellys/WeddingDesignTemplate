// Web Audio API procedural sound synthesis for ultra-responsive wedding interactions

class SoundManager {
  private ctx: AudioContext | null = null;
  private fluteInterval: number | null = null;
  private isSynthesizingBGM: boolean = false;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Authentic Dhol Drum Beat: Low punch bass + high rim snap
  playDholBeat(variation: 'bass' | 'treble' | 'both' = 'both') {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      if (variation === 'bass' || variation === 'both') {
        // Deep bass punch
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.18);

        gain.gain.setValueAtTime(0.9, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      }

      if (variation === 'treble' || variation === 'both') {
        // High crisp rim hit
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(480, now);
        osc2.frequency.exponentialRampToValueAtTime(120, now + 0.08);

        gain2.gain.setValueAtTime(0.6, now);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now);
        osc2.stop(now + 0.1);
      }
    } catch {
      // Audio fallback silent catch
    }
  }

  // Auspicious Temple Bells / Chimes for Wedding Blessings
  playTempleBell() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const frequencies = [880, 1320, 1760, 2640]; // Harmonic bell frequencies

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        const decay = 1.2 + idx * 0.4;
        gain.gain.setValueAtTime(0.3 / (idx + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.03);
        osc.stop(now + decay + 0.1);
      });
    } catch {
      // Audio fallback silent catch
    }
  }

  // Scratch sound for Haldi turmeric scratch card
  playScratchSound() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      
      // Buffer noise
      const bufferSize = ctx.sampleRate * 0.04;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.25;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400 + Math.random() * 800, now);
      filter.Q.setValueAtTime(2, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      whiteNoise.start(now);
    } catch {
      // Audio fallback silent catch
    }
  }

  // Henna stroke musical note
  playHennaNote(progress: number) {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const ragaNotes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25]; // Raga notes
      const noteIdx = Math.floor(progress * (ragaNotes.length - 1));
      const freq = ragaNotes[noteIdx] || 440;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // Audio fallback silent catch
    }
  }

  // Procedural Indian Flute & Tanpura ambient BGM generator
  startAmbientBgm() {
    if (this.isSynthesizingBGM) return;
    this.isSynthesizingBGM = true;
    const ctx = this.getContext();

    // // Raga Kalyani / Yaman scale (Sa Re Ga Ma Pa Dha Ni Sa)
    // const melody = [
    //   329.63, 369.99, 415.30, 493.88, 554.37, 659.25, 493.88, 415.30,
    //   369.99, 329.63, 277.18, 329.63, 369.99, 415.30, 493.88, 329.63
    // ];
    // Original Kalyani-inspired wedding melody (not from any film song)
    const melody = [
      329.63, 415.30, 493.88, 554.37,
      659.25, 739.99, 659.25, 554.37,
      493.88, 415.30, 369.99, 329.63,
      415.30, 493.88, 554.37, 659.25
    ];
    let noteIndex = 0;

    const playNextNote = () => {
      if (!this.isSynthesizingBGM) return;
      try {
        const now = ctx.currentTime;
        const freq = melody[noteIndex % melody.length];
        noteIndex++;

        // Warm flute sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Soft vibrato
        const vibrato = ctx.createOscillator();
        const vibratoGain = ctx.createGain();
        vibrato.frequency.setValueAtTime(5, now);
        vibratoGain.gain.setValueAtTime(3.5, now);
        vibrato.connect(osc.frequency);
        vibrato.start(now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.25);
        vibrato.stop(now + 1.25);
      } catch {
        // Safe catch
      }
    };

    // Play notes rhythmically
    this.fluteInterval = window.setInterval(playNextNote, 900);
  }

  stopAmbientBgm() {
    this.isSynthesizingBGM = false;
    if (this.fluteInterval !== null) {
      clearInterval(this.fluteInterval);
      this.fluteInterval = null;
    }
  }
}

export const soundManager = new SoundManager();
