import {
  ClientErrorStatusCode,
  ServerErrorStatusCode
} from 'hono/utils/http-status'

export const ClientCode = {
  Validate: 422
} as Record<string, ClientErrorStatusCode>

export const ServerCode = {
  Common: 500
} as Record<string, ServerErrorStatusCode>
