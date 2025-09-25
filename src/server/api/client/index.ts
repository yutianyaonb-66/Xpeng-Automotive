import { AppType } from '@/server/api'
import { hc } from 'hono/client'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL!

export const client = hc<AppType>(baseUrl)

export const api = client.api
