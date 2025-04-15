import React, { useState } from "react";
import BoardList from "../BoardList/BoardList";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useBoardData } from "../../../Context/boardContext";
import ListCard from "../ListCard/ListCard";
import styles from "./kanban.module.css";
import socket from "../../../Services/websocket";

export default function Kanban() {
  const { boardData, fetchBoard, moveTaskToList, getTask } = useBoardData();
  const [activeDragTask, setActiveDragTask] = useState(null);

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

  return (
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
  );
}
