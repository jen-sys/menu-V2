import { useCallback } from 'react'
export const PAYMENT_SOUND = '/sounds/payment-success.mp3' // ganti file ini dengan audio kamu
// Memutar mp3; jika file belum ada / diblokir browser, pakai bunyi bell sintetis (Web Audio).
export function playPaymentSound() {
  const a = new Audio(PAYMENT_SOUND); a.volume = 0.9
  a.play().catch(() => chime())
  a.onerror = () => chime()
}
function chime() {
  try {
    const ctx = new AudioContext()
    ;[880, 1318].forEach((f, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime + i * 0.15
      o.frequency.value = f; o.type = 'sine'; g.gain.setValueAtTime(0.25, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.9)
      o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + 0.9)
    })
  } catch { /* audio tidak tersedia */ }
}
export const useAudioNotification = () => useCallback(playPaymentSound, [])
