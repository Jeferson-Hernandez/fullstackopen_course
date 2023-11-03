import axios from 'axios'

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const result = await axios.get(baseUrl)
    return result.data
}

const create = async (anecdote) => {
    const result = await axios.post(baseUrl, anecdote)
    return result.data
}

const update = async (id, updatedAnecdote) => {
    const result = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
    return result.data
}

export default { getAll, create, update }