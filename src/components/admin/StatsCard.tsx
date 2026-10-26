import type { ReactNode } from 'react'
export default function StatsCard({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return <div className="rounded-2xl bg-white p-5 shadow-soft"><div className="flex items-center justify-between text-ink/55"><span className="text-sm">{label}</span>{icon}</div><p className="mt-2 font-serif text-2xl text-burgundy">{value}</p></div>
}
