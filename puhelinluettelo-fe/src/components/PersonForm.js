import { useState } from "react"

const PersonForm = ( {onAddPerson, persons} ) => {
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
      }
    
    const handlePhoneChange = (event) => {
        setNewPhone(event.target.value)
      }


    const handleSubmit = (event) => {
        event.preventDefault()

        const personObject = {
            name: newName,
            id: persons.length + 1,
            number: newPhone
          }
        
        onAddPerson(personObject)
    
        setNewName('')
        setNewPhone('')
    }

return (
    <form onSubmit={handleSubmit}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
          <div>
            Phone: <input value={newPhone} onChange={handlePhoneChange} />
            <button type="submit">Add</button>
          </div>
        </div>
      </form>
)
}

export default PersonForm