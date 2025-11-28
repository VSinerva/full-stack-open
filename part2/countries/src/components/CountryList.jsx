const CountryList = ({countries}) => <>{countries.map(country =>
  <div key={country.cca3}>{country.name.common}</div>
)}</>

export default CountryList 
