import express from "express";
import { createUsuarios, deleteUsuarios, getUsuarios, getUsuariosById, updateUsuarios } from "../../controllers/usuarios.controller";

const usuariosRoutes = express.Router()

usuariosRoutes.get('/', [getUsuarios])
usuariosRoutes.get('/:id', [getUsuariosById])
usuariosRoutes.post('/', [createUsuarios])
usuariosRoutes.put('/:id', [updateUsuarios])
usuariosRoutes.delete('/:id', [deleteUsuarios])

export { usuariosRoutes }

