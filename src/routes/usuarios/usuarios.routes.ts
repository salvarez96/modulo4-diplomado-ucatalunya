import express from "express";
import * as userController from "../../controllers/usuarios.controller";
import { verify } from "../../middleware/verify";

const usuariosRoutes = express.Router()

usuariosRoutes.get('/', [verify, userController.getUsuarios])
usuariosRoutes.get('/:id', [verify, userController.getUsuariosById])
usuariosRoutes.post('/', [verify, userController.createUsuarios])
usuariosRoutes.post('/login', [verify, userController.loginUsuario])
usuariosRoutes.put('/:id', [verify, userController.updateUsuarios])
usuariosRoutes.put('/change-password', [verify, userController.changeUserPassword])
usuariosRoutes.delete('/:id', [verify, userController.deleteUsuarios])

export { usuariosRoutes }
