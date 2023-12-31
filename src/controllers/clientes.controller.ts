import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Helpers } from "./helpers";

const prisma = new PrismaClient()
const helpers = new Helpers()

// Métodos de read --------------------------------------------------------
async function getClientes(req: Request, res: Response) {
  try {
    const customers = await prisma.clientes.findMany()
    res.status(200).json(helpers.responseHandler(customers))
  } catch (error) { res.status(500).json(helpers.errorHandler(null, error)) }
}

async function getClientesById(req: Request, res: Response) {
  const id: number = parseInt(req.params.id)
  try {
    const customer = await prisma.clientes.findFirst({
      where: {
        id: id
      },
      include: {
        direccion: true
      }
    })
    res.status(200).json(helpers.responseHandler(customer))
  } catch (error) { res.status(500).json(helpers.errorHandler(null, error)) }
}

// Método create --------------------------------------------------------
async function createClientes(req: Request, res: Response) {
  const newCustomer = req.body
  try {
    const customer = await prisma.clientes.create({ data: newCustomer })
    res.status(200).json(helpers.responseHandler(customer))
  } catch (error) { res.status(500).json(helpers.errorHandler(null, error)) }
}

// Método update --------------------------------------------------------
async function updateClientes(req: Request, res: Response) {
  const id: number = parseInt(req.params.id)
  const newCustomerData = req.body
  try {
    const customer = await prisma.clientes.update({
      where: {
        id: id
      },
      data: newCustomerData,
      include: {
        direccion: true
      }
    })
    res.status(200).json(helpers.responseHandler(customer))
  } catch (error) { res.status(500).json(helpers.errorHandler(null, error)) }
}

// Método delete --------------------------------------------------------
async function deleteClientes(req: Request, res: Response) {
  const id: number = parseInt(req.params.id)
  try {
    const customer = await prisma.clientes.delete({
      where: {
        id: id
      }
    })
    res.status(200).json(helpers.responseHandler(customer))
  } catch (error) { res.status(500).json(helpers.errorHandler(null, error)) }
}

export {
  getClientes,
  getClientesById,
  createClientes,
  updateClientes,
  deleteClientes
}