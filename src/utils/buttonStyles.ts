type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'
const variants: Record<Variant, string> = { primary: 'bg-brand-600 text-white hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600', secondary: 'bg-ink text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200', ghost: 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800', outline: 'border border-slate-300 text-slate-700 hover:border-brand-400 hover:bg-brand-50 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800' }
const sizes: Record<Size, string> = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2.5 text-sm', lg: 'px-5 py-3 text-base' }
export function buttonStyles({ variant = 'primary', size = 'md', className = '' }: { variant?: Variant; size?: Size; className?: string } = {}) { return `inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}` }
export type { Size, Variant }
