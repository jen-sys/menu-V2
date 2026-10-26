import { create } from 'zustand'
import { persist } from 'zustand/middleware'
export interface LogEntry { id: string; at: number; kind: 'order' | 'meta'; number: string; name: string; items: string; total: number; method: string; status: string }
interface S {
  logs: LogEntry[]; limit: number // limit 0 = auto-reset nonaktif
  add: (e: Omit<LogEntry, 'id' | 'at'>) => void
  update: (number: string, status: string) => void
  reset: () => void
  setLimit: (n: number) => void
}
const meta = (items: string): LogEntry => ({ id: crypto.randomUUID(), at: Date.now(), kind: 'meta', number: '-', name: 'Sistem', items, total: 0, method: '-', status: 'reset' })
export const useLogs = create<S>()(persist((set) => ({
  logs: [], limit: 1000,
  add: (e) => set((s) => {
    const entry: LogEntry = { ...e, id: crypto.randomUUID(), at: Date.now() }
    if (s.limit > 0 && s.logs.length >= s.limit) return { logs: [entry, meta(`Auto-reset: logs melebihi ${s.limit} entri`)] }
    return { logs: [entry, ...s.logs] }
  }),
  update: (number, status) => set((s) => ({ logs: s.logs.map((l) => l.number === number ? { ...l, status } : l) })),
  reset: () => set({ logs: [meta('Semua logs direset oleh admin')] }),
  setLimit: (limit) => set({ limit })
}), { name: 'restoku-logs' }))
