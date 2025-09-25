'use client'

import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { PageRoute, pageTitleMap } from '../AppSidebar/routes'


export default function AppBreadcrumb() {
  const pathname = usePathname()
  const paths = pathname.match(/\/[^/]+/g) || []
  const breadcrumbItems = paths.map((path, index) => {
    const href = paths.slice(0, index + 1).join('')
    if (index === paths.length - 1) {
      return (
        <BreadcrumbItem key={href}>
          <BreadcrumbPage>{pageTitleMap[href as PageRoute]}</BreadcrumbPage>
        </BreadcrumbItem>
      )
    } else {
      return (
        <BreadcrumbItem key={href}>
          <BreadcrumbLink href={href}>
            {pageTitleMap[href as PageRoute]}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )
    }
  })
  const breadcrumbItemsWithSeparator = breadcrumbItems.reduce<
    React.ReactNode[]
  >((acc, item, index) => {
    if (index === 0) return [item]
    return [...acc, <BreadcrumbSeparator key={`separator-${index}`} />, item]
  }, [])

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>{breadcrumbItemsWithSeparator}</BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
