import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel
} from '@/components/ui/sidebar'

import { Content } from './Content'
import { Footer } from './Footer'
import Link from 'next/link'

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Link href="/admin">管理后台</Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Content />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Footer />
    </Sidebar>
  )
}
