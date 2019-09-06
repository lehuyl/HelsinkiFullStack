import React, { useState, useEffect } from 'react'
import axios from 'axios'

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


const Persons = (props) => {
  var showFilter = filterArrays(props.persons, props.search[0])
  if(!isFiltered(props.search)){
    return showFilter.map(person => <p key={person.name}>{person.name} {person.number}</p>)
  } else {
    return showFilter.map(person => <p key={person.name}>{person.name} {person.number}</p>)
  }
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

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')
  

  const addNameNumber = (event) => {
      event.preventDefault()
      const personAdd = {
        name: newName,
        number: newNumber
      }      

      if(isDuplicate(persons, newName)){
        alert(`${newName} is already added to phonebook`)
      } else {
        setPersons(persons.concat(personAdd))
        setNewName('')
        setNewNumber('')
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
      <Filter value={search} onChange={handleSearchChange} />
      <h3>add a new</h3>
      <PersonForm valueName={newName} onChangeName={handleNameChange} 
                  valueNumber={newNumber} onChangeNumber={handleNumberChange}
                  onSubmit={addNameNumber}/>
      <h3>Numbers</h3>
      <Persons search={[search, setNewSearch]} persons={persons}/>
    </div>
  )
}

export default App