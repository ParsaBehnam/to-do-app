const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.status(201).send('Hi')
})

app.listen(3030, () => console.log('Server has started on port: 3030'))