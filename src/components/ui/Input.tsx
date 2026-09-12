import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input({ className = '', ...props }, ref) { return <input ref={ref} className={`w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-ink placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white ${className}`} {...props} /> })
