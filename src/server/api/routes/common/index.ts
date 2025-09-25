import {
  getCosCredentialCache,
  setCosCredentialCache
} from '@/server/common/redis'
import { responseError, responseSuccess } from '@/server/common/response'
import { Hono } from 'hono'
import sts from 'qcloud-cos-sts'

const app = new Hono()
  .basePath('/common')
  .get('/qcloudCredential', async (c) => {
    const scope = [
      {
        action: 'name/cos:PutObject',
        bucket: process.env.NEXT_PUBLIC_UPLOAD_BUCKET!,
        region: process.env.NEXT_PUBLIC_UPLOAD_REGION!,
        prefix: '*'
      }
    ]
    try {
      const credential = await getCosCredentialCache()
      if (credential) {
        return c.json(responseSuccess(JSON.parse(credential)))
      }
      const policy = sts.getPolicy(scope)
      const res = await sts.getCredential({
        secretId: process.env.COS_SECRET_ID!,
        secretKey: process.env.COS_SECRET_KEY!,
        policy: policy,
        durationSeconds: parseInt(process.env.COS_CREDENTIAL_DURATION!)
      })
      await setCosCredentialCache(JSON.stringify(res))
      return c.json(responseSuccess(res))
    } catch {
      return c.json(responseError('获取凭证失败'))
    }
  })

export default app
