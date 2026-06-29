let audioCtx = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export const playBeep = () => {
  try {
    initAudio();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 high beep
    
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
  } catch (e) {
    console.warn("Audio Context error:", e);
  }
};

export const playIgnition = () => {
  try {
    initAudio();
    if (!audioCtx) return;
    
    // Create rocket roar using noise buffer
    const bufferSize = audioCtx.sampleRate * 2.0; // 2 seconds
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(80, audioCtx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 1.8);
    
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.0);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    
    noise.start();
    noise.stop(audioCtx.currentTime + 2.0);
  } catch (e) {
    console.warn(e);
  }
};

export const playExplosion = () => {
  try {
    initAudio();
    if (!audioCtx) return;
    
    // Sub-bass drop
    const osc = audioCtx.createOscillator();
    const oscGain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(25, audioCtx.currentTime + 0.6);
    
    oscGain.gain.setValueAtTime(0.65, audioCtx.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
    
    osc.connect(oscGain);
    oscGain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.8);
    
    // Noise explosion blast
    const bufferSize = audioCtx.sampleRate * 0.7;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(250, audioCtx.currentTime);
    
    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.35, audioCtx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.7);
    
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(audioCtx.destination);
    
    noise.start();
    noise.stop(audioCtx.currentTime + 0.7);
  } catch (e) {
    console.warn(e);
  }
};

export const playGlassCrack = () => {
  try {
    initAudio();
    if (!audioCtx) return;
    
    // Crack metal-frequency sine waves
    for (let i = 0; i < 4; i++) {
      const timeOffset = audioCtx.currentTime + i * 0.05;
      
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2000 + Math.random() * 4000, timeOffset);
      
      gain.gain.setValueAtTime(0.06, timeOffset);
      gain.gain.exponentialRampToValueAtTime(0.001, timeOffset + 0.06);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(timeOffset);
      osc.stop(timeOffset + 0.06);
    }
    
    // High-pass crack noise burst
    const bufferSize = audioCtx.sampleRate * 0.25;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(5000, audioCtx.currentTime);
    
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    
    noise.start();
    noise.stop(audioCtx.currentTime + 0.25);
  } catch (e) {
    console.warn(e);
  }
};

export const playStartup = () => {
  try {
    initAudio();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(320, audioCtx.currentTime + 0.65);
    
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, audioCtx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.65);

    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.75);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.75);
  } catch (e) {
    console.warn(e);
  }
};

export const playWhoosh = () => {
  try {
    initAudio();
    if (!audioCtx) return;
    const bufferSize = audioCtx.sampleRate * 1.5;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'peaking';
    filter.Q.setValueAtTime(6.0, audioCtx.currentTime);
    filter.frequency.setValueAtTime(100, audioCtx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1100, audioCtx.currentTime + 0.6);
    filter.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 1.4);
    
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 0.55);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.45);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    
    noise.start();
    noise.stop(audioCtx.currentTime + 1.45);
  } catch (e) {
    console.warn(e);
  }
};
