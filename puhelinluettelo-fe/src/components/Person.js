const Person = ({ person, onDelete }) => {

    const confirmDelete = () => {
        if (window.confirm(`Delete ${person.name}`))
        onDelete(person.id)
    }

    return (
        <li>
            {`${person.name}, ${person.number}`}
            <button onClick={confirmDelete}>Delete</button>
        </li>
    )
}

export default Person