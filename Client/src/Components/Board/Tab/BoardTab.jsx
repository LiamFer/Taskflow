import {
  AppstoreOutlined,
  TableOutlined,
  UnorderedListOutlined,
  ClockCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Tabs } from "antd";
import { useEffect, useState } from "react";
import BoardList from "../BoardList/BoardList";
import { getLists, getTasks, moveTask } from "../../../Services/boardService";
import CreateList from "../../Popups/CreateList";
import { DndContext } from "@dnd-kit/core";

export default function BoardTab({ boardID }) {
  const [boardLists, setBoardLists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State pra Atualizar as Listas caso o Usuário crie uma Nova !
  const [listsVersion, setListsVersion] = useState(0);

  useEffect(() => {
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
        setBoardLists(listsWithTasks);
      });
    });
  }, [boardID, listsVersion]);

  function refreshLists() {
    setListsVersion((prev) => prev + 1);
  }

  function getTask(id) {
    for (const list of boardLists) {
      const task = list.tasks.find((t) => t.id == id);
      if (task) return task;
    }
    return null;
  }

  function moveTaskToList(task, targetListId) {
    const updatedLists = boardLists.map((list) => {
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

    setBoardLists(updatedLists);
    moveTask(task.id, { listId: targetListId });
  }

  function handleDrag(event) {
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id;
    const listId = over.id;
    const task = getTask(taskId);
    if (task && task.listid != listId) {
      moveTaskToList(task, listId);
    }
  }

  const items = [
    {
      label: (
        <span>
          <AppstoreOutlined /> Kanban
        </span>
      ),
      key: "1",
      children: (
        <div
          style={{
            display: "flex",
            width: "100%",
            gap: 20,
          }}
        >
          <DndContext onDragEnd={handleDrag}>
            {boardLists.map((list) => (
              <BoardList
                key={list.id}
                list={list}
                setBoardLists={setBoardLists}
                refreshLists={refreshLists}
              />
            ))}
          </DndContext>
        </div>
      ),
    },
    {
      label: (
        <span>
          <TableOutlined /> Table
        </span>
      ),
      key: "2",
      children: "Conteúdo Table",
      disabled: true,
    },
    {
      label: (
        <span>
          <UnorderedListOutlined /> List
        </span>
      ),
      key: "3",
      children: "Conteúdo List",
      disabled: true,
    },
    {
      label: (
        <span>
          <ClockCircleOutlined /> Timeline
        </span>
      ),
      key: "4",
      children: "Conteúdo Timeline",
      disabled: true,
    },
  ];

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        items={items}
        tabBarExtraContent={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            New List
          </Button>
        }
      />
      <CreateList
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        refreshLists={refreshLists}
        boardID={boardID}
      />
    </>
  );
}
