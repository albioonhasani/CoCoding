import { AlertCircle } from 'lucide-react'
import type { ReactNode } from 'react'
export function ErrorState({ title = 'Something went wrong', message, action }: { title?: string; message: string; action?: ReactNode }) { return <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-950 dark:border-red-900 dark:bg-red-950 dark:text-red-100"><AlertCircle aria-hidden="true" /><h2 className="mt-3 font-bold">{title}</h2><p className="mt-1">{message}</p>{action && <div className="mt-4">{action}</div>}</div> }
