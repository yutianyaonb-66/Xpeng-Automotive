import { Hono } from 'hono'
import { z } from 'zod'
import { createSiteSession, deleteSiteSession } from '@/lib/session'
import { Validator } from '@/server/api/validator'
import { responseError, responseSuccess } from '@/server/common/response'
import {
  getSiteLoginVerifyCodeCache,
  setSiteLoginVerifyCodeCache
} from '@/server/common/redis'
import prisma from '@/lib/prisma'
import UniSMS from 'unisms'
import { rateLimit } from '@/server/api/middlewares'

const sendVerifyCodeSchema = z.object({
  phone: z.string().regex(/^1[3-9]\d{9}$/, '手机号格式不正确')
})

const loginSchema = z.object({
  phone: z.string().regex(/^1[3-9]\d{9}$/, '手机号格式不正确'),
  verifyCode: z.string().regex(/^\d{4}$/, '验证码格式不正确')
})

const createVerifyCode = () => {
  return Math.floor(1000 + Math.random() * 9000).toString()
}

const app = new Hono()
  .basePath('/auth')
  // 发送验证码
  .post(
    '/sendVerifyCode',
    Validator('json', sendVerifyCodeSchema),
    async (c) => {
      const { phone } = c.req.valid('json')
      // 频繁调用校验
      const limitResult = await rateLimit({
        context: c,
        key: phone
      })
      if (!limitResult) {
        return c.json(responseError('发送验证码过于频繁'))
      }
      const verifyCode = createVerifyCode()
      const client = new UniSMS({
        accessKeyId: process.env.SMS_ACCESS_KEY_ID!
      })
      await client.send({
        to: phone,
        signature: process.env.SMS_SIGNATURE!,
        templateId: 'pub_verif_login',
        templateData: {
          code: verifyCode
        }
      })
      setSiteLoginVerifyCodeCache(phone, verifyCode)
      return c.json(responseSuccess(null, '验证码发送成功'))
    }
  )
  // 登录
  .post('/login', Validator('json', loginSchema), async (c) => {
    const { phone, verifyCode } = c.req.valid('json')
    // 判断验证码是否有效
    const cacheVerifyCode = await getSiteLoginVerifyCodeCache(phone)
    if (!cacheVerifyCode) {
      return c.json(responseError('验证码已失效'))
    }
    if (cacheVerifyCode !== verifyCode) {
      return c.json(responseError('验证码错误'))
    }
    // 判断是否注册，未注册需要进行注册
    let user = await prisma.users.findFirst({
      where: {
        phone
      }
    })
    if (!user) {
      // 未注册，进行注册
      user = await prisma.users.create({
        data: {
          phone
        }
      })
    }
    await createSiteSession(user.id + '', user.phone)
    // 返回用户信息
    return c.json(
      responseSuccess({
        userId: user.id,
        phone: user.phone
      })
    )
  })
  // 退出登录
  .post('/logout', async (c) => {
    await deleteSiteSession()
    return c.json(responseSuccess())
  })

export default app
