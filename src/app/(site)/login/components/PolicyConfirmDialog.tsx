import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'

function Link({ href, text }: { href: string; text: string }) {
  return (
    <a href={href} className="text-[#6da23a]" target="_blank">
      {text}
    </a>
  )
}

function Button({
  children,
  className,
  onClick
}: {
  children: string
  className?: string
  onClick: () => void
}) {
  return (
    <button
      className={cn('flex-1 py-[15Px] hover:bg-[#000000]/10', className)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default function PolicyConfirmDialog({
  open,
  onCancel,
  onConfirm
}: {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
}) {
  if (!open) return null
  return (
    <div className="absolute h-full w-full flex justify-center items-center bg-black/50">
      <div className="w-[420Px] pt-[20Px] bg-white">
        <div className="font-400 text-center" style={{ fontSize: '18Px' }}>
          用户隐私协议
        </div>
        <div className="p-[20Px]">
          {'登录及同意 '}
          <Link
            href="https://events.xiaopeng.com/nx9w4x.html?ch=00977&ps=event"
            text="《小鹏汽车网络平台用户协议》"
          />
          {' 与 '}
          <Link
            href="https://events.xiaopeng.com/22p4p4.html?ch=00977&ps=event"
            text="《小鹏汽车网络平台隐私政策》"
          />
        </div>
        <div className="flex justify-center">
          <Button onClick={onCancel}>取消</Button>
          <Button onClick={onConfirm} className="text-[#6da23a]">
            同意
          </Button>
        </div>
      </div>
    </div>
  )
}

export function usePolicyConfirmDialog() {
  const [open, setOpen] = useState(false)
  const confirmResolve = useRef<((value: boolean) => void) | null>(null)
  const confirm = () => {
    return new Promise((resolve) => {
      confirmResolve.current = resolve
      setOpen(true)
    })
  }
  const handleCancel = () => {
    setOpen(false)
    confirmResolve.current?.(false)
  }

  const handleConfirm = () => {
    setOpen(false)
    confirmResolve.current?.(true)
  }

  const context = (
    <PolicyConfirmDialog
      open={open}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    />
  )
  return { confirm, context }
}
