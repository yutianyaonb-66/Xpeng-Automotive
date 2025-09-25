'use client'

import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'

interface ConfirmOptions {
  title?: string
  description?: React.ReactNode
  cancelText?: string
  confirmText?: string
}

let confirmShow: (options: ConfirmOptions) => Promise<boolean>

export function confirm(options: ConfirmOptions) {
  return confirmShow(options)
}

export const ConfirmProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [confirmConfig, setConfirmConfig] = useState<ConfirmOptions | null>(
    null
  )
  const [resolve, setResolve] = useState<((value: boolean) => void) | null>(
    null
  )

  confirmShow = (options: ConfirmOptions) => {
    return new Promise<boolean>((res) => {
      setConfirmConfig(options)
      setResolve(() => res)
    })
  }

  const handleConfirm = () => {
    resolve?.(true)
    setConfirmConfig(null)
  }

  const handleCancel = () => {
    resolve?.(false)
    setConfirmConfig(null)
  }

  return (
    <>
      {children}
      <AlertDialog open={!!confirmConfig} onOpenChange={() => handleCancel()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmConfig?.title || '确认'}
            </AlertDialogTitle>
            {confirmConfig?.description && (
              <AlertDialogDescription>
                {confirmConfig.description}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>
              {confirmConfig?.cancelText || '取消'}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              {confirmConfig?.confirmText || '确认'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
