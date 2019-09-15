const mongoose = require('mongoose')

if( process.argv.length < 3){
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack:${password}@phonebookdata-2zyut.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
})

if(process.argv.length == 5){
    person.save().then(response => {
        console.log('person saved')
        mongoose.connection.close()
    })
}

if(process.argv.length == 3){
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}