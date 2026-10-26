import { useState } from 'react'
import { format } from 'date-fns'
import { FLOW, useOrders, type OrderStatus } from '../../store/useOrders'
import { rupiah } from '../../lib/formatCurrency'
const tone: Record<string, string> = { unpaid: 'bg-amber-100 text-amber-800', expired: 'bg-red-100 text-red-800', menunggu: 'bg-amber-100 text-amber-800', diproses: 'bg-blue-100 text-blue-800', siap: 'bg-emerald-100 text-emerald-800', selesai: 'bg-gray-200 text-gray-700' }
export default function OrderTable() {
  const { orders, setStatus } = useOrders()
  const [f, setF] = useState<'semua' | OrderStatus>('semua')
  const rows = orders.filter((o) => f === 'semua' ? o.status !== 'unpaid' && o.status !== 'expired' : o.status === f)
  return (
    <section className="rounded-2xl bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between"><h2 className="text-2xl text-burgundy">Pesanan masuk</h2>
        <select aria-label="Filter status" value={f} onChange={(e) => setF(e.target.value as typeof f)} className="rounded-lg border border-gold-soft px-3 py-2 text-sm">
          <option value="semua">Semua</option>{FLOW.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
      <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm">
        <thead className="text-ink/55"><tr>{['No. Pesanan', 'Waktu', 'Nama', 'Item', 'Total', 'Status', 'Aksi'].map((h) => <th key={h} className="pb-3 pr-3 font-medium">{h}</th>)}</tr></thead>
        <tbody>{rows.length === 0 ? <tr><td colSpan={7} className="py-10 text-center text-ink/50">Belum ada pesanan.</td></tr> : rows.map((o) => (
          <tr key={o.id} className="border-t border-gold-soft/60 align-top">
            <td className="py-3 pr-3 font-medium">{o.number}</td><td className="pr-3">{format(o.paidAt ?? o.createdAt, 'HH:mm')}</td><td className="pr-3">{o.name}<em className="block text-xs text-ink/50">{o.type}</em></td>
            <td className="pr-3">{o.lines.map((l) => `${l.qty}× ${l.item.name}`).join(', ')}{o.note && <em className="block text-xs text-ink/50">“{o.note}”</em>}</td>
            <td className="pr-3">{rupiah(o.total)}</td><td className="pr-3"><span className={`rounded-full px-2.5 py-1 text-xs ${tone[o.status]}`}>{o.status}</span></td>
            <td><select aria-label={`Ubah status ${o.number}`} value={o.status} onChange={(e) => setStatus(o.id, e.target.value as OrderStatus)} className="rounded-lg border border-gold-soft px-2 py-1 text-xs">{FLOW.map((s) => <option key={s} value={s}>{s}</option>)}</select></td>
          </tr>))}</tbody></table></div>
    </section>
  )
}
