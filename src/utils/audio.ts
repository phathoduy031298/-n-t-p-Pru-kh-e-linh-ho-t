// Web Audio API Synthesizer for Kahoot-style Classroom Presentation Sounds & Lively BGM

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isBgmPlaying: boolean = false;
  private bgmInterval: any = null;
  private bgmStep: number = 0;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopLivelyBGM();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public isBGMActive(): boolean {
    return this.isBgmPlaying;
  }

  // --- Lively, Upbeat Kahoot-style BGM Generator ---
  public startLivelyBGM() {
    if (this.isMuted || this.isBgmPlaying) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      this.isBgmPlaying = true;
      this.bgmStep = 0;

      // Upbeat Kahoot-inspired melody notes (pentatonic playful bounce: C4, D4, E4, G4, A4, C5)
      const melodyFreqs = [
        523.25, 0, 659.25, 783.99, 
        0, 880.0, 783.99, 659.25,
        523.25, 587.33, 659.25, 0,
        783.99, 880.0, 1046.5, 0
      ];

      // Funky bass notes (C2, G2, A2, F2)
      const bassFreqs = [
        130.81, 130.81, 196.0, 196.0, 
        220.0, 220.0, 174.61, 174.61,
        130.81, 130.81, 196.0, 196.0, 
        220.0, 246.94, 261.63, 196.0
      ];

      const stepTimeMs = 150; // ~100 BPM energetic groove

      this.bgmInterval = setInterval(() => {
        if (!this.ctx || !this.isBgmPlaying || this.isMuted) return;

        const now = this.ctx.currentTime;
        const currentIdx = this.bgmStep % 16;
        const melodyFreq = melodyFreqs[currentIdx];
        const bassFreq = bassFreqs[currentIdx];

        // 1. Play Melody / Marimba Synth
        if (melodyFreq > 0) {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(melodyFreq, now);

          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.12);
        }

        // 2. Play Bass note
        if (bassFreq > 0 && currentIdx % 2 === 0) {
          const bassOsc = this.ctx.createOscillator();
          const bassGain = this.ctx.createGain();
          bassOsc.type = 'sine';
          bassOsc.frequency.setValueAtTime(bassFreq, now);

          bassGain.gain.setValueAtTime(0.06, now);
          bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

          bassOsc.connect(bassGain);
          bassGain.connect(this.ctx.destination);
          bassOsc.start(now);
          bassOsc.stop(now + 0.18);
        }

        // 3. Rhythmic Hi-Hat / Pop tick on every beat
        const popOsc = this.ctx.createOscillator();
        const popGain = this.ctx.createGain();
        popOsc.type = 'square';
        popOsc.frequency.setValueAtTime(currentIdx % 4 === 0 ? 300 : 1200, now);
        popGain.gain.setValueAtTime(currentIdx % 4 === 0 ? 0.03 : 0.015, now);
        popGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
        popOsc.connect(popGain);
        popGain.connect(this.ctx.destination);
        popOsc.start(now);
        popOsc.stop(now + 0.04);

        this.bgmStep++;
      }, stepTimeMs);
    } catch {
      // AudioContext fallback
    }
  }

  public stopLivelyBGM() {
    this.isBgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  // Double Points Fanfare (Sparkling arpeggio)
  public playDoublePointsFanfare() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.18, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.25);
      });
    } catch {
      // Fallback
    }
  }

  // Drumroll & Fanfare for Podium Reveals
  public playPodiumReveal(place: 1 | 2 | 3) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      if (place === 1) {
        // Grand Gold Winner Triumphant Fanfare
        const freqs = [523.25, 659.25, 783.99, 1046.5];
        freqs.forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);

          gain.gain.setValueAtTime(0.15, now + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.8);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.8);
        });
      } else {
        // Silver or Bronze fanfare
        const freqs = [440, 554.37, 659.25];
        freqs.forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);

          gain.gain.setValueAtTime(0.12, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.4);
        });
      }
    } catch {
      // Fallback
    }
  }

  // Pleasant click sound
  public playClick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // AudioContext policy fallback
    }
  }

  // Cheerful, crystal "Ding" chime for correct answers
  public playDing() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // High-register bell "Ding" with shimmering harmonics (E6 + B6)
      const primaryFreq = 1318.51; // E6
      const harmonicFreq = 2637.02; // E7

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      const gain2 = this.ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(primaryFreq, now);
      osc2.frequency.setValueAtTime(harmonicFreq, now);

      gain1.gain.setValueAtTime(0.25, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      gain2.gain.setValueAtTime(0.12, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc1.connect(gain1);
      osc2.connect(gain2);
      gain1.connect(this.ctx.destination);
      gain2.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.45);
      osc2.stop(now + 0.3);
    } catch {
      // AudioContext policy fallback
    }
  }

  // Triumphant Fanfare for Correct Answer (includes cheerful ding)
  public playCorrect() {
    if (this.isMuted) return;
    this.playDing();
  }

  // Soothing, gentle notification alert for Incorrect Answer (warm two-tone chime, instructive)
  public playGentleNotification() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Soft minor third descent (440Hz -> 392Hz) with smooth fade
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(440, now);
      osc1.frequency.exponentialRampToValueAtTime(370, now + 0.18);

      gain1.gain.setValueAtTime(0.12, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.4);
    } catch {
      // AudioContext policy fallback
    }
  }

  // Gentle reminder sound for Incorrect Answer
  public playWrong() {
    if (this.isMuted) return;
    this.playGentleNotification();
  }

  // Clock tick sound for countdown
  public playTick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch {
      // AudioContext policy fallback
    }
  }

  // Victory fanfare on quiz complete
  public playVictory() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Grand celebratory chords
      const chords = [
        { freqs: [523.25, 659.25, 783.99], time: 0 },
        { freqs: [587.33, 739.99, 880.0], time: 0.18 },
        { freqs: [659.25, 830.61, 987.77], time: 0.36 },
        { freqs: [783.99, 987.77, 1174.66, 1567.98], time: 0.54, duration: 0.8 },
      ];

      chords.forEach((chord) => {
        chord.freqs.forEach((freq) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + chord.time);

          const dur = chord.duration || 0.25;
          gain.gain.setValueAtTime(0.2, now + chord.time);
          gain.gain.exponentialRampToValueAtTime(0.001, now + chord.time + dur);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now + chord.time);
          osc.stop(now + chord.time + dur);
        });
      });
    } catch {
      // AudioContext policy fallback
    }
  }
}

export const sound = new SoundEngine();
