import api from "./api.js"

export const getBoards = () => api.get('/boards')
export const getLists = (boardID) => api.get(`/lists/boards/${boardID}`)
export const getTasks = (listID) => api.get(`/tasks/lists/${listID}`)


export const createList = (boardID,data) => api.post(`lists/boards/${boardID}`,data)
export const deleteList = (listID) => api.delete(`/lists/${listID}`)


export const createTask = (listID,data) => api.post(`/tasks/lists/${listID}`,data)
export const editTask = (taskID,data) => api.put(`/tasks/${taskID}`,data)
export const deleteTask = (taskID) => api.delete(`/tasks/${taskID}`)

