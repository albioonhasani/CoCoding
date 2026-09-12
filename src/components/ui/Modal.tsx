import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  const closeButton = useRef<HTMLButtonElement>(null)
  useEffect(() => { if (!open) return; closeButton.current?.focus(); const keydown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }; window.addEventListener('keydown', keydown); return () => window.removeEventListener('keydown', keydown) }, [open, onClose])
  if (!open) return null
  return <div className="fixed inset-0 z-50 grid place-items-center p-4" role="presentation"><button className="absolute inset-0 bg-slate-950/50" aria-label="Close dialog" onClick={onClose} /><section className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="flex items-start justify-between gap-4"><h2 id="modal-title" className="text-xl font-bold text-ink dark:text-white">{title}</h2><button ref={closeButton} type="button" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800" aria-label="Close dialog" onClick={onClose}><X aria-hidden="true" size={18} /></button></div><div className="mt-4 text-slate-600 dark:text-slate-300">{children}</div></section></div>
}
