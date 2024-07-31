require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI
const PORT = 3000
const methodOverride = require('method-override')
const logger = require('morgan')
const Cereal = require('./models/cereal')

app.use(express.json())
app.use(logger('tiny'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
mongoose.connect(MONGO_URI)

mongoose.connection.once('open', () => {
    console.log('MongoDB is connected and running')
})
mongoose.connection.on('error', () => {
    console.log("MongoDB connection error")
})

//CREATE (New)

app.post('/cereals', async (req, res) => {
    req.body.quickToSoggy === 'on' || req.body.quickToSoggy === true ?
        req.body.quickToSoggy = true :
        req.body.quickToSoggy = false
    console.log(req.body)
    try {
        const createdCereal = await Cereal.create(req.body)
        res.redirect(`/cereals/${createdCereal._id}`)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})
app.get('/cereals/new', (req, res) => {
    res.render('new.ejs')
})

//READ (Index and Show)

app.get('/cereals', async (req, res) => {
    try {
        const foundCereals = await Cereal.find({})
        res.render('index.ejs', {
            cereals: foundCereals
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

app.get('/cereals/:id', async (req, res) => {
    try {
        const foundCereal = await Cereal.findById({ _id: req.params.id })
        res.render('show.ejs', {
            cereal: foundCereal
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})



//UPDATE (Edit)
app.put('/cereals/:id', async (req, res) => {
    try {
        const updatedCereal = await Cereal.findByIdAndUpdate({ _id: req.params.id }, req.body)
        res.redirect(`/cereals/`)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

app.get('/cereals/:id/edit', async (req, res) => {
    try {
        const foundUpdatedCereal = await Cereal.findById({ _id: req.params.id })
        res.render('edit.ejs', {
            cereal: foundUpdatedCereal
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

//Destroy (Delete)

app.delete("/cereals/:id", async (req, res) => {
    const foundCerealToDelete = await Cereal.findByIdAndDelete({ _id: req.params.id })
    res.redirect('/cereals')
})

app.listen(PORT, () => {
    console.log(`Express running on port:${PORT}`)
})