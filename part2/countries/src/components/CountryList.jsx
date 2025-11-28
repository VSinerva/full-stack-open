const CountryList = ({countries, clickHandler}) => <>{countries.map(country =>
  <div key={country.cca3}>{country.name.common} <button onClick={() => clickHandler(country)}>Show</button></div>
)}</>

export default CountryList 
