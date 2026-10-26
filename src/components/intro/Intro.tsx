import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import IntroSplash from './IntroSplash'
import IntroHero from './IntroHero'
// Total maks ±5 detik. Klik di mana saja / tombol Skip = langsung masuk.
export default function Intro({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState<'splash' | 'hero'>('splash')
  useEffect(() => {
    const a = setTimeout(() => setStage('hero'), 2200)
    const b = setTimeout(onDone, 5000)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [onDone])
  return (
    <motion.div className="fixed inset-0 z-[100] cursor-pointer overflow-hidden bg-gradient-to-b from-burgundy to-charcoal" onClick={onDone} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <AnimatePresence mode="wait">{stage === 'splash' ? <IntroSplash key="s" /> : <IntroHero key="h" onEnter={onDone} />}</AnimatePresence>
      <button onClick={(e) => { e.stopPropagation(); onDone() }} className="absolute right-5 top-5 text-xs text-gold-soft/70 hover:text-gold-soft">Skip</button>
    </motion.div>
  )
}
