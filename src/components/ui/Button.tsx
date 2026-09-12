import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { buttonStyles } from '@/utils/buttonStyles'
import type { Size, Variant } from '@/utils/buttonStyles'

export function Button({ variant, size, className, children, type = 'button', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size; children: ReactNode }) {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...props}>{children}</button>
}
