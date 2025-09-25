import { getAdminProfile } from '@/lib/dal'
import { ChevronUp, User2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar'
import { Logout } from './Logout'

export async function Footer() {
  const profile = await getAdminProfile()
  if (!profile) return null
  const menuTrigger = (
    <DropdownMenuTrigger asChild>
      <SidebarMenuButton>
        <User2 /> {profile.userName}
        <ChevronUp className="ml-auto" />
      </SidebarMenuButton>
    </DropdownMenuTrigger>
  )

  const menu = (
    <DropdownMenu>
      {menuTrigger}
      <DropdownMenuContent
        side="top"
        className="w-[--radix-popper-anchor-width]"
      >
        <Logout />
      </DropdownMenuContent>
    </DropdownMenu>
  )
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>{menu}</SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}
