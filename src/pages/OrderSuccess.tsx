import { Link, useParams } from 'react-router-dom'
import { PartyPopper } from 'lucide-react'
import { FLOW, useOrders } from '../store/useOrders'
import { useOrderPolling } from '../hooks/useOrderPolling'
import OrderStatus from '../components/customer/OrderStatus'
import { rupiah } from '../lib/formatCurrency'
export default function OrderSuccess() {
  useOrderPolling()
  const { id } = useParams(), { orders, setStatus } = useOrders(), order = orders.find((o) => o.id === id)
  if (!order) return <div className="flex min-h-screen items-center justify-center"><Link to="/" className="text-burgundy underline">Pesanan tidak ditemukan. Kembali ke menu</Link></div>
  const i = FLOW.indexOf(order.status)
  return (
    <div className="mx-auto max-w-lg px-5 py-12 text-center">
      <PartyPopper className="mx-auto text-gold" size={40} />
      <h1 className="mt-3 text-4xl text-burgundy">Terima kasih, {order.name}</h1>
      <p className="mt-2 text-ink/70">Nomor pesananmu</p>
      <p className="font-serif text-3xl text-burgundy">{order.number}</p>
      <div className="mt-10"><OrderStatus status={order.status} /></div>
      <div className="mt-10 rounded-2xl bg-white p-6 text-left text-sm shadow-soft">
        <ul className="space-y-2">{order.lines.map((l) => <li key={l.key} className="flex justify-between"><span>{l.qty}× {l.item.name}</span><span>{rupiah(l.unit * l.qty)}</span></li>)}</ul>
        <div className="mt-3 flex justify-between border-t border-gold-soft pt-3 font-semibold text-burgundy"><span>Total ({order.type})</span><span>{rupiah(order.total)}</span></div>
      </div>
      {i >= 0 && i < FLOW.length - 1 && <button onClick={() => setStatus(order.id, FLOW[i + 1])} className="mt-6 text-xs text-ink/50 underline">Demo: majukan status (nanti dikontrol admin)</button>}
      <div className="mt-8"><Link to="/" className="rounded-full bg-burgundy px-6 py-3 text-gold-soft">Pesan lagi</Link></div>
    </div>
  )
}
