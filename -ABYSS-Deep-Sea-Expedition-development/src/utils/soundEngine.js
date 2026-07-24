// Web Audio API Synthesizer for spatial deep-sea acoustics and sound effects

class OceanSoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.isInitialized = false;
    this.ambientGainNode = null;
    this.filterNode = null;
    this.noiseNode = null;
    this.sonarInterval = null;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master Lowpass Filter simulating water depth damping
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(800, this.ctx.currentTime);

      // Master Ambient Gain
      this.ambientGainNode = this.ctx.createGain();
      this.ambientGainNode.gain.setValueAtTime(0, this.ctx.currentTime);

      // Connect filter -> gain -> destination
      this.filterNode.connect(this.ambientGainNode);
      this.ambientGainNode.connect(this.ctx.destination);

      // Create pink/brown ambient water noise buffer
      this.createAmbientNoise();
      
      this.isInitialized = true;
    } catch (e) {
      console.warn('Audio Context initialization deferred:', e);
    }
  }

  createAmbientNoise() {
    if (!this.ctx) return;

    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Brown noise formula for deep rumble
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    // Sub-bass Sine LFO for ocean wave swells
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(0.1, this.ctx.currentTime); // 10s wave cycle
    lfoGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    lfo.connect(lfoGain);

    this.noiseNode.connect(this.filterNode);
    this.noiseNode.start();
    lfo.start();
  }

  toggleSound() {
    if (!this.isInitialized) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;

    if (this.ambientGainNode) {
      const targetGain = this.isMuted ? 0 : 0.25;
      this.ambientGainNode.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.3);
    }

    return !this.isMuted;
  }

  updateDepthAcoustics(depthRatio) { // depthRatio 0.0 (surface) -> 1.0 (hadal)
    if (!this.isInitialized || !this.filterNode) return;
    
    // Frequency shifts down as depth increases (800Hz -> 100Hz)
    const minFreq = 90;
    const maxFreq = 900;
    const currentFreq = maxFreq - depthRatio * (maxFreq - minFreq);

    this.filterNode.frequency.setTargetAtTime(currentFreq, this.ctx.currentTime, 0.2);
  }

  playSonarPing() {
    if (!this.ctx || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const pingGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 1.2);

      pingGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      pingGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);

      osc.connect(pingGain);
      pingGain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 1.3);
    } catch (e) {
      // Audio trigger fallback
    }
  }

  playBubblePop() {
    if (!this.ctx || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const startFreq = 300 + Math.random() * 400;
      osc.frequency.setValueAtTime(startFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(startFreq + 600, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch (e) {}
  }

  playWhaleSong() {
    if (!this.ctx || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(240, this.ctx.currentTime + 0.8);
      osc.frequency.linearRampToValueAtTime(180, this.ctx.currentTime + 1.8);
      osc.frequency.linearRampToValueAtTime(90, this.ctx.currentTime + 2.5);

      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 2.6);

      osc.connect(gain);
      gain.connect(this.filterNode || this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 2.7);
    } catch (e) {}
  }
}

export const oceanAudio = new OceanSoundEngine();
