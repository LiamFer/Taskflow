import { PlusOutlined } from "@ant-design/icons";
import { Checkbox, Button, theme } from "antd";
import styles from "./boardlist.module.css";
import ListCard from "../ListCard/ListCard";
import { useEffect, useState } from "react";
import { getTasks } from "../../../Services/boardService";
import DeleteListButton from "./DeleteListButton";
import CreateTask from "../../Popups/CreateTask";

export default function BoardList({ list, setBoardLists }) {
  const [tasks, setTasks] = useState([]);
  const { token } = theme.useToken();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [TasksVersion, setTasksVersion] = useState(0);

  function refreshTasks() {
    setTasksVersion((prev) => prev + 1);
  }

  useEffect(() => {
    getTasks(list?.id).then((response) => setTasks(response.data.data));
  }, [TasksVersion]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minWidth: 250,
        maxWidth: 300,
        flexGrow: 1,
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

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {tasks.map((task) => (
          <ListCard key={task.id} task={task} />
        ))}
      </div>

      <CreateTask
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        refreshTasks={refreshTasks}
        listID={list.id}
      />
    </div>
  );
}
