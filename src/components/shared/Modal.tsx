import type { ReactNode } from 'react'
export default function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-charcoal/60 p-5" onClick={onClose}>
      <div role="alertdialog" aria-label={title} onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl bg-cream p-6 shadow-2xl">
        <h2 className="text-2xl text-burgundy">{title}</h2><div className="mt-3">{children}</div></div>
    </div>
  )
}
