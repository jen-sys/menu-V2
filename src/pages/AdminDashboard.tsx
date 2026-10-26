import { useMemo } from 'react'
import { format, isSameDay, subDays } from 'date-fns'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ClipboardList, Wallet, Hourglass, Trophy } from 'lucide-react'
import AdminLayout from '../components/admin/AdminLayout'
import StatsCard from '../components/admin/StatsCard'
import OrderTable from '../components/admin/OrderTable'
import { useOrders } from '../store/useOrders'
import { rupiah } from '../lib/formatCurrency'
export default function AdminDashboard() {
  const orders = useOrders((s) => s.orders)
  const d = useMemo(() => {
    const paid = orders.filter((o) => o.status !== 'unpaid' && o.status !== 'expired')
    const today = paid.filter((o) => isSameDay(o.paidAt ?? o.createdAt, new Date()))
    const qty: Record<string, number> = {}
    today.forEach((o) => o.lines.forEach((l) => { qty[l.item.name] = (qty[l.item.name] ?? 0) + l.qty }))
    const top = Object.entries(qty).sort((a, b) => b[1] - a[1])[0]
    const chart = Array.from({ length: 7 }, (_, i) => { const day = subDays(new Date(), 6 - i)
      return { hari: format(day, 'dd/MM'), revenue: paid.filter((o) => isSameDay(o.paidAt ?? o.createdAt, day)).reduce((a, o) => a + o.total, 0) } })
    return { count: today.length, revenue: today.reduce((a, o) => a + o.total, 0), pending: paid.filter((o) => o.status === 'menunggu' || o.status === 'diproses').length, top: top ? `${top[0]} (${top[1]})` : '-', chart }
  }, [orders])
  return (
    <AdminLayout>
      <h1 className="text-4xl text-burgundy">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Pesanan hari ini" value={String(d.count)} icon={<ClipboardList size={18} />} />
        <StatsCard label="Revenue hari ini" value={rupiah(d.revenue)} icon={<Wallet size={18} />} />
        <StatsCard label="Pesanan aktif" value={String(d.pending)} icon={<Hourglass size={18} />} />
        <StatsCard label="Menu terlaris" value={d.top} icon={<Trophy size={18} />} />
      </div>
      <section className="mt-6 rounded-2xl bg-white p-5 shadow-soft"><h2 className="text-2xl text-burgundy">Penjualan 7 hari</h2>
        <div className="mt-4 h-64"><ResponsiveContainer><BarChart data={d.chart}><CartesianGrid strokeDasharray="3 3" stroke="#E8D5B7" /><XAxis dataKey="hari" /><YAxis width={70} tickFormatter={(v: number) => `${v / 1000}k`} />
          <Tooltip formatter={(v: number) => rupiah(v)} /><Bar dataKey="revenue" fill="#6B1D2A" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div></section>
      <div className="mt-6"><OrderTable /></div>
    </AdminLayout>
  )
}
