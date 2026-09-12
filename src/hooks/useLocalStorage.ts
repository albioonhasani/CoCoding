import { useState } from 'react'
import { readLocalStorage, writeLocalStorage } from '@/lib/storage'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => readLocalStorage(key, initialValue))
  const updateValue = (next: T) => { setValue(next); writeLocalStorage(key, next) }
  return [value, updateValue] as const
}
