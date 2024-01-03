import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

async function getClientes(req: Request, res: Response) {
  res.status(200).json({data: null, message: 'Respondiendo desde getClientes'})
}

export { getClientes }