import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateVote(state, action) {
      let anecdote = state.find((anecd) => anecd.id === action.payload)
      anecdote.votes++
      state = state.filter((anecd) =>
        anecd.id !== action.payload
          ? anecd
          : anecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, updateVote, setAnecdotes } = anecdoteReducer.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const result = await anecdotesService.create(anecdote)
    dispatch(appendAnecdote(result))
  }
}

export const voteAnecdote = (id, updatedAnecdote) => {
  return async (dispatch) => {
    await anecdotesService.update(id, updatedAnecdote)
    dispatch(updateVote(id))
  }
}

export default anecdoteReducer.reducer