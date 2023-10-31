import { useState, useEffect } from 'react'
import { Filter } from '../components/Filter'
import { Persons } from '../components/Persons'
import { PersonForm } from '../components/PersonForm'
import phonebookService from '../services/persons'

const Notification = ({ message, styles }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={styles}>
      {message}
    </div>
  )
}

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [styleMessage, setStyleMessage] = useState('success')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])


  const handleName = (e) => setNewName(e.target.value)
  const handleNumber = (e) => setNewNumber(e.target.value)
  const handleFilter = (e) => setFilter(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()

    const isPerson = persons.find((person) => person.name === newName)
    if (isPerson) {
      const result = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (result) {
        const newPerson = { ...isPerson, number: newNumber }
        phonebookService
          .updatePerson(isPerson.id, newPerson)
          .then(() => {
            setPersons(persons.map((person) => person.id !== isPerson.id ? person : newPerson))
          })
      }
    } else {
      phonebookService
        .createPerson({ name: newName, number: newNumber })
        .then(person => setPersons(persons.concat(person)))

      setStyleMessage('success')
      setErrorMessage(
        `Added ${newName}`
      )
      setNewName('')
      setNewNumber('')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }
  }

  const handleDelete = (id) => {
    const personData = persons.find((person) => person.id === id)
    const result = window.confirm(`Delete ${personData.name} ?`)
    console.log(personData)
    if (result) {
      phonebookService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== personData.id))
        })
        .catch(() => {
          setStyleMessage('error')
          setErrorMessage(
            `Information of ${newName} has already been removed from server`
          )
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} styles={styleMessage} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} newNumber={newNumber} handleName={handleName} handleNumber={handleNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )
}

export default App
