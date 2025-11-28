import { useState, useEffect } from 'react'

import countryService from './services/country'

import CountryList from './components/CountryList'
import CountryInfo from './components/CountryInfo'
import Filter from './components/Filter'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => { countryService.getAll().then(countries => setCountries(countries)) }, [])

  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
    setSelectedCountry(null)
  }

  const countriesToShow = (() => {
    if (selectedCountry)
      return [selectedCountry]
    if (searchTerm === '')
      return countries

    return countries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      || country.name.official.toLowerCase().includes(searchTerm.toLowerCase()))
  })()

  const selectionClear = selectedCountry
    ? <button onClick={() => setSelectedCountry(null)}>Show list</button>
    : null

  const content = (()=>{
    if (countriesToShow.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else if (countriesToShow.length > 1) {
      return <CountryList countries={countriesToShow} clickHandler={setSelectedCountry}/>
    } else if (countriesToShow.length === 1){
      return <CountryInfo country={countriesToShow[0]}/>
    } else return null
  })()

  return (
    <div>
      <Filter value={searchTerm} onChange={handleSearchChange} />
      {selectionClear}
      {content}
    </div>
  )
}

export default App
