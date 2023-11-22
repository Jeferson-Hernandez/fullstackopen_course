import { useContext } from 'react'
import NotificationContext from '../context/NotificationContext'
import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../services/anecdotes'

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    }
  })
  console.log(notification);

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.length < 5) {
      notificationDispatch({ type: 'MESSAGE', payload: 'La anecdota debe tener al menos 5 caracteres de longitud' })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
      return
    }
    try {
      newAnecdoteMutation.mutate({ content, votes: 0 })
      notificationDispatch({ type: 'MESSAGE', payload: `added ${content}` })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ paddingBottom: 10 }}>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
