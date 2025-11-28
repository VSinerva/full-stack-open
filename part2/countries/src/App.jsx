import { useState, useEffect } from 'react'

import countryService from './services/country'

import CountryList from './components/CountryList'
import CountryInfo from './components/CountryInfo'
import Filter from './components/Filter'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => { countryService.getAll().then(countries => setCountries(countries)) }, [])

  const handleSearchChange = event => setSearchTerm(event.target.value)

  const countriesToShow = searchTerm === ''
    ? countries 
    : countries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      || country.name.official.toLowerCase().includes(searchTerm.toLowerCase()))

  const content = (()=>{
    if (countriesToShow.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else if (countriesToShow.length > 1) {
      return <CountryList countries={countriesToShow}/>
    } else if (countriesToShow.length === 1){
      return <CountryInfo country={countriesToShow[0]}/>
    } else return null
  })()

  return (
    <div>
      <Filter value={searchTerm} onChange={handleSearchChange} />
      {content}
    </div>
  )
}

export default App
