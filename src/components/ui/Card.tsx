import type { HTMLAttributes, ReactNode } from 'react'

export function Card({ className = '', children, ...props }: HTMLAttributes<HTMLElement> & { children: ReactNode }) {
  return <article className={`rounded-2xl border border-slate-200 bg-white shadow-card dark:border-slate-800 dark:bg-slate-900 ${className}`} {...props}>{children}</article>
}
