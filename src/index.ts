import express from 'express'
import { PrismaClient } from "@prisma/client"
import { allRoutes } from './routes'

const prisma = new PrismaClient()

const app = express()
const port = 5000

app.use('/api', allRoutes)

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})