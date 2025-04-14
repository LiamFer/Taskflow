import { PlusOutlined } from "@ant-design/icons";
import { Checkbox, Button, theme, Typography } from "antd";
import styles from "./boardlist.module.css";
import ListCard from "../ListCard/ListCard";
import { useEffect, useState } from "react";
import DeleteListButton from "./DeleteListButton";
import CreateTask from "../../Popups/CreateTask";
import { useDroppable } from "@dnd-kit/core";
import { useBoardData } from "../../../Context/boardContext";
import { editTask } from "../../../Services/boardService";
import socket from "../../../Services/websocket";
const { Paragraph } = Typography;

export default function BoardList({ list }) {
  const { setNodeRef } = useDroppable({ id: list.id });
  const [tasks, setTasks] = useState(list.tasks);
  const { token } = theme.useToken();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { updateList, fetchBoard, boardID } = useBoardData();
  const [isListComplete, setIsListComplete] = useState(false);

  useEffect(() => {
    setTasks(list.tasks);
  }, [list.tasks]);

  useEffect(() => {
    const allComplete =
      tasks.length > 0 && tasks.every((task) => task.completed);
    setIsListComplete(allComplete);
  }, [tasks]);

  async function completeTasks() {
    const updatedTasks = list.tasks.map((task) => ({
      ...task,
      completed: !isListComplete,
    }));
    await Promise.all(updatedTasks.map((task) => editTask(task.id, task)));
    setTasks(updatedTasks);
    setIsListComplete(!isListComplete);
    if (socket.connected) {
      socket.emit("listUpdate");
    }
    fetchBoard(boardID);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minWidth: 250,
        maxWidth: 250,
        gap: "20px",
        flex: 1,
        minHeight: 0,
      }}
    >
      <div
        className={styles.listHeader}
        style={{
          backgroundColor: token.colorBgContainerDisabled,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "4px 8px",
          gap: 8,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            gap: 6,
            overflow: "hidden",
          }}
        >
          <Checkbox checked={isListComplete} onChange={completeTasks} />
          <Paragraph
            style={{
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flex: 1,
            }}
            editable={{
              onChange: (ev) => {
                updateList(list.id, { title: ev });
              },
              triggerType: "text",
              autoSize: { maxRows: 1 },
            }}
          >
            {list?.title}
          </Paragraph>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Button
            onClick={() => setIsModalOpen(true)}
            type="text"
            icon={<PlusOutlined />}
          />
          <DeleteListButton listID={list?.id} />
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={styles.scrollArea}
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          overflowX: "hidden",
          paddingBottom: "5px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {tasks.map((task) => (
          <ListCard key={task.id} task={task} />
        ))}
      </div>

      <CreateTask
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        listID={list.id}
      />
    </div>
  );
}
