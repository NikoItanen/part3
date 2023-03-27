import { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'


const App = () => {
  const [personList, setPersonList] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(()=> {
    personService
    .getAll()
    .then(data => {
      setPersonList(data)
    })
  }, [])

  const addPerson = (person) => {
    if (personList.some(p => p.name === person.name)) {
      alert(`${person.name} is already added to phonebook.`);
      return
    }

    personService
    .create(person)
    .then(data => {
      setPersonList(personList.concat(data))
      setNotificationMessage(`${data.name} added in phonebook!`)
      setNotificationType('add')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationType(null)
      }, 5000);
    })
    .catch(error => {
      setNotificationMessage(error.response.data.error)
      setNotificationType('remove')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationType(null)
      }, 5000);
    })
  }

  const deletePerson = (id) => {
    const personToDelete = personList.find(person => person.id === id)
    if (!personToDelete) {
      return
    }

    personService
     .remove(id)
     .then(() => {
      setPersonList(personList.filter(person => person.id !== id))
      setNotificationMessage(`${personToDelete.name} Removed Succesfully!`)
      setNotificationType('remove')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationType(null)
      }, 5000);
     })
     .catch(error => {
      setNotificationMessage(error.response.data.error)
      setNotificationType('remove')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationType(null)
      }, 5000);
     })
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType}/>
      <PersonForm onAddPerson={addPerson} persons={personList}/>
      <h2>Numbers</h2>
      <ul>
        {personList.map(person =>
          <Person key={person.id || person.name} person={person} onDelete={deletePerson} />
        )}
      </ul>
    </div>
  )

}

export default App