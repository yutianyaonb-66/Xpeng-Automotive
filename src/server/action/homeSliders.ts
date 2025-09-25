'use server'
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { ButtonItem } from '@/server/api/routes/homeSliders'

export type HomeSliderList = Awaited<ReturnType<typeof getHomeSliders>>

export type HomeSliderListItem = HomeSliderList[number]

// 适用于服务端组件，官网数据做成服务端组件，通过server action获取数据，可以通过SSG生成静态页面
export const getHomeSliders = async (status?: string) => {
  const res = await prisma.homeSliders.findMany({
    where: {
      // 支持多个where，向下添加行即可
      ...(status !== undefined && { status: +status })
    },
    orderBy: {
      id: 'asc'
    },
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
    return res.map((item) => ({
      ...item,
      buttons: item.buttons as null | ButtonItem[]
    }))
  } else {
    return []
  }
}

// 只能在from表单提交中使用
export const refreshHomeSliderPage = async () => {
  revalidatePath('/', 'layout')
  revalidatePath('/admin/home-sliders', 'page')
}
