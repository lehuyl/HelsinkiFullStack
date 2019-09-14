import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const isDuplicate = (persons, newName) => {
  const map = new Map();
  for(var i = 0; i < persons.length; i++){ 
    map.set(persons[i].name, 1)
  }
  if(map.has(newName)){
    return true
  } else {
    return false
  }
}

function filterArrays(arr,searchValue){
  const showFilter = (!isFiltered(searchValue))
  ? arr
  : arr.filter(person => person.name.toLowerCase().includes(searchValue.toLowerCase()))
 
  return showFilter
}

//full list of persons
const Persons = (props) => {
  var showFilter = filterArrays(props.persons, props.search)
  // if(!isFiltered(props.search)){
    return showFilter.map(person => <p key={person.name}>{person.name} {person.number}</p>)
  // } else {
    // return showFilter.map(person => <p key={person.name}>{person.name} {person.number}</p>)
  // }
}

//modularized single person
const Person = ({person, deleteButton}) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={deleteButton}>delete</button>
    </div>
  )
}

const Filter = (props) => {
  return (
    <form >
        <div>
          filter shown with <input value={props.search} onChange={props.onChange}/>
        </div>
      </form>
  )
}

function isFiltered(a) {
  if(a === ''){
    return false
  } else {
    return true
  }
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.valueName} onChange={props.onChangeName}/>
      </div>
      <div>
        number: <input value={props.valueNumber} onChange={props.onChangeNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setNewSearch ] = useState('')
  // const [error, setError] = useState("error")
  const [errorMessage, setErrorMessage] = useState("Error...")

  useEffect(() => {
    console.log('effect')
    // axios
    //   .get('http://localhost:3001/persons')
    //   .then(response => {
    //     console.log('promise fulfilled')
    //     setError(null)
    //     setPersons(response.data)
    //   })
    personService
      .getAll()
      .then(response => {
        // setError(null)
        setErrorMessage(null)
        setPersons(response.data)
      })
      .catch(error => {
        // setError(error.response.data.message)
        setErrorMessage(`can't get list of persons`)
        setPersons([])
      })
  }, [])
  console.log('render', persons.length, 'persons')
  
  const findPersonID = (persons, newName) => {
    return persons.find(person => person.name === newName).id
  }

  const addNameNumber = (event) => {
      event.preventDefault()
      const personAdd = {
        name: newName,
        number: newNumber
      }      

      if(isDuplicate(persons, newName)){
        // alert(`${newName} is already added to phonebook`)
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          const id = findPersonID(persons, newName)
          personService
            .updateNumber(id, personAdd)
            .then(updatedPerson => {
              // setError(null)
              setErrorMessage(null)
              const id = findPersonID(persons, newName)
              setPersons(persons.map(person => person.id !== id ? person : updatedPerson.data))
              setNewName('')
              setNewNumber('')
            })
            .catch(error => {
              // setError(error.response.data.message)
              setErrorMessage(
                `Information of ${newName} has already been removed from server`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
              setPersons(persons)
              setNewName('')
              setNewNumber('')
            })
        }
      } else {
        // axios
        //   .post('http://localhost:3001/persons', personAdd)
        //   .then(response => {
        //     setError(null)
        //     setPersons(persons.concat(personAdd))
        //     setNewName('')
        //     setNewNumber('')
        //   })
        //   .catch(error => {
        //     setError(error.response.data.message)
        //     //if cannot add object set persons doesnt change
        //     setPersons(persons)
        //     setNewName('')
        //     setNewNumber('')
        //   })

        personService
          .create(personAdd)
          .then(response => {
            // setError(null)
            setErrorMessage(null)
            setPersons(persons.concat(response.data))
            setNewName('')
            setNewNumber('')
            setErrorMessage(
              `Added ${personAdd.name}`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          .catch(error => {
            // setError(error.response.data.message)
            setErrorMessage('Error adding person')
            //if cannot add object set persons doesnt change
            setPersons(persons)
            setNewName('')
            setNewNumber('')
          })
      }
  }

  const deleteButton = (id, name) => {
    
    if(window.confirm(`Delete ${name} ?`)){
      personService
      .deletePerson(id)
      .then(response => {
        // setError(null)
        setErrorMessage(null)
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        // setError(error.response.data.message)
        setErrorMessage('Unable to delete person')
        setPersons(persons.filter(person => person.id !== id))
      })
    }
    
  }  

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    //take whats in the input box and set state search to it
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter value={search} onChange={handleSearchChange} />
      <h3>add a new</h3>
      <PersonForm valueName={newName} onChangeName={handleNameChange} 
                  valueNumber={newNumber} onChangeNumber={handleNumberChange}
                  onSubmit={addNameNumber}/>
      <h3>Numbers</h3>
      {/* <Persons search={search} persons={persons}/> */}
      {/* {console.log('filter',!isFiltered(search) )} */}
       {/* { !isFiltered(search) 
          ? (persons.map(person => (
            <Person key={person.name} person={person} deleteButton={() => deleteButton(person.id, person.name)}/>
          )))
          : (persons.map(person => (
            <Person key={person.name} person={person} deleteButton={() => deleteButton(person.id, person.name)}/>
          )))
        } */}
        {filterArrays(persons, search).map(person => (
          <Person key={person.name} person={person} deleteButton={() => deleteButton(person.id, person.name)}/>
        ))}
        
    </div>
  )
}

export default App