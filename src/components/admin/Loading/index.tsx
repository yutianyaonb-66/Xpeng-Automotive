import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Loading({
  className,
  size = 16,
  color = 'white'
}: {
  className?: string
  size?: number
  color?: string
}) {
  return (
    <div className={cn(className)}>
      <Loader2 className={cn('animate-spin')} size={size} style={{ color }} />
    </div>
  )
}
