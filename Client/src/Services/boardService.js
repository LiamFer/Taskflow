import api from "./api.js"

export const getBoards = () => api.get('/boards')
export const getLists = (boardID) => api.get(`/lists/boards/${boardID}`)
export const getTasks = (listID) => api.get(`/tasks/lists/${listID}`)