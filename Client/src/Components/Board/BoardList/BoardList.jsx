import { PlusOutlined } from "@ant-design/icons";
import { Checkbox, Button, theme } from "antd";
import styles from "./boardlist.module.css";
import ListCard from "../ListCard/ListCard";
import { useEffect, useState } from "react";
import DeleteListButton from "./DeleteListButton";
import CreateTask from "../../Popups/CreateTask";
import { useDroppable } from "@dnd-kit/core";

export default function BoardList({ list }) {
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
        gap: "20px",
        flex: 1,
        minHeight: 0,
      }}
    >
      {/* Header fixo */}
      <div
        className={styles.listHeader}
        style={{
          backgroundColor: token.colorBgContainerDisabled,
          flexShrink: 0,
        }}
      >
        <Checkbox>{list?.title}</Checkbox>
        <div>
          <Button
            onClick={() => setIsModalOpen(true)}
            type="text"
            icon={<PlusOutlined />}
          />
          <DeleteListButton listID={list?.id} />
        </div>
      </div>

      {/* Scroll vertical aqui */}
      <div
        ref={setNodeRef}
        className={styles.scrollArea}
        style={{
          flex: 1,
          minHeight: 0, // <- ESSENCIAL para scroll funcionar corretamente
          overflowY: "auto",
          overflowX: "hidden", // ✅ Adiciona essa linha
          paddingRight: 8,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {tasks.map((task) => (
          <ListCard key={task.id} task={task} />
        ))}
      </div>

      {/* Modal */}
      <CreateTask
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        listID={list.id}
      />
    </div>
  );
}
