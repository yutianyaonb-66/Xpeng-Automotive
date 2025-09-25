'use client'
import { FolderX } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NotFound() {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="relative">
        <FolderX className="w-20 h-20 text-gray-500 animate-bounce" />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-400 rounded-full animate-pulse" />
      </div>
      <div className="text-2xl font-medium bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
        页面不存在
      </div>
      <Link
        href={isAdmin ? '/admin' : '/'}
        className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-full hover:from-gray-600 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        {isAdmin ? '返回管理后台首页' : '返回官网首页'}
      </Link>
    </div>
  )
}
