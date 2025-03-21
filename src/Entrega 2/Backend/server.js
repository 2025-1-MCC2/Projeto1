import express from 'express'
import cors from 'cors'
import mysql2 from 'mysql2'
import dotenv from 'dotenv'
//import routes from './routes'
import db from './db.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
//app.use("/api", routes)

app.listen(port, () => {
    console.log(`Servidor Rodando em http://localhost:${port}`)
})