
export const Persons = ({ persons, filter, handleDelete }) => {

    return (
        <div>
            {
                persons
                    .filter((person) => {
                        return person.name
                            .toLowerCase()
                            .includes(filter.toLowerCase())
                    })
                    .map((person) => (
                        <div key={person.id}>
                            <span>{person.name} {person.number} </span>
                            <button onClick={() => handleDelete(person.id)}>delete</button>
                        </div>
                    ))
            }
        </div>
    )
}
