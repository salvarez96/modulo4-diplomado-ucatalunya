import express from "express";
import { getClientes } from "../../controllers/clientes.controller";

const clientesRoutes = express.Router()

clientesRoutes.get('/', [getClientes])

export { clientesRoutes }

