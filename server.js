require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI
const PORT = 3000
const logger = require('morgan')

app.use(express.json())
app.use(logger('tiny'))
mongoose.connect(MONGO_URI)

mongoose.connection.once('open', () => {
    console.log('MongoDB is connected and running')
})
mongoose.connection.on('error', () => {
    console.log("MongoDB connection error")
})


app.listen(PORT, () => {
    console.log(`Express running on port:${PORT}`)
})