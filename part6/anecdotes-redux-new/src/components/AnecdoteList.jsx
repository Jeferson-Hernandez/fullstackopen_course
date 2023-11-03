import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { Filter } from './Filter'
import { setNotification } from '../reducers/notificationReducer'
import Notification from './Notification'

// eslint-disable-next-line react/prop-types
const Anecdote = ({ content, votes, voteAnecd }) => {
    return (
        <div >
            <div>
                {content}
            </div>
            <div>
                has {votes}
                <button onClick={voteAnecd}>vote</button>
            </div>
        </div>
    )
}

export const AnecdoteList = () => {

    const data = useSelector(({ anecdotes, filter }) => (
        anecdotes.filter(
            (a) => a.content
                .toLowerCase()
                .includes(filter.toLowerCase())
        )
    ))
    const notification = useSelector(({ notification }) => notification)

    const dispatch = useDispatch()


    const anectotesSorted = data.sort((a, b) => {
        if (a.votes < b.votes) return 1
        if (a.votes > b.votes) return -1
        return 0
    })

    const voteAnecd = (id) => {
        const anecdote = data.find((a) => a.id === id)
        const updatedAnecote = {
            content: anecdote.content,
            id: anecdote.id,
            votes: anecdote.votes + 1
        }
        dispatch(voteAnecdote(id, updatedAnecote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }
    return (
        <div>
            <h2>Anecdotes</h2>
            {notification && <Notification />}

            {anectotesSorted.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    content={anecdote.content}
                    votes={anecdote.votes}
                    voteAnecd={() => voteAnecd(anecdote.id)}
                />
            )}
            <Filter />
        </div>
    )
}
