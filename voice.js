// Ravi's narration: plays the pre-recorded clip for a line (AI clone of his voice, used with his permission).
// Clip file name = FNV-1a hash of the line text, same scheme as the main portfolio.
(function () {
  const CLIPS = new Set(window.RAVI.clips);
  function hash(t) {
    t = t.replace(/\s+/g, ' ').trim();
    let n = 2166136261;
    for (let i = 0; i < t.length; i++) { n ^= t.charCodeAt(i); n = Math.imul(n, 16777619); }
    return (n >>> 0).toString(16).padStart(8, '0');
  }
  const audio = new Audio();
  audio.preload = 'auto';
  let onEnd = null, muted = false, current = null;
  try { muted = localStorage.getItem('rk-muted') === '1'; } catch (e) {}
  audio.addEventListener('ended', () => { const f = onEnd; onEnd = null; current = null; emit(); f && f(); });
  const subs = new Set();
  function emit() { subs.forEach((f) => f({ speaking: !!current && !audio.paused, text: current, muted })); }
  window.Voice = {
    has: (text) => CLIPS.has(hash(text)),
    src: (text) => 'voice/' + hash(text) + '.mp3',
    duration: () => audio.duration || 0,
    time: () => audio.currentTime || 0,
    audio,
    subscribe(f) { subs.add(f); return () => subs.delete(f); },
    speak(text, cb) {
      this.stop();
      current = text; onEnd = cb || null;
      if (muted || !CLIPS.has(hash(text))) {
        // No sound: keep the caption up for a reading-length pause, then finish.
        emit();
        const ms = Math.max(1800, text.length * 55);
        this._t = setTimeout(() => { const f = onEnd; onEnd = null; current = null; emit(); f && f(); }, ms);
        return Promise.resolve(false);
      }
      audio.src = 'voice/' + hash(text) + '.mp3';
      emit();
      return audio.play().then(() => { emit(); return true; }).catch(() => {
        const f = onEnd; onEnd = null; current = null; emit(); f && f(); return false;
      });
    },
    stop() { clearTimeout(this._t); audio.pause(); onEnd = null; current = null; emit(); },
    toggleMute() { muted = !muted; try { localStorage.setItem('rk-muted', muted ? '1' : '0'); } catch (e) {} if (muted) this.stop(); emit(); return muted; },
    isMuted: () => muted,
  };
})();
