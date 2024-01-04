import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

const errorHandler = (errorData: any, errorMessage: string | any, options = {}) => {
  return {
    data: errorData,
    message: errorMessage,
    ...options
  }
}

const responseHandler = (resposeData: any, responseMessage: string = 'success', options = {}) => {
  return {
    data: resposeData,
    message: responseMessage,
    ...options
  }
}

async function getClientes(req: Request, res: Response) {
  try {
    const customers = await prisma.clientes.findMany()
    res.status(200).json(responseHandler(customers))
  } catch (error) { res.status(500).json(errorHandler(null, error)) }
}

async function getClientesById(req: Request, res: Response) {
  const id: number = parseInt(req.params.id)
  try {
    const customer = await prisma.clientes.findFirst({
    where: {
        id: id
      }
    })
    res.status(200).json(responseHandler(customer))
  } catch (error) { res.status(500).json(errorHandler(null, error)) }
}

async function createClientes(req: Request, res: Response) {
  const newCustomer = req.body
  try {
    const customer = await prisma.clientes.create({ data: newCustomer })
    res.status(200).json(responseHandler(customer))
  } catch (error) { res.status(500).json(errorHandler(null, error)) }
}

async function updateClientes(req: Request, res: Response) {
  const id: number = parseInt(req.params.id)
  const newCustomerData = req.body
  try {
    const customer = await prisma.clientes.update({
      where: {
        id: id
      },
      data: newCustomerData
    })
    res.status(200).json(responseHandler(customer))
  } catch (error) { res.status(500).json(errorHandler(null, error)) }
}

async function deleteClientes(req: Request, res: Response) {
  const id: number = parseInt(req.params.id)
  try {
    const customer = await prisma.clientes.delete({
      where: {
        id: id
      }
    })
    res.status(200).json(responseHandler(customer))
  } catch (error) { res.status(500).json(errorHandler(null, error)) }
}

export {
  getClientes,
  getClientesById,
  createClientes,
  updateClientes,
  deleteClientes
}