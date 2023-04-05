require('dotenv').config()
const { response, request } = require('express');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const http = require('http')
const path = require('path')
const mongoose = require('mongoose')
const Person = require('./models/person')
const buildPath = path.join(__dirname, '..', 'puhelinluettelo-fe', 'build');
const app = express();

app.use(morgan('tiny'))
app.use(express.json())
app.use(cors())
app.use(express.static(buildPath))

const info = () => {
  const date = new Date();
  const infoString = `<p>Phonebook has info for ${persons.length} people.</p>
    <p>${date.toString()}</p>`
  return infoString
}


  app.get('/api/persons', (request, response)=> {
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })

  app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
      .then(person => {
        if (person) {
          response.json(person)
        } else {
          const error = new Error('Person not found')
          error.name = 'NotFound'
          throw error
        }
      })
      .catch(error => next(error))
  })

  app.get('/info', (request, response) => {
    response.send(info())
  })


  app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
      Person.findByIdAndDelete(id).then(() => {
      response.status(204).end();
  })
  })

  app.post('/api/persons', async (request, response) => {
    const body = request.body

    if (body.name === undefined || body.number === undefined) {
      return response.status(400).json({error: 'Name or number is missing'})
    }

    const person = new Person({
      name: body.name,
      number: body.number
    });


    try {
      const savedPerson = await person.save();
      response.json(savedPerson);
    } catch (error) {
      next(error)
    }
});


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})