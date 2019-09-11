// import React from 'react'
// import { useState, useEffect } from 'react'
// import axios from 'axios'

// //feed array of countries
// const printLanguages = (languages) => {
//   // console.log('map', languages.map(language => language.name))
//   return languages.map(language => <li key={language.name}>{language.name}</li>)
// }

// const displayCountryView = (country) => {
//   console.log(country)
//   return (
//     <div>
//       <h1>{country.name}</h1>
//       <p>capital {country.capital}</p>
//       <p>population {country.population}</p>

//       <h2>languages</h2>
//       <ul>
//         {printLanguages(country.languages)}
//       </ul>
//       <img src={country.flag} height="100" width="100"></img>
      
//     </div>

//   )
// }

// const DisplayCountries = ({ countries, searchValue }) => {
//   const displayFilter = filteredCountries(countries, searchValue)
//   // console.log('current search', searchValue)
//   if (displayFilter.length >= 10) {
//     return <p>Too many matches, specify another filter</p>
//   } else if (isFiltered(searchValue)) {
//       if (displayFilter.length > 1 && displayFilter.length < 10) {
//         console.log('new level')
//         return displayFilter.map(country => <div key={country.name}>{country.name}{showButton(country)}</div>)
//       } else if (displayFilter.length === 1) {
//         // console.log('suh')
//         // return displayFilter.map(country => <p key={country.name}>{country.name}</p>)
//         const country = displayFilter
//         return displayCountryView(country[0])
//         // console.log(country)
//         // console.log('country.name', country[0])
//         // console.log(country[0].languages)
//         // console.log(printLanguages(country[0].languages))
//         // return (
//         //   <div>
//         //     <h1>{country[0].name}</h1>
//         //     <p>capital {country[0].capital}</p>
//         //     <p>population {country[0].population}</p>

//         //     <h2>languages</h2>
//         //     <ul>
//         //       {printLanguages(country[0].languages)}
//         //     </ul>
//         //     <img src={country[0].flag} height="100" width="100"></img>
//         //   </div>

//         // )
//       }
//   } else {
//     return <p>empty</p>
//   }
// }

// const showButton = (country) => {
//   return <button type="button" onClick={() => displayCountryView(country)}>show</button>
// }

// const filteredCountries = (countries, searchValue) => {
//   const showCountries = (!isFiltered(searchValue))
//     ? [{ name: "hi" }]
//     : countries.filter(country => country.name.toLowerCase().includes(searchValue.toLowerCase()))
//   // const countryMap = countries.map(country => country.name.toLowerCase())
//   // console.log(countryMap)
//   // return countryMap
//   return showCountries
// }

// function isFiltered(value) {
//   if (value === '') {
//     return false
//   } else {
//     return true
//   }
// }

// const Filter = ({ search, onChange }) => {
//   return (
//     <form >
//       <div>
//         find countries <input value={search} onChange={onChange} />
//       </div>
//     </form>
//   )
// }

// const App = () => {
//   const [countries, setCountries] = useState([])
//   const [search, setNewSearch] = useState('')
//   const [showCountry, setShowCountry] = useState('false')

//   useEffect(() => {
//     // console.log('effect')
//     axios
//       .get('https://restcountries.eu/rest/v2/all')
//       .then(response => {
//         // console.log('promise fulfilled')
//         setCountries(response.data)
//       })
//   }, [])

//   // const countryNames = countries.map(country => country.name)
//   // console.log('name', countryNames)

//   const handleSearchChange = (event) => {
//     setNewSearch(event.target.value)
//   }

//   // const fil = countries.filter(country => country.name==='Afg')
//   // console.log(countries[0])
//   // console.log('filtered:',fil)
//   // console.log(countries[0])
//   // console.log('render', countries.length, 'persons')

//   return (
//     <div>
//       <Filter search={search} onChange={handleSearchChange} />
//       <form>
//         <div>
//           <DisplayCountries countries={countries} searchValue={search} />
//         </div>
//       </form>
//     </div>

//   )
// }

// export default App;


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