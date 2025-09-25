'use server'
import { revalidatePath } from 'next/cache'

export const refreshAllPage = async () => {
  revalidatePath('/')
}
