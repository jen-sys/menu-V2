import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { rupiah } from '../../lib/formatCurrency'
import { useOrders, type Order } from '../../store/useOrders'
import { useAudioNotification } from '../../hooks/useAudioNotification'
export default function QrisPayment({ order }: { order: Order }) {
  const { setStatus, renew } = useOrders(), nav = useNavigate(), play = useAudioNotification()
  const [left, setLeft] = useState(() => Math.max(0, order.expiresAt - Date.now()))
  useEffect(() => {
    if (order.status !== 'unpaid') return
    const t = setInterval(() => {
      const l = Math.max(0, order.expiresAt - Date.now()); setLeft(l)
      if (l === 0) { setStatus(order.id, 'expired'); clearInterval(t) }
    }, 500)
    return () => clearInterval(t)
  }, [order.id, order.status, order.expiresAt, setStatus])
  const expired = order.status === 'expired'
  const mm = String(Math.floor(left / 60000)).padStart(2, '0'), ss = String(Math.floor(left / 1000) % 60).padStart(2, '0')
  const paid = () => { setStatus(order.id, 'menunggu'); play(); toast.success('Pembayaran diterima'); nav(`/order/${order.id}`) }
  return (
    <div className="mx-auto max-w-md rounded-3xl bg-white p-8 text-center shadow-soft">
      <h1 className="text-3xl text-burgundy">Pembayaran QRIS</h1>
      <p className="mt-1 text-sm text-ink/60">{order.number} · {order.name}</p>
      <div className={`relative mx-auto mt-6 w-fit rounded-2xl border border-gold p-4 ${expired ? 'opacity-30' : ''}`}>
        <QRCodeSVG value={`RESTOKU-QRIS|${order.number}|${order.total}`} size={208} fgColor="#1A1A1A" bgColor="#ffffff" />
      </div>
      <p className="mt-5 text-3xl font-semibold text-burgundy">{rupiah(order.total)}</p>
      {expired ? (<>
        <p role="alert" className="mt-3 text-red-700">Waktu pembayaran habis. Buat QR baru untuk melanjutkan.</p>
        <button onClick={() => renew(order.id)} className="mt-4 w-full rounded-full bg-burgundy py-3 font-semibold text-gold-soft">Buat QR baru</button>
      </>) : (<>
        <p className="mt-2 text-sm text-ink/60" aria-live="polite">Selesaikan dalam <span className="font-semibold text-burgundy">{mm}:{ss}</span></p>
        <button onClick={paid} className="mt-5 w-full rounded-full bg-burgundy py-3 font-semibold text-gold-soft hover:bg-burgundy-deep">Saya sudah bayar</button>
        <p className="mt-3 text-xs text-ink/45">Mode simulasi: tombol ini nanti diganti verifikasi pembayaran asli.</p>
      </>)}
    </div>
  )
}
