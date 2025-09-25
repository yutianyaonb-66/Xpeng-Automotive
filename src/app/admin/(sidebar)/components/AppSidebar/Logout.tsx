'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { api } from '@/server/api/client'
import { useRouter } from 'next/navigation'

export function Logout() {
  const router = useRouter()
  const handleLogout = async () => {
    const { code } = await (await api.admin.logout.$post()).json()
    if (code === 0) {
      router.replace('/admin/login')
    }
  }
  return (
    <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
      <span>退出登录</span>
    </DropdownMenuItem>
  )
}
