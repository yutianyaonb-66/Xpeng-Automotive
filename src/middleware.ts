import { NextRequest, NextResponse } from 'next/server'
import {
  ADMIN_SESSION_COOKIE_NAME,
  decrypt,
  SITE_SESSION_COOKIE_NAME
} from './lib/session'
import { responseError } from './server/common/response'

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const isApi = /\/api+/.test(pathname)
  if (isApi) {
    return apiMiddleware(req)
  } else {
    return pageMiddleware(req)
  }
}

// 无须校验登录的页面
const publicPageRoutes = [
  // admin登录
  '/admin/login'
]

const pageMiddleware = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname
  const isAdmin = /\/admin+/.test(pathname)
  const redirectToLogin = () =>
    NextResponse.redirect(
      new URL(isAdmin ? '/admin/login' : '/login', req.nextUrl)
    )
  const next = () => NextResponse.next()
  // 非管理后台或者管理后台公共路径，则直接跳过
  if (!isAdmin || publicPageRoutes.includes(pathname)) return next()
  // 由于使用了server action，用cookie进行登录验证比较合适
  const cookieName = isAdmin
    ? ADMIN_SESSION_COOKIE_NAME
    : SITE_SESSION_COOKIE_NAME
  const adminCookie = req.cookies.get(cookieName)?.value
  if (!adminCookie) return redirectToLogin()
  const adminSession = await decrypt(adminCookie)
  if (!adminSession?.userId) return redirectToLogin()
  return next()
}

// 无须校验登录的api
const publicApiRoutes = [
  // admin登录
  '/api/admin/login',
  '/api/auth/sendVerifyCode',
  '/api/auth/login'
]

const apiMiddleware = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname
  const isAdmin = /\/admin+/.test(pathname)
  const redirectToLogin = () => NextResponse.json(responseError('请先登录'))
  const next = () => NextResponse.next()
  // 如果路径是公共路径，则直接跳过
  if (publicApiRoutes.includes(pathname)) return next()
  // 部分页面数据通过action server获取，在访问页面时已做权限校验
  // 其他的都是管理后台的接口，需要登录校验
  // 由于使用了server action，用cookie进行登录验证比较合适
  const cookieName = isAdmin
    ? ADMIN_SESSION_COOKIE_NAME
    : SITE_SESSION_COOKIE_NAME
  const adminCookie = req.cookies.get(cookieName)?.value
  if (!adminCookie) return redirectToLogin()
  const adminSession = await decrypt(adminCookie)
  if (!adminSession?.userId) return redirectToLogin()

  return next()
}

export const config = {
  matcher: ['/', '/((?!_next/static|_next/image|.*\\.png$|.*\\.ico$).*)']
}
