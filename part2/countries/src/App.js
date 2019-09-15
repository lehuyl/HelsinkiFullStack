import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'


const Country = ({country})=> {
  const [showInfo, setShowInfo] = useState(false)
  const [weather, setWeather] = useState([])
  const [error, setError] = useState(null)

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }
  const {name, capital, population, languages, flag} = country

  useEffect(() => {
    axios
    //give input
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&APPID=e3e10c53377c94960acb8c76c40551d8`)
    .then(response => {
      setWeather(response.data)
    }) 
    //if no country selected then do nothing
    .catch(error => {
      setError(error.response.data.message)
      //no countries
      setWeather([])
    })
  }, [])
  

  
  return (  
  <div>
    {name}
    <button onClick={toggleInfo}>{showInfo ? "Hide" : "Show"}</button>
    {showInfo && (
    <div>
      <h1>{name}</h1>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <h2>Languages</h2>
      <ul>
        {languages.map(lang => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img src={flag} width= "100px" height= "100px" />
      <h2>Weather in {capital}</h2>
      <h3>temperature: {weather.main.temp} K</h3>
      <img src={weather.weather}/>
      <h3>wind: {weather.wind.speed}{weather.wind.deg}</h3>
    </div>
    )}
    </div> 
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [error,setError] = useState(null)
  const [searchValue, setSearchValue] = useState('')


  useEffect(() => {
    if(searchValue){
      axios
      //give input
      .get(`https://restcountries.eu/rest/v2/name/${searchValue}`)
      .then(response => {
        setError(null)
        setCountries(response.data)
      })
      .catch(error => {
        setError(error.response.data.message)
        //no countries
        setCountries([])
      })
      //if no country selected then do nothing
    } else {
      setError(null)
      setCountries([])
    }
  }, [searchValue])

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <div>
      <div>
        find countries
        <input value={searchValue} onChange={handleSearchChange}/>
      </div>
      {error && error}
      { countries.length > 10 ? (
        <p>Too many matches, please be more specific...</p>
      ) : (
        countries.map(country => (
          <Country key={country.name} country={country}/>
        ))
      )}
      

    </div>
  )
}

export default App;