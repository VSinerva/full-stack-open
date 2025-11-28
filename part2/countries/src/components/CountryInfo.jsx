const CountryInfo = ({country}) => {
  const name = country.name.common
  const capital = country.capital[0]
  const area = country.area
  const languages = Object.values(country.languages)
  const flag = country.flags.png
  return (
    <div>
      <h1>{name}</h1>
      Capital {capital}<br/>
      Area {area} km<sup>2</sup><br/>
      <h2>Languages</h2>
      <ul>
        {languages.map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={flag}/>
    </div>
  )
}

export default CountryInfo
