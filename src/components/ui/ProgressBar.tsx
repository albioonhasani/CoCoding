export function ProgressBar({ value, label }: { value: number; label: string }) {
  const safeValue = Math.min(100, Math.max(0, value))
  return <div><div className="mb-2 flex justify-between text-sm"><span className="font-medium text-slate-700 dark:text-slate-200">{label}</span><span className="text-slate-500 dark:text-slate-400">{safeValue}%</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800" role="progressbar" aria-label={label} aria-valuenow={safeValue} aria-valuemin={0} aria-valuemax={100}><div className="h-full rounded-full bg-brand-600 transition-[width] motion-reduce:transition-none" style={{ width: `${safeValue}%` }} /></div></div>
}
