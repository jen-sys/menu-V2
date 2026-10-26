import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ScrollText, LogOut, Store } from 'lucide-react'
const link = ({ isActive }: { isActive: boolean }) => `flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm ${isActive ? 'bg-gold text-charcoal' : 'text-gold-soft/80 hover:bg-white/10'}`
export default function Sidebar({ onLogout }: { onLogout: () => void }) {
  return (
    <aside className="flex gap-2 bg-charcoal p-4 md:min-h-screen md:w-60 md:flex-col md:p-5">
      <div className="mb-0 flex items-center gap-2 pr-3 font-serif text-xl text-gold-soft md:mb-6"><img src="/logo.svg" alt="" className="h-8 w-8" />Admin</div>
      <NavLink to="/admin" end className={link}><LayoutDashboard size={16} />Dashboard</NavLink>
      <NavLink to="/admin/logs" className={link}><ScrollText size={16} />Logs</NavLink>
      <NavLink to="/" className={link}><Store size={16} />Toko</NavLink>
      <button onClick={onLogout} className="ml-auto flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-gold-soft/70 hover:bg-white/10 md:mt-auto md:ml-0"><LogOut size={16} />Keluar</button>
    </aside>
  )
}
