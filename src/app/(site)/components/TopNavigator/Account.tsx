'use client'

import { HiUserCircle } from 'react-icons/hi2'

import { useTopNavigatorContext } from './index'
import { api } from '@/server/api/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Loading from '@/components/admin/Loading'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'

export default function Account() {
  const router = useRouter()
  const { profile } = useTopNavigatorContext()
  const [loading, setLoading] = useState(false)

  if (!profile) {
    return (
      <a href="/login" className="hover:opacity-60">
        登录
      </a>
    )
  }
  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger>
        <div className="p-[10px]">
          <HiUserCircle className="text-[24px] hover:opacity-60 cursor-pointer" />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="flex flex-col items-center gap-[20px] w-[120px]">
        <div
          className="hover:opacity-60 cursor-pointer flex items-center gap-[10px]"
          onClick={async () => {
            try {
              setLoading(true)
              await api.auth.logout.$post({})
              router.replace('/login')
            } catch (error) {
              console.error(error)
              setLoading(false)
            }
          }}
        >
          {loading && <Loading color="black" />}
          <div>退出登录</div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
