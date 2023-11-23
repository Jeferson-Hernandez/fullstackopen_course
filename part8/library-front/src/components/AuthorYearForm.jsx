/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { AUTHOR_BORN_UPDATE, ALL_AUTHORS, ALL_BOOKS } from '../graphql/queries'

export const AuthorYearForm = ({ authors }) => {
    const [selectedAuthor, setSelectedAuthor] = useState('')
    const [born, setBorn] = useState('')

    const [ updateBorn ] = useMutation(AUTHOR_BORN_UPDATE, {
        refetchQueries: [
            { query: ALL_AUTHORS },
            { query: ALL_BOOKS }
        ]
    })

    const handleUpdate = () => {
        updateBorn({ variables: { name: selectedAuthor, setBornTo: Number(born) }})
        setBorn('')
    }

    return (
        <div>
            <h2>Set birthyear</h2>
            <select
                value={selectedAuthor}
                onChange={e => setSelectedAuthor(e.target.value)}
            >
                {
                    authors.map(author => (
                        <option key={author.name} value={author.name}>{author.name}</option>
                    ))
                }
            </select>
            <div style={{ paddingTop: 20}}>
                <label htmlFor='bornYear'>born </label>
                <input id='bornYear' type="text" value={born} onChange={e => setBorn(e.target.value)} />
                <br />
                <button onClick={handleUpdate}>update author</button>
            </div>
        </div>
    )
}
