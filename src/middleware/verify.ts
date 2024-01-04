import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config'
import { NextFunction } from 'express'

export function verify(req: any, res: Response, next: NextFunction) {
  const token: any = req.headers.token

  if(token) {
    jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
      if (err) {
        return res.status(500).json({message: 'Invalid token', error: err})
      }
      req.decoded = decoded
      next()
    })
  }

  return res.status(403).json({message: 'You shall not pass >:v'})
}
