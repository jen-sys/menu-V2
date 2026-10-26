import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { MenuItem, Topping } from '../data/menu'
export interface CartLine { key: string; item: MenuItem; qty: number; spicy: number; toppings: Topping[]; unit: number }
interface CartState {
  lines: CartLine[]; open: boolean
  add: (item: MenuItem, qty?: number, spicy?: number, toppings?: Topping[]) => void
  setQty: (key: string, qty: number) => void
  clear: () => void
  toggle: (open?: boolean) => void
}
export const useCart = create<CartState>()(persist((set) => ({
  lines: [], open: false,
  add: (item, qty = 1, spicy = 0, toppings = []) => set((s) => {
    const key = [item.id, spicy, ...toppings.map((t) => t.id).sort()].join('|')
    const unit = item.price + toppings.reduce((a, t) => a + t.price, 0)
    const f = s.lines.find((l) => l.key === key)
    return { lines: f ? s.lines.map((l) => l.key === key ? { ...l, qty: l.qty + qty } : l) : [...s.lines, { key, item, qty, spicy, toppings, unit }] }
  }),
  setQty: (key, qty) => set((s) => ({ lines: qty <= 0 ? s.lines.filter((l) => l.key !== key) : s.lines.map((l) => l.key === key ? { ...l, qty } : l) })),
  clear: () => set({ lines: [] }),
  toggle: (open) => set((s) => ({ open: open ?? !s.open }))
}), { name: 'restoku-cart-v2', partialize: (s) => ({ lines: s.lines }) }))
export const TAX_RATE = 0.11
export const selectTotals = (lines: CartLine[]) => {
  const subtotal = lines.reduce((a, l) => a + l.unit * l.qty, 0)
  const tax = Math.round(subtotal * TAX_RATE)
  return { subtotal, tax, total: subtotal + tax, count: lines.reduce((a, l) => a + l.qty, 0) }
}
