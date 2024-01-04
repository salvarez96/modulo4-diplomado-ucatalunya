import express from "express";
import { createClientes, deleteClientes, getClientes, getClientesById, updateClientes } from "../../controllers/clientes.controller";

const clientesRoutes = express.Router()

clientesRoutes.get('/', [getClientes])
clientesRoutes.get('/:id', [getClientesById])
clientesRoutes.post('/', [createClientes])
clientesRoutes.put('/:id', [updateClientes])
clientesRoutes.delete('/:id', [deleteClientes])

export { clientesRoutes }

