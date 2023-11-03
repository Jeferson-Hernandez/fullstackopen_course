import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const { data } = await axios.get(baseUrl)
    return data
}

export const createAnecdote = async (anecdote) => {
    const { data } = await axios.post(baseUrl, anecdote)
    return data
}

export const voteAnecdote = async (updatedAnecdote) => {
    const { data } = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    return data
}