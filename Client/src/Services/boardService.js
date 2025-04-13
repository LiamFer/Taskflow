import api from "./api.js"

export const getBoards = () => api.get('/boards')
export const getLists = (boardID) => api.get(`/lists/boards/${boardID}`)
export const getTasks = (listID) => api.get(`/tasks/lists/${listID}`)


export const createList = (boardID,data) => api.post(`lists/boards/${boardID}`,data)
export const deleteList = (listID) => api.delete(`/lists/${listID}`)
export const editList = (listID,data) => api.put(`/lists/${listID}`,data)


export const createTask = (listID,data) => api.post(`/tasks/lists/${listID}`,data)
export const editTask = (taskID,data) => api.put(`/tasks/${taskID}`,data)
export const deleteTask = (taskID) => api.delete(`/tasks/${taskID}`)
export const moveTask = (taskID,data) => api.patch(`/tasks/${taskID}/move`,data)


export const createBoard = (data) => api.post(`/boards`,data)
export const editBoard = (boardID,data) => api.put(`/boards/${boardID}`,data)
export const deleteBoard = (boardID) => api.delete(`/boards/${boardID}`)


export const getMembers = (boardID) => api.get(`/boards/${boardID}/members`)
export const inviteMember = (boardID,data) => api.post(`/boards/${boardID}/invite`,data)
export const removeMember = (boardID,email) => api.delete(`/boards/${boardID}/members/${email}`)
export const searchUsers = (username) =>
  api.get('/user/search', {
    params: {
      query: username,
    },
  });