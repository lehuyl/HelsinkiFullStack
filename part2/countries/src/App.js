import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

//feed array of countries
const printLanguages = (languages) => {
  // console.log('map', languages.map(language => language.name))
  return languages.map(language => <li key={language.name}>{language.name}</li>)
}

const DisplayCountries = ({ countries, searchValue }) => {
  const displayFilter = filteredCountries(countries, searchValue)
  console.log('current search', searchValue)
  if (displayFilter.length >= 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (isFiltered(searchValue)) {
      if (displayFilter.length > 1 && displayFilter.length < 10) {
        return displayFilter.map(country => <p key={country.name}>{country.name}</p>)
      } else if (displayFilter.length === 1) {
        // console.log('suh')
        // return displayFilter.map(country => <p key={country.name}>{country.name}</p>)
        const country = displayFilter
        // console.log(country)
        console.log('country.name', country[0])
        // console.log(country[0].languages)
        console.log(printLanguages(country[0].languages))
        return (
          <div>
            <h1>{country[0].name}</h1>
            <p>capital {country[0].capital}</p>
            <p>population {country[0].population}</p>

            <h2>languages</h2>
            <ul>
              {printLanguages(country[0].languages)}
            </ul>
            <img src={country[0].flag} height="100" width="100"></img>
          </div>

        )
      }
  } else {
    return <p>empty</p>
  }
}

const filteredCountries = (countries, searchValue) => {
  const showCountries = (!isFiltered(searchValue))
    ? [{ name: "hi" }]
    : countries.filter(country => country.name.toLowerCase().includes(searchValue.toLowerCase()))
  // const countryMap = countries.map(country => country.name.toLowerCase())
  // console.log(countryMap)
  // return countryMap
  return showCountries
}

function isFiltered(value) {
  if (value === '') {
    return false
  } else {
    return true
  }
}

const Filter = ({ search, onChange }) => {
  return (
    <form >
      <div>
        find countries <input value={search} onChange={onChange} />
      </div>
    </form>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setNewSearch] = useState('')

  useEffect(() => {
    // console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        // console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  // const countryNames = countries.map(country => country.name)
  // console.log('name', countryNames)

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  // const fil = countries.filter(country => country.name==='Afg')
  console.log(countries[0])
  // console.log('filtered:',fil)
  // console.log(countries[0])
  // console.log('render', countries.length, 'persons')

  return (
    <div>
      <Filter search={search} onChange={handleSearchChange} />
      <form>
        <div>
          <DisplayCountries countries={countries} searchValue={search} />
        </div>
      </form>
    </div>

  )
}

export default App;
