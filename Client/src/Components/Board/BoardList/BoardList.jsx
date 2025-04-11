import { PlusOutlined } from "@ant-design/icons";
import { Checkbox, Button, theme } from "antd";
import styles from "./boardlist.module.css";
import ListCard from "../ListCard/ListCard";
import { useEffect, useState } from "react";
import DeleteListButton from "./DeleteListButton";
import CreateTask from "../../Popups/CreateTask";
import { useDroppable } from "@dnd-kit/core";

export default function BoardList({ list, setBoardLists, refreshLists }) {
  const { setNodeRef } = useDroppable({ id: list.id });

  const [tasks, setTasks] = useState(list.tasks);
  const { token } = theme.useToken();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setTasks(list.tasks);
  }, [list.tasks]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minWidth: 250,
        maxWidth: 300,
        flexGrow: 1,
        minHeight: "80vh",
        gap: 20,
      }}
    >
      <div
        className={styles.listHeader}
        style={{
          backgroundColor: token.colorBgContainerDisabled,
        }}
      >
        <Checkbox>{list?.title}</Checkbox>
        <div>
          <Button
            onClick={() => setIsModalOpen(true)}
            type="text"
            icon={<PlusOutlined />}
          />
          <DeleteListButton listID={list?.id} setBoardLists={setBoardLists} />
        </div>
      </div>

      <div
        ref={setNodeRef}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          height: "100%",
        }}
      >
        {tasks.map((task) => (
          <ListCard key={task.id} task={task} refreshLists={refreshLists} />
        ))}
      </div>

      <CreateTask
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        listID={list.id}
        refreshLists={refreshLists}
      />
    </div>
  );
}
