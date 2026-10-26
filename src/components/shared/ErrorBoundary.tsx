import { Component, type ReactNode } from 'react'
export default class ErrorBoundary extends Component<{ children: ReactNode }, { err: boolean }> {
  state = { err: false }
  static getDerivedStateFromError() { return { err: true } }
  render() {
    return this.state.err ? (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center"><h1 className="text-3xl text-burgundy">Terjadi kesalahan</h1>
        <button onClick={() => location.assign('/')} className="rounded-full bg-burgundy px-6 py-3 text-gold-soft">Muat ulang</button></div>) : this.props.children
  }
}
