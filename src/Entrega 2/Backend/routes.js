import express from 'express'
import db from './db.js'

const router = express.Router()

//CREATE (C)
router.post("/items", async(req, res) => {
    try{
        const {name, description} = req.body
        const [result] = await db.execute("INSERT INTO items(name, description) VALUES (?, ?)",
        [name, description]
        )
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})