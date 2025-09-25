'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { refreshNavCarModelsPage } from '@/server/action/navCarModels'
import Loading from '@/components/admin/Loading'

function StatusButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" variant="outline" disabled={pending}>
      <div className="flex items-center gap-2">
        {pending && <Loading color="black" />}
        <span>刷新</span>
      </div>
    </Button>
  )
}

export default function RefreshButton() {
  // 服务端组件中不能监听button click事件，所以需要使用form提交
  return (
    <form className="inline-block" action={refreshNavCarModelsPage}>
      <StatusButton />
    </form>
  )
}
