import { useState, useEffect } from 'react'

import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(() => { personService.getAll().then(initialPersons => setPersons(initialPersons)) }, [])

  const addName = event => {
    event.preventDefault()
    if (persons.some((element) => element.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {name: newName, number: newNumber}
      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const deleteName = person => {
    if (confirm(`Delete ${person.name}?`))
      personService.remove(person.id)
        .then(returnedPerson => setPersons(persons.filter(person => person.id !== returnedPerson.id)))
    else return null
  }

  const handleSearchChange = event => setSearchName(event.target.value)
  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)

  const personsToShow = searchName === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchName} onChange={handleSearchChange} />

      <h3>Add a New Number</h3>
      <PersonForm onSubmit={addName} nameValue={newName} nameOnChange={handleNameChange} numberValue={newNumber} numberOnChange={handleNumberChange} />

      <h3>Numbers</h3>
      <PersonList persons={personsToShow} deleteHandler={deleteName} />
    </div>
  )
}

export default App
