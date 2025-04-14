import { createContext, useContext, useEffect, useState } from "react";
import {
  createBoard,
  deleteBoard,
  editBoard,
  editList,
  getBoards,
  getLists,
  getMembers,
  getTasks,
  moveTask,
} from "../Services/boardService";

export const boardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [boardData, setBoardData] = useState([]);
  const [userBoards, setUserBoards] = useState([]);
  const [boardMembers, setBoardMembers] = useState([]);
  const [boardID, setboardID] = useState();

  function fetchBoard(id) {
    getLists(id).then((response) => {
      const lists = response.data.data;
      Promise.all(
        lists.map(async (list) => {
          const tasksResponse = await getTasks(list.id);
          return {
            ...list,
            tasks: tasksResponse.data.data.map((task) => {
              return { ...task, listid: list.id };
            }),
          };
        })
      ).then((listsWithTasks) => {
        setBoardData(listsWithTasks);
      });
    });
  }

  function fetchUserBoards() {
    getBoards().then((response) => setUserBoards(response.data.data));
  }

  function getBoardInfo(id) {
    return userBoards.find((board) => board.id == id);
  }

  function updateBoardInfo(id, data) {
    return editBoard(id, data).then((res) => {
      const editedBoard = res.data.data;
      setUserBoards(
        userBoards.map((board) => {
          if (board.id == editedBoard.id) {
            return editedBoard;
          }
          return board;
        })
      );
    });
  }

  function addBoard(data) {
    return createBoard(data).then((res) => {
      setUserBoards([...userBoards, res.data.data]);
      return res.data.data.id;
    });
  }

  function removeBoard(id) {
    return deleteBoard(id).then(() =>
      setUserBoards(userBoards.filter((board) => board.id != id))
    );
  }

  function updateList(id, data) {
    return editList(id, data).then((res) =>
      setBoardData(
        boardData.map((list) => {
          if (list.id == id) {
            return { ...list, title: data.title };
          }
          return list;
        })
      )
    );
  }

  function getTask(id) {
    for (const list of boardData) {
      const task = list.tasks.find((t) => t.id == id);
      if (task) return task;
    }
    return null;
  }

  function moveTaskToList(task, targetListId) {
    const updatedLists = boardData.map((list) => {
      if (list.id === task.listid) {
        // Remove a Task da lista antiga
        return {
          ...list,
          tasks: list.tasks.filter((t) => t.id !== task.id),
        };
      } else if (list.id === targetListId) {
        // Adicionando a Task na Lista Nova
        return {
          ...list,
          tasks: [...list.tasks, { ...task, listid: targetListId }],
        };
      }
      return list;
    });

    setBoardData(updatedLists);
    moveTask(task.id, { listId: targetListId });
  }

  function patchMoveTask(task, targetListId) {
    console.log(boardData);

    const updatedLists = boardData.map((list) => {
      if (list.id === task.listid) {
        // Remove a Task da lista antiga
        return {
          ...list,
          tasks: list.tasks.filter((t) => t.id !== task.id),
        };
      } else if (list.id === targetListId) {
        // Adicionando a Task na Lista Nova
        return {
          ...list,
          tasks: [...list.tasks, { ...task, listid: targetListId }],
        };
      }
      return list;
    });
    console.log(updatedLists);
    setBoardData(updatedLists);
  }

  function patchTask(task, taskData, field, value) {
    setBoardData((prev) =>
      prev.map((list) => {
        return {
          ...list,
          tasks: list.tasks.map((t) => {
            if (t.id == task.id) {
              return { ...t, ...taskData, [field]: value };
            }
            return t;
          }),
        };
      })
    );
  }

  function addTask(data) {
    const { id, title, description, completed } = data;
    const newTask = {
      id,
      title,
      description,
      completed,
      listid: data.list.id,
    };
    setBoardData(
      boardData.map((list) => {
        if (list.id == newTask.listid) {
          return { ...list, tasks: [...list.tasks, newTask] };
        }
        return list;
      })
    );
  }

  function removeTask(task) {
    setBoardData(
      boardData.map((list) => {
        if (list.id == task.listid) {
          return { ...list, tasks: list.tasks.filter((t) => t.id != task.id) };
        }
        return list;
      })
    );
  }

  function getBoardMembers() {
    return getMembers(boardID).then((res) => {
      setBoardMembers(res.data.data);
    });
  }

  return (
    <boardContext.Provider
      value={{
        boardData,
        userBoards,
        boardMembers,
        boardID,
        fetchUserBoards,
        setBoardData,
        fetchBoard,
        setboardID,
        moveTaskToList,
        getTask,
        patchTask,
        addTask,
        removeTask,
        getBoardInfo,
        updateBoardInfo,
        addBoard,
        removeBoard,
        updateList,
        getBoardMembers,
        patchMoveTask,
      }}
    >
      {children}
    </boardContext.Provider>
  );
};

export const useBoardData = () => useContext(boardContext);
