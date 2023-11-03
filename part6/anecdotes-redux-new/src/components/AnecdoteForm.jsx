import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

export const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const anecdote = {
            content: e.target.title.value,
            votes: 0
        }
        e.target.title.value = ''
        try {
            dispatch(createAnecdote(anecdote))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>New Anecdote</h1>
            <form onSubmit={handleSubmit}>
                <input name="title" type="text" />
                <button>Create</button>
            </form>
        </div>

    )
}