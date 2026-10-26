import { motion } from 'framer-motion'
export default function IntroSplash() {
  return (
    <motion.div className="absolute inset-0 flex flex-col items-center justify-center" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <motion.img src="/logo.svg" alt="Logo Restoku" className="h-24 w-24" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: 'easeOut' }} />
      <motion.h1 className="mt-5 font-serif text-5xl tracking-wide text-gold-soft" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.9 }}>Restoku</motion.h1>
      <div className="mt-8 h-px w-48 overflow-hidden bg-white/15" role="progressbar" aria-label="Memuat">
        <motion.div className="h-full bg-gold" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2, ease: 'easeInOut' }} />
      </div>
      <p className="mt-4 px-6 text-center text-xs text-gold-soft/70">Menyiapkan pengalaman bersantap terbaik...</p>
    </motion.div>
  )
}
