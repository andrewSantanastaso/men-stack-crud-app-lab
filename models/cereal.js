const mongoose = require('mongoose')

const cerealSchema = new mongoose.Schema({
    name: { type: String, required: true },
    flavor: { type: String, required: true },
    quickToSoggy: { type: Boolean, required: true }
})

const Cereal = mongoose.model('Cereal', cerealSchema)

module.exports = Cereal