const express = require('express')
const app = new express()
app.use(express.static('build'))

const port = 8000
console.log(`Starting server on port ${port}`)
app.listen(port)
