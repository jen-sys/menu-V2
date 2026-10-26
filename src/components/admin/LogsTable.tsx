import { format } from 'date-fns'
import type { LogEntry } from '../../store/useLogs'
import { rupiah } from '../../lib/formatCurrency'
export default function LogsTable({ rows }: { rows: LogEntry[] }) {
  return (
    <div className="overflow-x-auto"><table className="w-full min-w-[800px] text-left text-sm">
      <thead className="text-ink/55"><tr>{['Waktu', 'No.', 'Customer', 'Item', 'Total', 'Metode', 'Status'].map((h) => <th key={h} className="pb-3 pr-3 font-medium">{h}</th>)}</tr></thead>
      <tbody>{rows.length === 0 ? <tr><td colSpan={7} className="py-10 text-center text-ink/50">Tidak ada log.</td></tr> : rows.map((l) => (
        <tr key={l.id} className={`border-t border-gold-soft/60 align-top ${l.kind === 'meta' ? 'bg-gold-soft/30 italic' : ''}`}>
          <td className="py-3 pr-3 whitespace-nowrap">{format(l.at, 'dd/MM/yy HH:mm:ss')}</td><td className="pr-3">{l.number}</td><td className="pr-3">{l.name}</td><td className="pr-3">{l.items}</td>
          <td className="pr-3">{l.kind === 'meta' ? '-' : rupiah(l.total)}</td><td className="pr-3">{l.method}</td><td>{l.status}</td></tr>))}</tbody></table></div>
  )
}
