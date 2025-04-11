import { Checkbox, theme, Card, Typography } from "antd";
import { useState } from "react";
import { editTask } from "../../../Services/boardService";
import useNotify from "../../../Context/notificationContext";
const { Paragraph } = Typography;

export default function ListCard({ task }) {
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

  const handleEdit = (ev) => {
    if (ev?.target?.value) {
      updateTask({ ...taskData, completed: !taskData.completed });
    } else {
      updateTask({ ...taskData, title: ev });
    }
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
            onClick={handleEdit}
          ></Checkbox>
          <Paragraph
            style={{ margin: 0, width: "100%" }}
            editable={{
              onChange: handleEdit,
              triggerType: "text",
            }}
          >
            {taskData.title}
          </Paragraph>
        </div>
      }
    >
      <p
        style={{
          margin: 0,
          color: token.colorTextDescription,
          fontWeight: "normal",
          fontSize: 11,
        }}
      >
        {`${task?.description?.substring(0, 19)}...`}
      </p>
    </Card>
  );
}
