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
import CreateList from "../../Popups/CreateList";
import { DndContext } from "@dnd-kit/core";
import { useBoardData } from "../../../Context/boardContext";

export default function BoardTab({ boardID }) {
  const { boardData, fetchBoard, moveTaskToList, getTask } = useBoardData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchBoard();
  }, [boardID]);

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
            {boardData.map((list) => (
              <BoardList key={list.id} list={list} />
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
        boardID={boardID}
      />
    </>
  );
}
