import { z } from 'zod'
import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import type { StatusCode } from 'hono/utils/http-status'
import { ClientCode, ServerCode } from '../common/code'
import * as Sentry from '@sentry/nextjs'

export class ApiError extends HTTPException {
  public readonly code?: StatusCode

  constructor({ code, message }: { code?: StatusCode; message: string }) {
    super(code, { message })
    this.code = code
  }
}

export function handleError(err: Error, c: Context): Response {
  if (err instanceof z.ZodError) {
    // zod校验错误
    const firstError = err.errors[0]
    return c.json(
      { code: ClientCode.Validate, message: `${firstError.message}` },
      ClientCode.Validate
    )
  }
  // 捕获除zod校验错误之外的api异常
  Sentry.captureException(err, {
    tags: {
      source: 'api error',
      routePath: c.req.routePath
    }
  })
  /**
   * This is a generic error, we should log it and return a 500
   */

  return c.json(
    {
      code: ServerCode.Common,
      message: '出了点问题, 请稍后再试。'
    },
    { status: ServerCode.Common }
  )
}
