import { useEffect } from 'react'
import { useOrders } from '../store/useOrders'
// Polling ringan: sinkronkan state dari localStorage (admin di tab lain). Nanti diganti Supabase Realtime.
export function useOrderPolling(ms = 3000) {
  useEffect(() => {
    const t = setInterval(() => { void useOrders.persist.rehydrate() }, ms)
    return () => clearInterval(t)
  }, [ms])
}
