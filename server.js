// Imort Express
const express = require('express');
const router = require('./router/userRouter')
const { logger } = require('./middleware/logger')

// Initialize Express
const app = express()

app.use(express.json())
app.use(logger)
app.use(router)

app.listen(9000, ()=>{
    console.log('Server is running on PORT: 9000')
})