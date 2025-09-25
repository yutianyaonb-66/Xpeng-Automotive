import { Home } from 'lucide-react'
import { User } from 'lucide-react'

export const pageTitleMap = {
  '/admin': '首页',
  '/admin/nav-car-models': '导航栏车型',
  '/admin/home-sliders': '首页轮播图',
  '/admin/users': '用户管理'
}

export type PageRoute = keyof typeof pageTitleMap

const createPageRoute = (url: PageRoute) => ({
  url,
  title: pageTitleMap[url]
})

export const routes: Route[] = [
  {
    title: '首页配置',
    icon: Home,
    children: [
      createPageRoute('/admin/nav-car-models'),
      createPageRoute('/admin/home-sliders')
    ]
  },
  {
    title: '用户管理',
    icon: User,
    url: '/admin/users',
    children: []
  }
]

export type Route = {
  title: string
  url?: string
  icon?: typeof Home
  children?: Route[]
}
