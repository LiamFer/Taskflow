import { createContext, useContext, useState } from "react";
import { getLists, getTasks, moveTask } from "../Services/boardService";

export const boardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [boardData, setBoardData] = useState([]);
  const [boardID, setboardID] = useState();

  function fetchBoard() {
    getLists(boardID).then((response) => {
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

  return (
    <boardContext.Provider
      value={{ boardData, setBoardData, fetchBoard, setboardID, moveTaskToList,getTask }}
    >
      {children}
    </boardContext.Provider>
  );
};

export const useBoardData = () => useContext(boardContext);
