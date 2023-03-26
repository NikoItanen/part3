const { response, request } = require('express');
const express = require('express');
const morgan = require('morgan');

const app = express()

app.use(morgan('tiny'))

app.use(express.json())

const info = () => {
  const date = new Date();
  const infoString = `<p>Phonebook has info for ${persons.length} people.</p>
    <p>${date.toString()}</p>`
  return infoString
}

let persons = [
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 2
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: 4
    }
  ]

  app.get('/api/persons', (request, response)=> {
    response.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }

  })

  app.get('/info', (request, response) => {
    response.send(info())
  })


  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body

    // Luodaan ID henkilölle.
    let id = Math.floor(Math.random() * 10000) + 1

    // Varmistetaan, että samanlaista tunnistetta ei ole olemassa.
    while (persons.find(person => person.id === id)) {
      id = Math.floor(Math.random() * 10000) + 1
    }

    

    if (!body.name || !body.number) {
      return response.status(400).json({
        error: 'name or number is missing'
      })
    }

    const person = {
      name: body.name,
      number: body.number,
      id: id
    }
    
    while (persons.find(person => person.name === body.name))
      return response.status(400).json({
        error: 'name must be unique'
      })


    persons = persons.concat(person)

    response.json(person)
  })


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})