import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

api.interceptors.response.use((response) => {
    return response 
}, (error) => {
    return Promise.reject(error)
})

export { api }