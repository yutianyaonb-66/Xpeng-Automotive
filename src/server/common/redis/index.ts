import Redis from 'ioredis'
import { COS_CREDENTIAL_KEY, SITE_LOGIN_VERIFY_CODE_KEY } from './keys'

const redis = new Redis(process.env.REDIS_URL!)

export default redis

/**
 * 获取 COS 凭证缓存
 * @returns 凭证
 */
export const getCosCredentialCache = async () => {
  const credential = await redis.get(COS_CREDENTIAL_KEY)
  return credential
}

/**
 * 设置 COS 凭证缓存
 * @param credential 凭证
 */
export const setCosCredentialCache = async (credential: string) => {
  // COS凭证缓存时间为 凭证有效期 - 5 分钟
  await redis.set(
    COS_CREDENTIAL_KEY,
    credential,
    'EX',
    parseInt(process.env.COS_CREDENTIAL_DURATION!) - 5 * 60
  )
  return
}

/**
 * 设置登录验证码缓存
 * @param phone 手机号
 * @param verifyCode 验证码
 */
export const setSiteLoginVerifyCodeCache = async (
  phone: string,
  verifyCode: string
) => {
  await redis.set(
    `${SITE_LOGIN_VERIFY_CODE_KEY}:${phone}`,
    verifyCode,
    'EX',
    parseInt(process.env.LOGIN_VERIFY_CODE_DURATION!)
  )
}

/**
 * 获取登录验证码缓存
 * @param phone 手机号
 * @returns 验证码
 */
export const getSiteLoginVerifyCodeCache = async (phone: string) => {
  const verifyCode = await redis.get(`${SITE_LOGIN_VERIFY_CODE_KEY}:${phone}`)
  return verifyCode
}
