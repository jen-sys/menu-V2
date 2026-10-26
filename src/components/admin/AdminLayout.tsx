import { useEffect, useRef, useState, type ReactNode } from 'react'
import toast from 'react-hot-toast'
import Sidebar from './Sidebar'
import { useOrders } from '../../store/useOrders'
import { useLogs } from '../../store/useLogs'
import { playPaymentSound } from '../../hooks/useAudioNotification'
const PIN = (import.meta as unknown as { env: Record<string, string | undefined> }).env.VITE_ADMIN_PIN ?? '1234' // kosongkan (VITE_ADMIN_PIN=) untuk menonaktifkan PIN
const KEY = 'restoku-admin'
export default function AdminLayout({ children }: { children: ReactNode }) {
  const [ok, setOk] = useState(() => !PIN || sessionStorage.getItem(KEY) === '1')
  const [pin, setPin] = useState(''), [bad, setBad] = useState(false)
  const orders = useOrders((s) => s.orders)
  const seen = useRef(new Set(orders.filter((o) => o.status !== 'unpaid' && o.status !== 'expired').map((o) => o.id)))
  useEffect(() => { // polling lintas tab (nanti diganti Supabase Realtime)
    if (!ok) return
    const t = setInterval(() => { void useOrders.persist.rehydrate(); void useLogs.persist.rehydrate() }, 2000)
    return () => clearInterval(t)
  }, [ok])
  useEffect(() => { // audio + toast pesanan baru
    if (!ok) return
    orders.forEach((o) => {
      if (o.status === 'menunggu' && !seen.current.has(o.id)) { seen.current.add(o.id); playPaymentSound(); toast.success(`Pesanan baru ${o.number} dari ${o.name}`, { duration: 6000 }) }
    })
  }, [orders, ok])
  if (!ok) return (
    <div className="flex min-h-screen items-center justify-center bg-charcoal p-5">
      <form onSubmit={(e) => { e.preventDefault(); if (pin === PIN) { sessionStorage.setItem(KEY, '1'); setOk(true) } else setBad(true) }} className="w-full max-w-xs rounded-2xl bg-cream p-8 text-center">
        <h1 className="text-3xl text-burgundy">Admin Restoku</h1>
        <input type="password" inputMode="numeric" autoFocus aria-label="PIN" value={pin} onChange={(e) => { setPin(e.target.value); setBad(false) }} placeholder="PIN" className="mt-5 w-full rounded-xl border border-gold-soft bg-white px-4 py-3 text-center tracking-widest" />
        {bad && <p role="alert" className="mt-2 text-xs text-red-700">PIN salah.</p>}
        <button className="mt-4 w-full rounded-full bg-burgundy py-3 font-semibold text-gold-soft">Masuk</button></form></div>)
  return <div className="flex min-h-screen flex-col md:flex-row"><Sidebar onLogout={() => { sessionStorage.removeItem(KEY); setOk(false) }} /><main className="flex-1 overflow-x-hidden p-5 md:p-10">{children}</main></div>
}
