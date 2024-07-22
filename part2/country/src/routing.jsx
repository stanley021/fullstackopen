import axios from 'axios'
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/name/"
const baseAll = "https://studies.cs.helsinki.fi/restcountries/api/all"
const weather = "https://api.openweathermap.org/data/2.5/weather?q="
const api_key = import.meta.env.VITE_SOME_KEY;


const getWeather = (country) =>{
  const request = axios.get(`${weather}${country}&appid=${api_key}`)
  return request.then(response =>response.data)
};


const getCountry = (country) => {
  const request = axios.get(`${baseUrl}/${country}`)
  return request.then(response => response.data)
};

const getAll = () => {
    const request = axios.get(baseAll)
    return request.then(response => response.data)
};

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
};

const remove = (id) =>{
    const request = axios.delete(`${baseUrl}/${id}`)
    return request
}

export default { 
  getWeather:getWeather,
  getAll:getAll,
  getCountry: getCountry, 
  create: create, 
  update: update,
  remove: remove, 
};