import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { FLOW, type OrderStatus as S } from '../../store/useOrders'
const LABEL: Record<string, string> = { menunggu: 'Menunggu', diproses: 'Diproses', siap: 'Siap', selesai: 'Selesai' }
export default function OrderStatus({ status }: { status: S }) {
  const idx = FLOW.indexOf(status)
  return (
    <div>
      <div className="relative mx-auto h-1 max-w-sm rounded bg-gold-soft"><motion.div className="h-1 rounded bg-burgundy" animate={{ width: `${(Math.max(idx, 0) / (FLOW.length - 1)) * 100}%` }} transition={{ duration: 0.8 }} /></div>
      <ol className="mx-auto -mt-3 flex max-w-sm justify-between">{FLOW.map((s, i) => (
        <li key={s} className="flex w-16 flex-col items-center gap-2 text-xs" aria-current={i === idx ? 'step' : undefined}>
          <motion.span animate={{ scale: i === idx ? 1.2 : 1 }} className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${i <= idx ? 'border-burgundy bg-burgundy text-gold-soft' : 'border-gold-soft bg-cream'}`}>{i < idx || status === 'selesai' ? <Check size={12} /> : null}</motion.span>
          <span className={i <= idx ? 'font-semibold text-burgundy' : 'text-ink/50'}>{LABEL[s]}</span></li>))}</ol>
    </div>
  )
}
