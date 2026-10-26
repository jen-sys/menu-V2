import { useMemo, useState } from 'react'
import { Search, ShoppingBag } from 'lucide-react'
import { CATEGORIES, MENU, type Category, type MenuItem } from '../data/menu'
import MenuCard from '../components/customer/MenuCard'
import ItemModal from '../components/customer/ItemModal'
import CartDrawer from '../components/customer/CartDrawer'
import { useCart, selectTotals } from '../store/useCart'
export default function Home() {
  const [cat, setCat] = useState<Category | 'Semua'>('Semua')
  const [q, setQ] = useState('')
  const [sel, setSel] = useState<MenuItem | null>(null)
  const { lines, toggle } = useCart()
  const count = selectTotals(lines).count
  const items = useMemo(() => MENU.filter((m) => (cat === 'Semua' || m.category === cat) && m.name.toLowerCase().includes(q.toLowerCase())), [cat, q])
  return (
    <div>
      <header className="sticky top-0 z-30 border-b border-gold-soft bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2"><img src="/logo.svg" alt="" className="h-9 w-9" /><span className="font-serif text-2xl text-burgundy">Restoku</span></div>
          <button id="cart-btn" aria-label="Buka keranjang" onClick={() => toggle(true)} className="relative rounded-full bg-burgundy p-3 text-gold-soft">
            <ShoppingBag size={20} />{count > 0 && <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-xs font-bold text-charcoal">{count}</span>}
          </button>
        </div>
      </header>
      <section className="bg-gradient-to-br from-burgundy to-charcoal text-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <h1 className="text-4xl leading-tight md:text-6xl">Semangkuk mie, dihidangkan dengan hati.</h1>
            <p className="mt-5 max-w-md text-cream/75">Mie signature dan dimsum hangat, siap dinikmati di tempat atau dibawa pulang.</p>
            <a href="#menu" className="mt-8 inline-block rounded-full bg-gold px-7 py-3 font-semibold text-charcoal shadow-[0_0_24px_rgba(212,162,76,.4)]">Lihat menu</a>
          </div>
          <img src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=70" alt="Mie signature Restoku" onError={(e) => { e.currentTarget.style.display = 'none' }} className="aspect-[5/4] w-full rounded-[2rem] object-cover shadow-2xl ring-1 ring-gold/40" />
        </div>
      </section>
      <main id="menu" className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1" role="tablist">
            {(['Semua', ...CATEGORIES] as const).map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`whitespace-nowrap rounded-full border px-5 py-2 text-sm transition ${cat === c ? 'border-burgundy bg-burgundy text-gold-soft' : 'border-gold-soft bg-white hover:border-gold'}`}>{c}</button>))}
          </div>
          <label className="relative block md:w-72"><span className="sr-only">Cari menu</span><Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari menu..." className="w-full rounded-full border border-gold-soft bg-white py-2.5 pl-10 pr-4 text-sm" /></label>
        </div>
        {items.length === 0 ? <p className="py-20 text-center text-ink/60">Menu tidak ditemukan. Coba kata kunci atau kategori lain.</p> :
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map((m) => <MenuCard key={m.id} item={m} onOpen={setSel} />)}</div>}
      </main>
      <ItemModal item={sel} onClose={() => setSel(null)} />
      <CartDrawer />
    </div>
  )
}
