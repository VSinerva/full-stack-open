const PersonList = ({persons}) => persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)

export default PersonList
