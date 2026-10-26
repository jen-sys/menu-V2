import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { format } from 'date-fns'
import type { CartLine } from './useCart'
import { useLogs } from './useLogs'
export type OrderStatus = 'unpaid' | 'expired' | 'menunggu' | 'diproses' | 'siap' | 'selesai'
export const FLOW: OrderStatus[] = ['menunggu', 'diproses', 'siap', 'selesai']
export interface Order {
  id: string; number: string; name: string; type: 'Takeaway' | 'Delivery'; phone: string; note: string
  lines: CartLine[]; subtotal: number; tax: number; total: number
  status: OrderStatus; createdAt: number; expiresAt: number; paidAt?: number; method: 'QRIS'
}
interface S {
  orders: Order[]
  create: (o: Omit<Order, 'id' | 'number' | 'status' | 'createdAt' | 'expiresAt' | 'method'>) => Order
  setStatus: (id: string, s: OrderStatus) => void
  renew: (id: string) => void
}
export const useOrders = create<S>()(persist((set, get) => ({
  orders: [],
  create: (o) => {
    const now = Date.now(), day = format(now, 'yyyyMMdd')
    const seq = get().orders.filter((x) => x.number.includes(day)).length + 1
    const order: Order = { ...o, id: crypto.randomUUID(), number: `#RSK-${day}-${String(seq).padStart(3, '0')}`, status: 'unpaid', createdAt: now, expiresAt: now + 5 * 60_000, method: 'QRIS' }
    set((s) => ({ orders: [order, ...s.orders] }))
    useLogs.getState().add({ kind: 'order', number: order.number, name: order.name, method: order.method, status: 'unpaid', total: order.total,
      items: order.lines.map((l) => `${l.qty}× ${l.item.name}${l.spicy ? ` (pedas ${l.spicy})` : ''}${l.toppings.length ? ' +' + l.toppings.map((t) => t.name).join(',') : ''}`).join('; ') })
    return order
  },
  setStatus: (id, status) => { const o = get().orders.find((x) => x.id === id); if (o) useLogs.getState().update(o.number, status); set((s) => ({ orders: s.orders.map((o) => o.id === id ? { ...o, status, paidAt: status === 'menunggu' ? Date.now() : o.paidAt } : o) })) },
  renew: (id) => set((s) => ({ orders: s.orders.map((o) => o.id === id ? { ...o, status: 'unpaid', expiresAt: Date.now() + 5 * 60_000 } : o) }))
}), { name: 'restoku-orders' }))
