import { Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import type { MenuItem } from '../../data/menu'
import { hasOptions } from '../../data/menu'
import { rupiah } from '../../lib/formatCurrency'
import { flyToCart } from '../../lib/fly'
import { useCart } from '../../store/useCart'
const badgeCls = { 'Best Seller': 'bg-gold text-charcoal', Baru: 'bg-burgundy text-gold-soft', Pedas: 'bg-red-700 text-white' }
export default function MenuCard({ item, onOpen }: { item: MenuItem; onOpen: (i: MenuItem) => void }) {
  const add = useCart((s) => s.add)
  return (
    <motion.article layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="group overflow-hidden rounded-2xl bg-white shadow-soft">
      <button onClick={() => onOpen(item)} aria-label={`Lihat detail ${item.name}`} className="block w-full text-left">
        <div className="relative aspect-[4/3] overflow-hidden bg-gold-soft/50">
          <img src={item.image} alt={item.name} loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none' }} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          {item.badge && <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${badgeCls[item.badge]}`}>{item.badge}</span>}
        </div>
        <div className="px-5 pt-5"><h3 className="text-xl text-burgundy">{item.name}</h3><p className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm text-ink/65">{item.desc}</p></div>
      </button>
      <div className="flex items-center justify-between p-5 pt-4">
        <span className="font-semibold">{rupiah(item.price)}</span>
        <button disabled={!item.available} aria-label={`Tambah ${item.name} ke keranjang`}
          onClick={(e) => { if (hasOptions(item)) return onOpen(item); add(item); flyToCart(e.currentTarget); toast.success(`${item.name} ditambahkan`) }}
          className="flex items-center gap-1 rounded-full bg-burgundy px-4 py-2 text-sm font-medium text-gold-soft transition hover:bg-burgundy-deep active:scale-95 disabled:opacity-40"><Plus size={16} />{hasOptions(item) ? 'Pilih' : 'Tambah'}</button>
      </div>
    </motion.article>
  )
}
