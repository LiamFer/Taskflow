import { PlusOutlined } from "@ant-design/icons";
import { Checkbox, Button, theme, Card } from "antd";
import styles from "./boardlist.module.css";
import ListCard from "../ListCard/ListCard";
import { useEffect, useState } from "react";
import { getTasks } from "../../../Services/boardService";

export default function BoardList({ list }) {
  const [tasks, setTasks] = useState([]);
  const { token } = theme.useToken();

  useEffect(() => {
    getTasks(list?.id).then((response) => setTasks(response.data.data));
  }, []);

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
        <Button type="text" icon={<PlusOutlined />} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {tasks.map((task) => (
          <ListCard task={task} />
        ))}
      </div>
    </div>
  );
}
