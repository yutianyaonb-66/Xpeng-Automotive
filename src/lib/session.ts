import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

export const SITE_SESSION_COOKIE_NAME = 'site_session'
export const ADMIN_SESSION_COOKIE_NAME = 'admin_session'

export interface SiteSessionPayload {
  userId: string
  phone: string
  expiresAt: Date
}

export interface AdminSessionPayload {
  userId: string
  userName: string
  expiresAt: Date
}

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(
  payload: AdminSessionPayload | SiteSessionPayload,
  expirationTime = '7d'
) {
  return new SignJWT(payload as unknown as Record<string, string>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256']
    })
    return payload
  } catch (error) {
    throw new Error('Failed to verify session:', { cause: error })
  }
}

/** 管理后台session */
export async function createAdminSession(userId: string, userName: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, userName, expiresAt })

  cookies().set(ADMIN_SESSION_COOKIE_NAME, session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/'
  })
}
export function deleteAdminSession() {
  cookies().delete(ADMIN_SESSION_COOKIE_NAME)
}
/*******/

/** 官网session */
export async function createSiteSession(userId: string, phone: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, phone, expiresAt })
  cookies().set(SITE_SESSION_COOKIE_NAME, session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/'
  })
}
export function deleteSiteSession() {
  cookies().delete(SITE_SESSION_COOKIE_NAME)
}
/*******/
