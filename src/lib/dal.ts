import 'server-only'

import { cookies } from 'next/headers'
import {
  ADMIN_SESSION_COOKIE_NAME,
  decrypt,
  SITE_SESSION_COOKIE_NAME
} from '@/lib/session'
import { cache } from 'react'

export const getAdminProfile = cache(async () => {
  const cookie = cookies().get(ADMIN_SESSION_COOKIE_NAME)?.value
  if (cookie) {
    const session = await decrypt(cookie)
    return {
      userId: session?.userId as string,
      userName: session?.userName as string
    }
  }
  return null
})

export const getSiteProfile = cache(async () => {
  const cookie = cookies().get(SITE_SESSION_COOKIE_NAME)?.value
  if (cookie) {
    const session = await decrypt(cookie)
    return {
      userId: session?.userId as string,
      phone: session?.phone as string
    }
  }
  return null
})

export type SiteProfile = Awaited<ReturnType<typeof getSiteProfile>>
