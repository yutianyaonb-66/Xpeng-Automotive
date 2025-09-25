'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import Loading from '@/components/admin/Loading'
import { refreshHomeSliderPage } from '@/server/action/homeSliders'

function StatusButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" variant="outline" disabled={pending}>
      {pending && <Loading color="black" />}刷新
    </Button>
  )
}

export default function RefreshButton() {
  return (
    <form className="inline-block" action={refreshHomeSliderPage}>
      <StatusButton />
    </form>
  )
}
