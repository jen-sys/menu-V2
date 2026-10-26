import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useCart, selectTotals } from '../store/useCart'
import { useOrders } from '../store/useOrders'
import { rupiah } from '../lib/formatCurrency'
export default function Checkout() {
  const { lines, clear } = useCart(), create = useOrders((s) => s.create), nav = useNavigate()
  const t = selectTotals(lines)
  const [f, setF] = useState({ name: '', type: 'Takeaway' as 'Takeaway' | 'Delivery', phone: '', note: '' })
  const [err, setErr] = useState<{ name?: string; phone?: string }>({})
  if (lines.length === 0) return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center"><h1 className="text-3xl text-burgundy">Keranjangmu masih kosong</h1><Link to="/" className="rounded-full bg-burgundy px-6 py-3 text-gold-soft">Kembali ke menu</Link></div>)
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const er: typeof err = {}
    if (f.name.trim().length < 2) er.name = 'Nama pemesan wajib diisi.'
    if (f.phone && !/^(\+62|0)\d{8,13}$/.test(f.phone)) er.phone = 'Format nomor tidak valid, contoh 08123456789.'
    setErr(er); if (Object.keys(er).length) return
    const o = create({ ...f, name: f.name.trim(), lines, ...t })
    clear(); nav(`/pay/${o.id}`)
  }
  const field = 'mt-1 w-full rounded-xl border border-gold-soft bg-white px-4 py-3'
  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-burgundy"><ArrowLeft size={16} />Kembali ke menu</Link>
      <h1 className="mt-4 text-4xl text-burgundy">Checkout</h1>
      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_360px]">
        <form onSubmit={submit} className="space-y-5" noValidate>
          <label className="block text-sm font-medium">Nama pemesan
            <input className={field} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} aria-invalid={!!err.name} />{err.name && <span role="alert" className="text-xs text-red-700">{err.name}</span>}</label>
          <fieldset><legend className="text-sm font-medium">Tipe pesanan</legend>
            <div className="mt-1 grid grid-cols-2 gap-3">{(['Takeaway', 'Delivery'] as const).map((x) => (
              <label key={x} className={`cursor-pointer rounded-xl border px-4 py-3 text-center text-sm ${f.type === x ? 'border-burgundy bg-burgundy text-gold-soft' : 'border-gold-soft bg-white'}`}>
                <input type="radio" name="type" className="sr-only" checked={f.type === x} onChange={() => setF({ ...f, type: x })} />{x}</label>))}</div></fieldset>
          <label className="block text-sm font-medium">Nomor telepon (opsional)
            <input className={field} inputMode="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} aria-invalid={!!err.phone} />{err.phone && <span role="alert" className="text-xs text-red-700">{err.phone}</span>}</label>
          <label className="block text-sm font-medium">Catatan
            <textarea className={field} rows={3} value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} placeholder="Contoh: tanpa daun bawang" /></label>
          <button className="w-full rounded-full bg-burgundy py-3.5 font-semibold text-gold-soft hover:bg-burgundy-deep">Bayar dengan QRIS · {rupiah(t.total)}</button>
        </form>
        <aside className="h-fit rounded-2xl bg-white p-6 shadow-soft">
          <h2 className="text-2xl text-burgundy">Ringkasan</h2>
          <ul className="mt-4 space-y-3 text-sm">{lines.map((l) => (
            <li key={l.key} className="flex justify-between gap-3"><span>{l.qty}× {l.item.name}{l.spicy > 0 && <em className="block text-xs text-ink/55">Pedas {l.spicy}{l.toppings.length ? ', ' + l.toppings.map((x) => x.name).join(', ') : ''}</em>}</span><span>{rupiah(l.unit * l.qty)}</span></li>))}</ul>
          <div className="mt-4 space-y-1 border-t border-gold-soft pt-4 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{rupiah(t.subtotal)}</span></div>
            <div className="flex justify-between"><span>Pajak (11%)</span><span>{rupiah(t.tax)}</span></div>
            <div className="flex justify-between pt-1 text-lg font-semibold text-burgundy"><span>Total</span><span>{rupiah(t.total)}</span></div></div>
        </aside>
      </div>
    </div>
  )
}
