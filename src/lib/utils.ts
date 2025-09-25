import { toast } from '@/hooks/use-toast'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export { confirm } from '@/components/admin/Confirm/index'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function success(message: string, duration = 2000) {
  toast({ description: message, duration })
}

export function error(message: string, duration = 2000) {
  toast({ description: message, variant: 'destructive', duration })
}
