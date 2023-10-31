import axios from 'axios'

const BASEURL = '/api/persons'

const getAll = () => { return axios.get(BASEURL).then(res => res.data) }

const createPerson = (person) => {
    return axios.post(BASEURL, person).then((res) => res.data)
}

const updatePerson = (id, newPerson) => {
    return axios.put(`${BASEURL}/${id}`, newPerson).then(res => res.data)
}

const deletePerson = (id) => {
    return axios.delete(`${BASEURL}/${id}`).then((res) => res.data)
}

export default { getAll, createPerson, updatePerson, deletePerson }