import {
  EllipsisOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Checkbox, Button, theme, Popconfirm, Dropdown } from "antd";
import styles from "./boardlist.module.css";
import ListCard from "../ListCard/ListCard";
import { useEffect, useState } from "react";
import { getTasks } from "../../../Services/boardService";
import useNotify from "../../../Context/notificationContext";

export default function BoardList({ list }) {
  const [tasks, setTasks] = useState([]);
  const { token } = theme.useToken();
  const {notify} = useNotify()

  useEffect(() => {
    getTasks(list?.id).then((response) => setTasks(response.data.data));
  }, []);

  const items = [
    {
      key: "1",
      label: (
        <Popconfirm
          title="Delete this List"
          description="Are you sure to delete this List?"
          onConfirm={()=>notify("success","a","a")}
          onCancel={()=>{}}
          okText="Yes"
          cancelText="No"
        >
          <a onClick={() => {}}>Delete List</a>
        </Popconfirm>
      ),
    },
  ];

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
          <Button type="text" icon={<PlusOutlined />} />
          <Dropdown menu={{ items }} placement="bottomLeft">
            <Button type="text" icon={<EllipsisOutlined />} />
          </Dropdown>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {tasks.map((task) => (
          <ListCard task={task} />
        ))}
      </div>
    </div>
  );
}
