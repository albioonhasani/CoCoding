import type { ReactNode } from 'react'
export function Badge({ children, tone = 'blue' }: { children: ReactNode; tone?: 'blue' | 'green' | 'amber' | 'slate' }) {
  const tones = { blue: 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-blue-200', green: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200', amber: 'bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-200', slate: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200' }
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold tracking-wide ${tones[tone]}`}>{children}</span>
}
