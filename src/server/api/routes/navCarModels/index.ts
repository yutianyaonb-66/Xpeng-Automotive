import { Hono } from 'hono'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { Validator } from '@/server/api/validator'
import { responseSuccess, responseError } from '@/server/common/response'

const paramSchema = z.object({
  id: z.string().min(1, 'id不能为空')
})

const bodySchema = z.object({
  modelImg: z.string().min(1, '图片不能为空'),
  modelName: z.string().min(1, '车型名称不能为空'),
  order: z.number(),
  status: z.number()
})

const app = new Hono()
  .basePath('/navCarModels')
  // 查找车型详情
  .get('/:id', Validator('param', paramSchema), async (c) => {
    const { id } = c.req.valid('param')
    const res = await prisma.navCarModels.findUnique({
      where: { id: +id },
      select: {
        id: true,
        modelName: true,
        modelImg: true,
        order: true,
        status: true
      }
    })
    if (res) {
      return c.json(responseSuccess(res))
    } else {
      return c.json(responseError('数据不存在'))
    }
  })
  .put('/', Validator('json', bodySchema), async (c) => {
    const data = c.req.valid('json')
    await prisma.navCarModels.create({
      data
    })
    return c.json(responseSuccess(null, '添加成功'))
  })
  // 保存车型
  .post(
    '/:id',
    Validator('param', paramSchema),
    Validator('json', bodySchema),
    async (c) => {
      const { id } = c.req.valid('param')
      const data = c.req.valid('json')
      const res = await prisma.navCarModels.findUnique({
        where: { id: +id }
      })
      if (!res) {
        return c.json(responseError('数据不存在'))
      }
      await prisma.navCarModels.update({
        where: { id: +id },
        data
      })
      return c.json(responseSuccess(null, '更新成功'))
    }
  )
  // 删除车型
  .delete('/:id', Validator('param', paramSchema), async (c) => {
    const { id } = c.req.valid('param')
    await prisma.navCarModels.delete({ where: { id: +id } })
    return c.json(responseSuccess(null, '删除成功'))
  })

export default app
