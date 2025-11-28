import axios from 'axios'
const baseUrl = '/api/persons'

const create = newPerson => axios.post(baseUrl, newPerson).then(response => response.data)

const getAll = () => axios.get(baseUrl).then(response => response.data)

const remove = id => axios.delete(`${baseUrl}/${id}`).then(response => response.data)

const update = changedPerson => axios.put(`${baseUrl}/${changedPerson.id}`, changedPerson).then(response => response.data)

export default {create, getAll, remove, update}
