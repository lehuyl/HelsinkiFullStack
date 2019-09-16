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

    // console.log(Person.collection.countDocuments('Person'))
    Person.count({}, function(error, count){
        const msg = `Phone book has info for ${count} people`
        response.send(`${msg}<br><br>${date}`)
    })
})

app.get("/api/persons/:id", (request, response) => {
    //find id from mongodb and send it to json response
    Person.findById(request.params.id)
        .then(person => {
            response.json(person.toJSON())
        })
        .catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
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
})

app.put("/api/persons/:id", (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, {new: true})
        .then(updatedPerson => {
            response.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } 
    
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})