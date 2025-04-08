import api from "./api.js"

export const createUser = (data) => api.post('/user/register', data)
export const login = (data) => api.post('/user/login', data)
export const authMe = (data) => api.get('/user/authme')