import api from "./api.js"

export const createUser = (data) => api.post('/user/register', data)
export const login = (data) => api.post('/user/login', data)
export const authMe = () => api.get('/user/authme')
export const logout = () => api.get('/user/logout')