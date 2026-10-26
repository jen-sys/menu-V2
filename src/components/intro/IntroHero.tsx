import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
const TAGLINE = 'Rasa yang bercerita, pelayanan yang berkesan.'
const dots = Array.from({ length: 16 }, (_, i) => ({ x: (i * 37) % 100, d: 3 + (i % 5), s: 2 + (i % 3) * 2 }))
export default function IntroHero({ onEnter }: { onEnter: () => void }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setN((v) => Math.min(v + 1, TAGLINE.length)), 32)
    return () => clearInterval(t)
  }, [])
  return (
    <motion.div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {dots.map((p, i) => (
        <motion.span key={i} aria-hidden className="absolute bottom-0 rounded-full bg-gold/70" style={{ left: `${p.x}%`, width: p.s, height: p.s }}
          animate={{ y: [0, -520], opacity: [0, 0.8, 0] }} transition={{ duration: p.d, repeat: Infinity, delay: i * 0.25, ease: 'easeOut' }} />
      ))}
      <motion.div initial={{ y: 60 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="flex flex-col items-center">
        <img src="/logo.svg" alt="" className="h-16 w-16" />
        <h1 className="mt-3 font-serif text-4xl text-gold-soft">Restoku</h1>
      </motion.div>
      <p className="mt-6 min-h-[3.5rem] max-w-md font-serif text-xl italic text-cream md:text-2xl" aria-label={TAGLINE}>{TAGLINE.slice(0, n)}<span className="animate-pulse text-gold">|</span></p>
      <motion.button onClick={(e) => { e.stopPropagation(); onEnter() }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: n >= TAGLINE.length ? 1 : 0, y: 0 }}
        className="mt-8 rounded-full border border-gold bg-gold px-8 py-3 text-sm font-semibold text-charcoal shadow-[0_0_28px_rgba(212,162,76,.45)] transition hover:shadow-[0_0_40px_rgba(212,162,76,.7)]">Masuk ke Toko</motion.button>
    </motion.div>
  )
}
