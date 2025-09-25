import { SidebarProvider } from '@/components/ui/sidebar'
import AppBreadcrumb from './components/AppBreadcrumb'
import { AppSidebar } from './components/AppSidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 h-[100vh] flex flex-col">
          <AppBreadcrumb />
          <div className="flex-1 overflow-y-auto">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  )
}
