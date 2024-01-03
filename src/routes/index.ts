import express from 'express'
import { clientesRoutes } from './clientes/clientes.routes'

const router = express.Router()

router.use('/clientes', clientesRoutes)

export { router as allRoutes }