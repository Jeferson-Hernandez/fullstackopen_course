import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (userToken) => {
  token = `bearer ${userToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog) => {
  const config = {
    headers: {
      'Authorization': token
    }
  }
  return await axios.post(baseUrl, blog, config)
}

const update = async (id, newBlog) => {
  const config = {
    headers: {
      'Authorization': token
    }
  }
  const result = await axios.put(`${baseUrl}/${id}`, newBlog, config)
  return result
}

const del = async (id) => {
  const config = {
    headers: {
      'Authorization': token
    }
  }
  const result = await axios.delete(`${baseUrl}/${id}`, config)
  console.log(result);
  return result
}

export default { getAll, create, update, del, setToken }