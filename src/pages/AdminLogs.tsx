import { useMemo, useState } from 'react'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import { Download, Trash2 } from 'lucide-react'
import AdminLayout from '../components/admin/AdminLayout'
import LogsTable from '../components/admin/LogsTable'
import ResetLogsModal from '../components/admin/ResetLogsModal'
import { useLogs } from '../store/useLogs'
const PER = 20
export default function AdminLogs() {
  const { logs, limit, reset, setLimit } = useLogs()
  const [q, setQ] = useState(''), [date, setDate] = useState(''), [st, setSt] = useState(''), [page, setPage] = useState(1), [modal, setModal] = useState(false)
  const rows = useMemo(() => logs.filter((l) => (!date || format(l.at, 'yyyy-MM-dd') === date) && (!st || l.status === st) &&
    (!q || `${l.name} ${l.number} ${l.items}`.toLowerCase().includes(q.toLowerCase()))), [logs, q, date, st])
  const pages = Math.max(1, Math.ceil(rows.length / PER)), cur = Math.min(page, pages)
  const csv = () => {
    const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`
    const body = [['Waktu', 'No', 'Customer', 'Item', 'Total', 'Metode', 'Status'], ...rows.map((l) => [format(l.at, 'yyyy-MM-dd HH:mm:ss'), l.number, l.name, l.items, l.total, l.method, l.status])].map((r) => r.map(esc).join(',')).join('\n')
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([body], { type: 'text/csv' })); a.download = `restoku-logs-${format(new Date(), 'yyyyMMdd')}.csv`; a.click()
  }
  const inp = 'rounded-lg border border-gold-soft bg-white px-3 py-2 text-sm'
  return (
    <AdminLayout>
      <div className="flex flex-wrap items-center justify-between gap-3"><h1 className="text-4xl text-burgundy">Logs</h1>
        <div className="flex gap-2"><button onClick={csv} className="flex items-center gap-2 rounded-full border border-gold px-4 py-2 text-sm"><Download size={14} />CSV</button>
          <button onClick={() => setModal(true)} className="flex items-center gap-2 rounded-full bg-red-700 px-4 py-2 text-sm font-semibold text-white"><Trash2 size={14} />Reset Semua Logs</button></div></div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <input aria-label="Cari" placeholder="Cari nama, no, item..." value={q} onChange={(e) => { setQ(e.target.value); setPage(1) }} className={inp} />
        <input aria-label="Tanggal" type="date" value={date} onChange={(e) => { setDate(e.target.value); setPage(1) }} className={inp} />
        <select aria-label="Status" value={st} onChange={(e) => { setSt(e.target.value); setPage(1) }} className={inp}><option value="">Semua status</option>{['unpaid', 'expired', 'menunggu', 'diproses', 'siap', 'selesai'].map((s) => <option key={s}>{s}</option>)}</select>
        <label className="ml-auto flex items-center gap-2 text-xs text-ink/60">Auto-reset di <input type="number" min={0} value={limit} onChange={(e) => setLimit(Math.max(0, Number(e.target.value)))} className={`${inp} w-24`} /> entri (0 = mati)</label></div>
      <div className="mt-5 rounded-2xl bg-white p-5 shadow-soft"><LogsTable rows={rows.slice((cur - 1) * PER, cur * PER)} />
        <div className="mt-4 flex items-center justify-between text-sm"><span className="text-ink/55">{rows.length} entri</span>
          <div className="flex items-center gap-3"><button disabled={cur <= 1} onClick={() => setPage(cur - 1)} className="rounded-full border border-gold px-4 py-1.5 disabled:opacity-40">Sebelumnya</button><span>{cur} / {pages}</span>
            <button disabled={cur >= pages} onClick={() => setPage(cur + 1)} className="rounded-full border border-gold px-4 py-1.5 disabled:opacity-40">Berikutnya</button></div></div></div>
      <ResetLogsModal open={modal} onClose={() => setModal(false)} onConfirm={() => { reset(); setModal(false); setPage(1); toast.success('Logs berhasil direset') }} />
    </AdminLayout>
  )
}
