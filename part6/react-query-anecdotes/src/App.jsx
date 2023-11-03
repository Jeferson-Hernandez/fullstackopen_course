import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, voteAnecdote } from './services/anecdotes'

const App = () => {

  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery('anecdotes', getAnecdotes, {
    retry: 1
  })

  const voteAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      const updatedAnecdotes = anecdotes.map((anecdote) =>
        anecdote.id !== updatedAnecdote.id
          ? anecdote
          : updatedAnecdote)
      queryClient.setQueryData('anecdotes', updatedAnecdotes)
    }
  })

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Anecdote service not available due to problems in server</span>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
