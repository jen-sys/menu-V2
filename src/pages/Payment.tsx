import { Link, Navigate, useParams } from 'react-router-dom'
import { useOrders } from '../store/useOrders'
import QrisPayment from '../components/customer/QrisPayment'
export default function Payment() {
  const { id } = useParams(), order = useOrders((s) => s.orders.find((o) => o.id === id))
  if (!order) return <div className="flex min-h-screen flex-col items-center justify-center gap-4"><p>Pesanan tidak ditemukan.</p><Link to="/" className="text-burgundy underline">Kembali ke menu</Link></div>
  if (order.status !== 'unpaid' && order.status !== 'expired') return <Navigate to={`/order/${order.id}`} replace />
  return <div className="px-5 py-12"><QrisPayment order={order} /></div>
}
