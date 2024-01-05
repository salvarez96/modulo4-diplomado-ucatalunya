import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Helpers } from "./helpers";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_KEY, TOKEN_LIFETIME } from "../config";

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
    return res.status(200).json(helpers.responseHandler(customers))
  } catch (error) { return res.status(500).json(helpers.errorHandler(null, error)) }
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
    return res.status(200).json(helpers.responseHandler(customer))
  } catch (error) { return res.status(500).json(helpers.errorHandler(null, error)) }
}

// Método create --------------------------------------------------------
async function createUsuarios(req: Request, res: Response) {
  const newCustomer = req.body
  const hashedPassword = bcrypt.hashSync(newCustomer.password, 10)
  newCustomer.password = hashedPassword
  try {
    const customer = await prisma.usuarios.create({ data: newCustomer })
    return res.status(200).json(helpers.responseHandler(customer))
  } catch (error) { return res.status(500).json(helpers.errorHandler(null, error)) }
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
    return res.status(200).json(helpers.responseHandler(customer))
  } catch (error) { return res.status(500).json(helpers.errorHandler(null, error)) }
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
    return res.status(200).json(helpers.responseHandler(customer))
  } catch (error) { return res.status(500).json(helpers.errorHandler(null, error)) }
}

async function loginUsuario(req: Request, res: Response) {
  const user = req.body
  try {
    const getUser = await prisma.usuarios.findFirst({
      where: {
        email: user.email
      }
    })
    if (getUser) {
      const verifyPassword = bcrypt.compareSync(user.password, getUser.password)
      if (!verifyPassword) {
        return res.status(401).json(helpers.errorHandler({status: 401}, 'Incorrect password'))
      }
        const payload = {
          id: getUser.id,
          email: getUser.email,
          nombres: getUser.nombre
        }
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_LIFETIME })
        return res.status(200).json(helpers.responseHandler(token, 'Login succesfull'))
    } 
    return res.status(401).json(helpers.errorHandler({status: 401}, 'User does not exist'))
  } catch (error) { return res.status(500).json(helpers.errorHandler(null, error)) }
}

async function changeUserPassword(req: Request, res: Response) {
  const user = req.body
  const newEncryptedPassword = bcrypt.hashSync(user.password, 10)
  user.password = newEncryptedPassword
  try {
    const getUser = await prisma.usuarios.update({
      where: {
        email: user.email
      },
      data: {
        password: newEncryptedPassword
      }
    })
    return res.status(200).json(helpers.responseHandler(getUser, 'Password updated succesfully'))
  } catch (error) { res.status(500).json(helpers.errorHandler(null, error)) }
}

export {
  getUsuarios,
  getUsuariosById,
  createUsuarios,
  updateUsuarios,
  deleteUsuarios,
  loginUsuario,
  changeUserPassword
}