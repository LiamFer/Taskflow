import { Checkbox, theme, Card, Typography } from "antd";
import { useState } from "react";
import { editTask } from "../../../Services/boardService";
import useNotify from "../../../Context/notificationContext";
import DeleteTaskButton from "./DeleteTaskButton";
const { Paragraph } = Typography;

export default function ListCard({ task, refreshTasks }) {
  const { token } = theme.useToken();
  const { notify } = useNotify();
  const [taskData, setTaskData] = useState({
    title: task.title,
    description: task.description,
    completed: task.completed,
  });

  const updateTask = (data) => {
    editTask(task.id, data)
      .then((response) => setTaskData(data))
      .catch(() => notify("error", "Error", "Failed to edit the task."));
  };

  const handleEdit = (field, value) => {
    updateTask({ ...taskData, [field]: value });
  };

  return (
    <Card
      key={task.id}
      size="small"
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            width: "100%",
          }}
        >
          <Checkbox
            checked={taskData.completed}
            onClick={(ev) => {
              handleEdit("completed", ev.target.checked);
            }}
          ></Checkbox>
          <Paragraph
            style={{
              margin: 0,
              flexGrow: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            editable={{
              onChange: (ev) => {
                handleEdit("title", ev);
              },
              triggerType: "text",
            }}
          >
            {taskData.title}
          </Paragraph>
          <DeleteTaskButton taskID={task.id} refreshTasks={refreshTasks}/>
        </div>
      }
    >
      <Paragraph
        style={{
          margin: 0,
          width: "100%",
          color: token.colorTextDescription,
          fontWeight: "normal",
          fontSize: 11,
          textWrap: "wrap",
        }}
        editable={{
          onChange: (ev) => {
            handleEdit("description", ev);
          },
          triggerType: "text",
        }}
      >
        {taskData.description}
      </Paragraph>
    </Card>
  );
}
