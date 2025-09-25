'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import dayjs from 'dayjs'

export type UserItem = {
  id: number
  phone: string
  createdAt: string
  updatedAt: string
}

export async function getUsers() {
  const users = await prisma.users.findMany({
    select: {
      id: true,
      phone: true,
      createdAt: true,
      updatedAt: true
    },
    orderBy: {
      id: 'asc'
    }
  })
  return users.map((user) => ({
    ...user,
    createdAt: dayjs(user.createdAt).format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: dayjs(user.updatedAt).format('YYYY-MM-DD HH:mm:ss')
  }))
}

export const refreshUsersPage = async () => {
  revalidatePath('/admin/users')
}
