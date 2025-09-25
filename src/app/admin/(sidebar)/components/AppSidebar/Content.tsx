'use client'
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuSub
} from '@/components/ui/sidebar'
import { usePathname } from 'next/navigation'
import { routes } from './routes'
import type { Route } from './routes'

function MenuItem({ item }: { item: Route }) {
  const pathname = usePathname()
  const itemContent = item.url ? (
    <a href={item.url}>
      {item.icon && <item.icon />}
      <span>{item.title}</span>
    </a>
  ) : (
    <span>
      {item.icon && <item.icon />}
      <span>{item.title}</span>
    </span>
  )
  let children = null
  if (item.children && item.children.length) {
    children = (
      <SidebarMenuSub>
        <SidebarMenuSubItem>
          {item.children.map((child) => (
            <SidebarMenuSubButton
              asChild
              isActive={pathname === child.url}
              key={child.url}
            >
              <a href={child.url}>
                {child.icon && <child.icon />}
                <span>{child.title}</span>
              </a>
            </SidebarMenuSubButton>
          ))}
        </SidebarMenuSubItem>
      </SidebarMenuSub>
    )
  }
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild isActive={pathname === item.url}>
        {itemContent}
      </SidebarMenuButton>
      {children}
    </SidebarMenuItem>
  )
}

export function Content() {
  return (
    <SidebarMenu>
      {routes.map((item) => (
        <MenuItem key={item.title} item={item} />
      ))}
    </SidebarMenu>
  )
}
