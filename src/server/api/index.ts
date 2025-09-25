import { handleError } from './error'
import { Hono } from 'hono'
import commonRoute from './routes/common'
import authRoute from './routes/auth'
import homeSlidersRoute from './routes/homeSliders'
import adminRoute from './routes/admin/index'
import navCarModelsRoute from './routes/navCarModels'
const app = new Hono().basePath('/api')

app.onError(handleError)

export const routes = app
  .route('/', commonRoute)
  .route('/', authRoute)
  .route('/', homeSlidersRoute)
  .route('/', adminRoute)
  .route('/', navCarModelsRoute)

export default app

export type AppType = typeof routes
