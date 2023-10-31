import axios from 'axios'
const baseUrl = '/api/login'

const login = async (user) => {
    const { data } = await axios.post(baseUrl, user)
    return data
}

export default { login }