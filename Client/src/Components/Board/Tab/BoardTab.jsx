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
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useBoardData } from "../../../Context/boardContext";
import ListCard from "../ListCard/ListCard";
import styles from "./boardtab.module.css";
import socket from "../../../Services/websocket";
import { getMembers } from "../../../Services/boardService";

export default function BoardTab({ ID }) {
  const { boardData, fetchBoard, moveTaskToList, getTask, patchMoveTask } =
    useBoardData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [activeDragTask, setActiveDragTask] = useState(null);

  useEffect(() => {
    fetchBoard(ID);
  }, [ID]);

  // Conexão com o websocket
  useEffect(() => {
    if (ID) {
      getMembers(ID).then((res) => {
        const members = res.data.data;
        if (members.length) {
          socket.connect();
          socket.emit("joinBoard", { boardID: ID });
        }
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [ID]);

  useEffect(() => {
    if (boardData.length) {
      socket.on("taskMoved", (data) => {
        const { task, listId } = data;
        patchMoveTask(task, listId);
      });
    }
  }, [boardData]);

  function handleDragStart(event) {
    const taskId = event.active.id;
    const task = getTask(taskId);
    if (task) {
      setActiveDragTask(task);
    }
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id;
    const listId = over.id;
    const task = getTask(taskId);
    if (task && task.listid !== listId) {
      if (socket.connected) {
        socket.emit("taskMove", { task, listId });
      }
      moveTaskToList(task, listId);
    }
    setActiveDragTask(null);
  }

  const items = [
    {
      label: (
        <span>
          <AppstoreOutlined /> Kanban
        </span>
      ),
      key: "1",
    },
    {
      label: (
        <span>
          <TableOutlined /> Table
        </span>
      ),
      key: "2",
      disabled: true,
    },
    {
      label: (
        <span>
          <UnorderedListOutlined /> List
        </span>
      ),
      key: "3",
      disabled: true,
    },
    {
      label: (
        <span>
          <ClockCircleOutlined /> Timeline
        </span>
      ),
      key: "4",
      disabled: true,
    },
  ];

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        style={{ width: "100%" }}
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

      {activeTab === "1" && (
        <div
          className={styles.scrollArea}
          style={{
            display: "flex",
            gap: 20,
            overflowX: "auto",
            overflowY: "hidden",
            flexGrow: 1,
            flex: 1,
          }}
        >
          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            {boardData.map((list) => (
              <BoardList key={list.id} list={list} />
            ))}

            <DragOverlay>
              {activeDragTask ? (
                <div style={{ width: 250 }}>
                  <ListCard task={activeDragTask} isOverlay />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      )}

      <CreateList isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}
