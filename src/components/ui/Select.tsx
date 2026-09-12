import { forwardRef } from 'react'
import type { SelectHTMLAttributes } from 'react'
export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(function Select({ className = '', children, ...props }, ref) { return <select ref={ref} className={`w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-ink dark:border-slate-700 dark:bg-slate-900 dark:text-white ${className}`} {...props}>{children}</select> })
