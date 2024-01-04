import express from "express";
import * as userController from "../../controllers/usuarios.controller";

const usuariosRoutes = express.Router()

usuariosRoutes.get('/', [userController.getUsuarios])
usuariosRoutes.get('/:id', [userController.getUsuariosById])
usuariosRoutes.post('/', [userController.createUsuarios])
usuariosRoutes.post('/login', [userController.loginUsuario])
usuariosRoutes.put('/:id', [userController.updateUsuarios])
usuariosRoutes.delete('/:id', [userController.deleteUsuarios])

export { usuariosRoutes }

