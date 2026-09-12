export function readLocalStorage<T>(key: string, fallback: T): T {
  try { const value = window.localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback } catch { return fallback }
}
export function writeLocalStorage<T>(key: string, value: T) { window.localStorage.setItem(key, JSON.stringify(value)) }
