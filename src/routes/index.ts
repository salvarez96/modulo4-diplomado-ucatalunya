import express from 'express'
import { clientesRoutes } from './clientes/clientes.routes'
import { usuariosRoutes } from './usuarios/usuarios.routes'

const router = express.Router()

router.use('/clientes', clientesRoutes)
router.use('/usuarios', usuariosRoutes)

export { router as allRoutes }