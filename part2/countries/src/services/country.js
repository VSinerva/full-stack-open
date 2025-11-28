import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'
const url = suffix => `${baseUrl}${suffix}`

const getAll = () => axios.get(url('all')).then(response => response.data)

export default {getAll}
