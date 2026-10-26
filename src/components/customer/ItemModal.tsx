import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, X, Flame } from 'lucide-react'
import toast from 'react-hot-toast'
import { TOPPINGS, hasOptions, type MenuItem, type Topping } from '../../data/menu'
import { rupiah } from '../../lib/formatCurrency'
import { flyToCart } from '../../lib/fly'
import { useCart } from '../../store/useCart'
export default function ItemModal({ item, onClose }: { item: MenuItem | null; onClose: () => void }) {
  return <AnimatePresence>{item && <Body key={item.id} item={item} onClose={onClose} />}</AnimatePresence>
}
function Body({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const add = useCart((s) => s.add)
  const [qty, setQty] = useState(1), [spicy, setSpicy] = useState(0), [tops, setTops] = useState<Topping[]>([])
  const opt = hasOptions(item)
  const total = (item.price + tops.reduce((a, t) => a + t.price, 0)) * qty
  const toggle = (t: Topping) => setTops((p) => p.some((x) => x.id === t.id) ? p.filter((x) => x.id !== t.id) : [...p, t])
  return (
    <motion.div className="fixed inset-0 z-50 flex items-end justify-center bg-charcoal/60 p-0 sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div role="dialog" aria-label={item.name} onClick={(e) => e.stopPropagation()} className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-cream sm:rounded-3xl"
        initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}>
        <div className="relative aspect-[16/10] bg-gold-soft/50">
          <img src={item.image} alt={item.name} onError={(e) => { e.currentTarget.style.display = 'none' }} className="h-full w-full object-cover" />
          <button aria-label="Tutup" onClick={onClose} className="absolute right-4 top-4 rounded-full bg-cream/90 p-2"><X size={18} /></button>
        </div>
        <div className="space-y-6 p-6">
          <div><h2 className="text-3xl text-burgundy">{item.name}</h2><p className="mt-2 text-ink/70">{item.desc}</p></div>
          {opt && (<>
            <fieldset><legend className="mb-2 font-semibold">Level pedas</legend>
              <div className="flex gap-2">{[0, 1, 2, 3, 4, 5].map((l) => (
                <button key={l} aria-pressed={spicy === l} onClick={() => setSpicy(l)} className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm ${spicy === l ? 'border-burgundy bg-burgundy text-gold-soft' : 'border-gold-soft bg-white'}`}>{l === 0 ? '0' : <span className="flex items-center"><Flame size={12} />{l}</span>}</button>))}</div>
            </fieldset>
            <fieldset><legend className="mb-2 font-semibold">Topping tambahan</legend>
              <div className="space-y-2">{TOPPINGS.map((t) => (
                <label key={t.id} className="flex cursor-pointer items-center justify-between rounded-xl border border-gold-soft bg-white px-4 py-3 text-sm">
                  <span className="flex items-center gap-3"><input type="checkbox" className="accent-burgundy" checked={tops.some((x) => x.id === t.id)} onChange={() => toggle(t)} />{t.name}</span><span className="text-ink/60">+{rupiah(t.price)}</span></label>))}</div>
            </fieldset>
          </>)}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button aria-label="Kurangi jumlah" onClick={() => setQty(Math.max(1, qty - 1))} className="rounded-full border border-gold p-2"><Minus size={16} /></button>
              <span className="w-6 text-center font-semibold">{qty}</span>
              <button aria-label="Tambah jumlah" onClick={() => setQty(qty + 1)} className="rounded-full border border-gold p-2"><Plus size={16} /></button>
            </div>
            <button disabled={!item.available} onClick={(e) => { add(item, qty, spicy, tops); flyToCart(e.currentTarget); toast.success(`${item.name} ditambahkan`); onClose() }}
              className="rounded-full bg-burgundy px-6 py-3 font-semibold text-gold-soft hover:bg-burgundy-deep">Tambah · {rupiah(total)}</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
