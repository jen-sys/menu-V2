import Modal from '../shared/Modal'
export default function ResetLogsModal({ open, onClose, onConfirm }: { open: boolean; onClose: () => void; onConfirm: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="Reset semua logs?">
      <p className="text-sm text-ink/70">Yakin ingin menghapus semua logs? Tindakan tidak bisa dibatalkan.</p>
      <div className="mt-5 flex justify-end gap-3">
        <button onClick={onClose} className="rounded-full border border-gold px-5 py-2 text-sm">Batal</button>
        <button onClick={onConfirm} className="rounded-full bg-red-700 px-5 py-2 text-sm font-semibold text-white">Ya, reset</button></div>
    </Modal>
  )
}
