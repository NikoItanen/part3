const express = require('express');
const app = express()
const {response} = require('express')
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI


app.use((error, request, response, next) => {
    console.log(error.message);

if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'Malformatted ID'})
} else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
} else if (error.name === 'NotFound') {
    return response.status(404).json({ error: error.message })
}

next(error)
});


mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error.message));



const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Person', personSchema)