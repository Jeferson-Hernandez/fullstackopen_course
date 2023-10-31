import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {

  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => { setCountries(response.data) })
  }, [])

  const handleFilter = (e) => setFilter(e.target.value)

  const countriesFilter = countries.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  return (
    <>
      find countries <input type="text" value={filter} onChange={handleFilter} />
      {
        countriesFilter.length > 10
          ? <p>Too many matches, specify another filter</p>
          : countriesFilter.length > 1
            ? countriesFilter.map((country, index) => <div key={index}>{country.name.common}</div>)
            : countriesFilter.length === 1
              ? <div>
                <h1>{countriesFilter[0].name.common}</h1>
                <div>{countriesFilter[0].capital}</div>
                <div>population {countriesFilter[0].population}</div>
                <h2>Lenguages</h2>
                <ul>
                  {
                    Object.values(countriesFilter[0]?.languages).map((lang) => {
                      return <li key={lang}>{lang}</li>
                    })
                  }
                </ul>
                <img src={countriesFilter[0].flags.png} style={{ width: "150px" }} />
              </div>
              : <p>Not country found</p>
      }
    </>
  )
}

export default App
