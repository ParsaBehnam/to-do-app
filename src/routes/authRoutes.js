import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

router.post('/register', (req, res) => {
    const {username, password} = req.body
    // save the username and an irreversible encrypted password to the database
    
    //encrypt the password
    const hashedPassword = bcrypt.hashSync(password, 8)

    try {
        const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`)
        const result = insertUser.run(username, hashedPassword)

        // add the user's first todo 
        const defaultTodo = `Hello :) Add your first todo!`
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task)
             VALUES (?, ?)`)
             insertTodo.run(result.lastInsertRowid, defaultTodo)

        // create a token
        const token = jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET,
            {expiresIn: '24h'})

        res.json({token})
    }
        
      catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }

    
      })

router.post('/login', (req, res) => {
    // we get their email and we lookup the password associated with that
    // email in the database
    // we compare it with the entered password using the same encryption key
})



export default router