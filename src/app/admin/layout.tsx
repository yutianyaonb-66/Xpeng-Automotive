'use client'

import { Toaster } from '@/components/ui/toaster'
import NextTopLoader from 'nextjs-toploader'
import './app.scss'
import { ConfirmProvider } from '@/components/admin/Confirm'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ConfirmProvider>
      <NextTopLoader />
      <Toaster />
      {children}
    </ConfirmProvider>
  )
}
