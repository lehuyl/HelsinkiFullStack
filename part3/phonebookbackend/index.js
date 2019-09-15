require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

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

// let persons = [
//     {
//     "name": "Arto Hellas",
//     "number": "040-123456",
//     "id": 1
//     },
//     {
//     "name": "Ada Lovelace",
//     "number": "39-44-5323523",
//     "id": 2
//     },
//     {
//     "name": "Dan Abramov",
//     "number": "12-43-234345",
//     "id": 3
//     },
//     {
//     "name": "Mary Poppendieck",
//     "number": "39-23-6423122",
//     "id": 4
//     }
// ]
  
app.get("/api/persons", (request, response) => {
    // response.json(persons)
    Person.find({}).then(persons => {
        response.json(persons.map(person => person.toJSON()))
    })
})

app.get("/api/info", (request, response) => {
    const date = new Date()
    console.log('hi')
    const msg = `Phone book has info for ${persons.length} people`
    response.send(`${msg}<br><br>${date}`)
})

app.get("/api/persons/:id", (request, response) => {
    // const id = Number(request.params.id)
    // const person = persons.find(person => person.id === id)

    //if person exists, display them
    // if(person){
    //     response.send(person)
    // } else {
    //     response.status(404).send('Not found')
    // }

    //find id from mongodb and send it to json response
    Person.findById(request.params.id).then(person => {
        response.json(person.toJSON())
    })
})

app.delete("/api/persons/:id", (request, response) => {
    // const id = Number(request.params.id)
    // const filteredPersons = persons.filter(person => person.id !== id)

    // if(!(filteredPersons.length === persons.length)){
    //     response.status(204)
    //     response.send(filteredPersons)
    // } else {
    //     response.status(404).send('Person not found')
    // }

    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})


app.post("/api/persons", (request, response) => {
    const body = request.body

    if(!body.name || !body.number){
        response.status(400).json({
            error: 'Missing name or number'
        })
    } else {
        const person = new Person({
            name: body.name,
            number: body.number
        })

        person.save().then(savedPerson => {
            // morgan(':method :url :status :res[content-length] - :response-time ms')
            response.json(savedPerson.toJSON()).status(201)
        })
    }
    // if(persons.find(person => person.name === body.name) !== undefined){
    //     response.status(400).json({
    //         error: 'Name must be unique'
    //     })
    // }

    // const person = {
    //     name: body.name,
    //     number: body.number,
    // }
   
    // persons.concat(person)

    // morgan(':method :url :status :res[content-length] - :response-time ms')
    // response.json(person) 
    
    
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})