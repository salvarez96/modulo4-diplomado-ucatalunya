import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config'
import { NextFunction } from 'express'
import { Request, Response } from 'express'

export function verify(req: Request, res: Response, next: NextFunction) {
  const token: any = req.headers.token
  res.setHeader('Content-Type', 'application/json')

  if (!token) 
    return res.status(401).json({message: 'Token mandatory'})

  jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
    if (err)
      return res.status(401).json({message: 'Invalid token', error: err})
    return next()
  })
}
