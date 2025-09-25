export function responseSuccess<T>(
  data: T | null = null,
  message: string = '请求成功'
) {
  return {
    isSuccess: true,
    message,
    code: 0,
    data
  }
}

export function responseError<T>(
  message: string,
  code = -1,
  data: T | null = null
) {
  return {
    isSuccess: false,
    message,
    code,
    data
  }
}

export type CommonResponse = typeof responseSuccess | typeof responseError
