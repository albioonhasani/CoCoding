import { useEffect, useState } from 'react'
import { readLocalStorage, writeLocalStorage } from '@/lib/storage'
export type Theme = 'light' | 'dark'
export function useTheme() { const [theme, setTheme] = useState<Theme>(() => readLocalStorage<Theme>('codepath-theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')); useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark'); writeLocalStorage('codepath-theme', theme) }, [theme]); return { theme, toggleTheme: () => setTheme((current) => current === 'dark' ? 'light' : 'dark') } }
