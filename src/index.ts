import express from 'express'
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const app = express()
const port = 5000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})