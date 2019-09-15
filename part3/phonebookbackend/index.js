const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
morgan.token('person', function(request, response){
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    return JSON.stringify(person)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))
app.use(express.static('build'))

let persons = [
    {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
    },
    {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
    },
    {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
    },
    {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
    }
]
  
app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.get("/api/info", (request, response) => {
    const date = new Date()
    console.log('hi')
    const msg = `Phone book has info for ${persons.length} people`
    response.send(`${msg}<br><br>${date}`)
})

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    //if person exists, display them
    if(person){
        response.send(person)
    } else {
        response.status(404).send('Not found')
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const filteredPersons = persons.filter(person => person.id !== id)

    if(!(filteredPersons.length === persons.length)){
        response.status(204)
        response.send(filteredPersons)
    } else {
        response.status(404).send('Person not found')
    }
})

const generateId = () => {
    return Math.floor(Math.random()*100)
}

app.post("/api/persons", (request, response) => {
    const body = request.body

    if(!body.name || !body.number){
        response.status(400).json({
            error: 'Missing name or number'
        })
    }
    if(persons.find(person => person.name === body.name) !== undefined){
        response.status(400).json({
            error: 'Name must be unique'
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    persons.concat(person)

    // morgan(':method :url :status :res[content-length] - :response-time ms')
    response.json(person)    
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})