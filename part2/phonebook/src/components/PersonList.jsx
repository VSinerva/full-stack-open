const Person = ({person, onClick}) => {
  return <p>{person.name} {person.number} <button onClick={() => onClick(person)}>delete</button></p>
}

const PersonList = ({persons, deleteHandler}) =>
  <>{persons.map(person => <Person key={person.id} person={person} onClick={deleteHandler}/>)}</>

export default PersonList
