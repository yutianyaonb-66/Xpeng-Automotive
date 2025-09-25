import { Hono } from 'hono'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { Validator } from '@/server/api/validator'
import { responseSuccess, responseError } from '@/server/common/response'

export type ButtonItem = {
  text: string
  href: string
}

const paramSchema = z.object({
  id: z.string().min(1, 'id不能为空')
})

const bodySchema = z.object({
  img: z.string().min(1, '图片不能为空'),
  title: z.string().min(1, '标题不能为空'),
  subtitle: z.string().min(1, '副标题不能为空'),
  buttons: z.array(
    z.object({
      text: z.string().min(1, '按钮文本不能为空'),
      href: z.string().min(1, '按钮链接不能为空')
    })
  ),
  order: z.number(),
  status: z.number()
})

const app = new Hono()
  .basePath('/homeSliders')
  // 查找轮播图详情
  .get('/:id', Validator('param', paramSchema), async (c) => {
    const { id } = c.req.valid('param')
    const res = await prisma.homeSliders.findUnique({
      where: { id: +id },
      select: {
        id: true,
        img: true,
        title: true,
        subtitle: true,
        buttons: true,
        order: true,
        status: true
      }
    })
    if (res) {
      return c.json(
        responseSuccess({
          ...res,
          buttons: res?.buttons as null | ButtonItem[]
        })
      )
    } else {
      return c.json(responseError('数据不存在'))
    }
  })
  // 添加轮播图
  .put('/', Validator('json', bodySchema), async (c) => {
    const data = c.req.valid('json')
    await prisma.homeSliders.create({
      data
    })
    return c.json(responseSuccess(null, '添加成功'))
  })
  // 保存轮播图
  .post(
    '/:id',
    Validator('param', paramSchema),
    Validator('json', bodySchema),
    async (c) => {
      const { id } = c.req.valid('param')
      const data = c.req.valid('json')
      const res = await prisma.homeSliders.findUnique({
        where: { id: +id }
      })
      if (!res) {
        return c.json(responseError('数据不存在'))
      }
      await prisma.homeSliders.update({
        where: { id: +id },
        data
      })
      return c.json(responseSuccess(null, '更新成功'))
    }
  )
  .delete('/:id', Validator('param', paramSchema), async (c) => {
    const { id } = c.req.valid('param')
    await prisma.homeSliders.delete({ where: { id: +id } })
    return c.json(responseSuccess(null, '删除成功'))
  })

export default app
