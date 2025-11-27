import { useState, useEffect } from 'react'

import personService from './services/persons'

import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => { personService.getAll().then(initialPersons => setPersons(initialPersons)) }, [])

  const showMessage = message => {
    setNotificationMessage(message)
    setTimeout(() => {setNotificationMessage(null)}, 5000)
  }

  const showError = error => {
    setErrorMessage(error)
    setTimeout(() => {setErrorMessage(null)}, 5000)
  }

  const addName = event => {
    event.preventDefault()
    if (persons.some((element) => element.name === newName)) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = {...person, number: newNumber}
        personService.update(changedPerson).then(returnedPerson => {
          setPersons(persons.map(p => p.id === returnedPerson.id ? returnedPerson : p))
          showMessage(`Updated number for ${newName}`)
          setNewName('')
          setNewNumber('')
        })
        .catch(() => {
            showError(`Information of ${newName} has already been removed from the server`)
            setPersons(persons.filter(person => person.name !== newName))
        })
      }
    }
    else {
      const personObject = {name: newName, number: newNumber}
      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        showMessage(`Added ${newName}`)
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const deleteName = person => {
    if (confirm(`Delete ${person.name}?`))
      personService.remove(person.id).then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== returnedPerson.id))
          showMessage(`Deleted ${returnedPerson.name}`)
        })
        .catch(() => {
          showError(`Information of ${person.name} has already been removed from the server`)
          setPersons(persons.filter(person => person.name !== newName))
        })
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
      <Notification message={notificationMessage} />
      <Notification message={errorMessage} isError={true} />
      <Filter value={searchName} onChange={handleSearchChange} />

      <h3>Add a New Number</h3>
      <PersonForm onSubmit={addName} nameValue={newName} nameOnChange={handleNameChange} numberValue={newNumber} numberOnChange={handleNumberChange} />

      <h3>Numbers</h3>
      <PersonList persons={personsToShow} deleteHandler={deleteName} />
    </div>
  )
}

export default App
