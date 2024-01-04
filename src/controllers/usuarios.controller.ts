import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Helpers } from "./helpers";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
const helpers = new Helpers()
const hidePassword = {
  id: true,
  nombre: true,
  email: true,
  password: false
}

// Métodos de read --------------------------------------------------------
async function getUsuarios(req: Request, res: Response) {
  try {
    const customers = await prisma.usuarios.findMany({
      select: hidePassword
    })
    res.status(200).json(helpers.responseHandler(customers))
  } catch (error) { res.status(500).json(helpers.errorHandler(null, error)) }
}

async function getUsuariosById(req: Request, res: Response) {
  const id: number = parseInt(req.params.id)
  try {
    const customer = await prisma.usuarios.findFirst({
      where: {
        id: id,
      },
      select: hidePassword
    })
    res.status(200).json(helpers.responseHandler(customer))
  } catch (error) { res.status(500).json(helpers.errorHandler(null, error)) }
}

// Método create --------------------------------------------------------
async function createUsuarios(req: Request, res: Response) {
  const newCustomer = req.body
  const hashedPassword = bcrypt.hashSync(newCustomer.password, 10)
  newCustomer.password = hashedPassword
  try {
    const customer = await prisma.usuarios.create({ data: newCustomer })
    res.status(200).json(helpers.responseHandler(customer))
  } catch (error) { res.status(500).json(helpers.errorHandler(null, error)) }
}

// Método update --------------------------------------------------------
async function updateUsuarios(req: Request, res: Response) {
  const id: number = parseInt(req.params.id)
  const newCustomerData = req.body
  try {
    const customer = await prisma.usuarios.update({
      where: {
        id: id
      },
      data: newCustomerData,
      select: hidePassword
    })
    res.status(200).json(helpers.responseHandler(customer))
  } catch (error) { res.status(500).json(helpers.errorHandler(null, error)) }
}

// Método delete --------------------------------------------------------
async function deleteUsuarios(req: Request, res: Response) {
  const id: number = parseInt(req.params.id)
  try {
    const customer = await prisma.usuarios.delete({
      where: {
        id: id
      }
    })
    res.status(200).json(helpers.responseHandler(customer))
  } catch (error) { res.status(500).json(helpers.errorHandler(null, error)) }
}

export {
  getUsuarios,
  getUsuariosById,
  createUsuarios,
  updateUsuarios,
  deleteUsuarios
}