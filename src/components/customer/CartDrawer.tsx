import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Minus, Plus, X, ShoppingBag } from 'lucide-react'
import { useCart, selectTotals } from '../../store/useCart'
import { rupiah } from '../../lib/formatCurrency'
export default function CartDrawer() {
  const { lines, open, toggle, setQty } = useCart()
  const nav = useNavigate()
  const t = selectTotals(lines)
  return (
    <AnimatePresence>
      {open && (<>
        <motion.div key="bg" className="fixed inset-0 z-40 bg-charcoal/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => toggle(false)} />
        <motion.aside key="panel" role="dialog" aria-label="Keranjang" className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
          initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}>
          <header className="flex items-center justify-between border-b border-gold-soft px-6 py-5">
            <h2 className="text-2xl text-burgundy">Keranjang</h2>
            <button aria-label="Tutup keranjang" onClick={() => toggle(false)}><X /></button>
          </header>
          {lines.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center text-ink/60"><ShoppingBag size={40} /><p>Keranjang masih kosong. Pilih menu favoritmu.</p></div>
          ) : (<>
            <ul className="flex-1 space-y-4 overflow-y-auto p-6">
              {lines.map((l) => (
                <li key={l.key} className="flex items-center gap-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gold-soft/50"><img src={l.item.image} alt="" onError={(e) => { e.currentTarget.style.display = 'none' }} className="h-full w-full object-cover" /></div>
                  <div className="flex-1"><p className="font-medium">{l.item.name}</p>
                    {(l.spicy > 0 || l.toppings.length > 0) && <p className="text-xs text-ink/55">{[l.spicy > 0 && `Pedas ${l.spicy}`, ...l.toppings.map((x) => x.name)].filter(Boolean).join(', ')}</p>}
                    <p className="text-sm text-ink/60">{rupiah(l.unit)}</p></div>
                  <div className="flex items-center gap-2">
                    <button aria-label="Kurangi" onClick={() => setQty(l.key, l.qty - 1)} className="rounded-full border border-gold p-1"><Minus size={14} /></button>
                    <span className="w-5 text-center text-sm">{l.qty}</span>
                    <button aria-label="Tambah" onClick={() => setQty(l.key, l.qty + 1)} className="rounded-full border border-gold p-1"><Plus size={14} /></button>
                  </div>
                </li>))}
            </ul>
            <footer className="space-y-2 border-t border-gold-soft p-6 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{rupiah(t.subtotal)}</span></div>
              <div className="flex justify-between"><span>Pajak (11%)</span><span>{rupiah(t.tax)}</span></div>
              <div className="flex justify-between text-lg font-semibold text-burgundy"><span>Total</span><span>{rupiah(t.total)}</span></div>
              <button onClick={() => { toggle(false); nav('/checkout') }} className="mt-3 w-full rounded-full bg-burgundy py-3 font-semibold text-gold-soft hover:bg-burgundy-deep">Checkout</button>
            </footer>
          </>)}
        </motion.aside>
      </>)}
    </AnimatePresence>
  )
}
