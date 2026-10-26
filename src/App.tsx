import { useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Intro from './components/intro/Intro'
import Home from './pages/Home'
import Checkout from './pages/Checkout'
import Payment from './pages/Payment'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogs from './pages/AdminLogs'
import ErrorBoundary from './components/shared/ErrorBoundary'
import OrderSuccess from './pages/OrderSuccess'
const KEY = 'restoku-intro-seen'
export default function App() {
  const [showIntro, setShowIntro] = useState(() => sessionStorage.getItem(KEY) !== '1')
  const done = useCallback(() => { sessionStorage.setItem(KEY, '1'); setShowIntro(false) }, [])
  return (
    <ErrorBoundary>
      <AnimatePresence>{showIntro && !location.pathname.startsWith('/admin') && <Intro key="intro" onDone={done} />}</AnimatePresence>
      <Routes>
        <Route path="/" element={<Home />} /><Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<AdminDashboard />} /><Route path="/admin/logs" element={<AdminLogs />} />
        <Route path="/pay/:id" element={<Payment />} /><Route path="/order/:id" element={<OrderSuccess />} />
      </Routes>
      <Toaster position="top-center" toastOptions={{ style: { background: '#1A1A1A', color: '#E8D5B7' } }} />
    </ErrorBoundary>
  )
}
