import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  console.log(token)
  const config = {
    headers: { 'Authorization': token }
  }
  console.log(config)

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, updateObject) => {
  const request = axios.put(`${baseUrl}/${id}`, updateObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken, remove }
