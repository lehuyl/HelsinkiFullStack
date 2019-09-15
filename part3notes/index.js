require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const Note = require('./models/note')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))


const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)

// const password = process.argv[2]

// const url =
//     `mongodb+srv://fullstack:naruto123@notesdata-mjnph.mongodb.net/note-app?retryWrites=true&w=majority`  

// mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const noteSchema = mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

// const Note = mongoose.model('Note', noteSchema)

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
    }
]

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0

    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    const body = request.body

    if(body.content === undefined){
        return response.status(400).json({
            error: 'content missing'
        })
    }
    // const note = {
    //     content: body.content,
    //     important: body.important || false,
    //     date: new Date(),
    //     id: generateId(),
    // }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })
    
    // notes = notes.concat(note)

    // response.json(note)
    note.save().then(savedNote => {
        response.json(savedNote.toJSON())
    })
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()

    // Note.findById(request.params.id).then(note => {
    //     response.json(notes.filter(note => note.id !== id).toJSON())
    // })
})

app.get('/api/notes/:id', (request, response) => {
    // const id = Number(request.params.id)
    // const note = notes.find(note => {
    //     return note.id === id
    // })
    
    // if(note){
    //     response.json(note)
    // } else {
    //     response.status(404).end()
    // }
    Note.findById(request.params.id).then(note => {
        response.json(note.toJSON())
    })
})
  
// app.get('/', (req, res) => {
//     res.send('<h1>Hello World!</h1>')
//     console.log(hello)
// })

app.get('/api/notes', (req, res) => {
    // res.json(notes)
    // console.log(suh)
    Note.find({}).then(notes => {
        res.json(notes.map(note => note.toJSON()))
    })
})

// Note.find({}).then(result => {
//     result.forEach(note => {
//       console.log(note)
//     })
//     mongoose.connection.close()
// })

// noteSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//         returnedObject.id = returnedObject._id.toString()
//         delete returnedObject._id
//         delete returnedObject.__v
//     }
// })

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})