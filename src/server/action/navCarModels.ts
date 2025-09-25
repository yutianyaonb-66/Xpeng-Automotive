'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/dist/server/web/spec-extension/revalidate'

export type ListNavCarModelItem = Awaited<
  ReturnType<typeof getNavCarModels>
>[number]

export async function getNavCarModels({ status }: { status?: number } = {}) {
  return await prisma.navCarModels.findMany({
    where: {
      ...(status !== undefined ? { status } : {})
    },
    orderBy: {
      order: 'asc'
    },
    select: {
      id: true,
      modelName: true,
      modelImg: true,
      order: true,
      status: true
    }
  })
}

export const refreshNavCarModelsPage = async () => {
  revalidatePath('/', 'layout')
  revalidatePath('/admin/nav-car-models', 'page')
}
