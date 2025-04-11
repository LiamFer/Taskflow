import { Checkbox, theme, Card, Typography } from "antd";
import { useState } from "react";
import { editTask } from "../../../Services/boardService";
import useNotify from "../../../Context/notificationContext";
import DeleteTaskButton from "./DeleteTaskButton";
import { useDraggable } from "@dnd-kit/core";
const { Paragraph } = Typography;

export default function ListCard({ task, refreshLists }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id
  });

  const style = transform
    ? { transform: `translate(${transform.x}px,${transform.y}px)` }
    : undefined;

  const { token } = theme.useToken();
  const { notify } = useNotify();
  const [taskData, setTaskData] = useState({
    title: task.title,
    description: task.description,
    completed: task.completed,
  });

  const updateTask = (data) => {
    editTask(task.id, data)
      .then(() => setTaskData(data))
      .catch(() => notify("error", "Error", "Failed to edit the task."));
  };

  const handleEdit = (field, value) => {
    updateTask({ ...taskData, [field]: value });
  };

  return (
    <Card
      ref={setNodeRef}
      style={{ ...style, cursor: "default" }}
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
          <div
            {...listeners}
            {...attributes}
            style={{
              cursor: "grab",
              padding: "0 4px",
              fontWeight: "bold",
              userSelect: "none",
            }}
            onMouseDown={(e) => e.stopPropagation()} // impede interferência
          >
            ☰
          </div>

          <Checkbox
            checked={taskData.completed}
            onChange={(ev) => {
              ev.stopPropagation();
              handleEdit("completed", ev.target.checked);
            }}
          />

          <Paragraph
            style={{
              margin: 0,
              flexGrow: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            editable={{
              onChange: (ev) => handleEdit("title", ev),
              triggerType: "text",
            }}
          >
            {taskData.title}
          </Paragraph>

          <DeleteTaskButton taskID={task.id} refreshLists={refreshLists} />
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
          onChange: (ev) => handleEdit("description", ev),
          triggerType: "text",
        }}
      >
        {taskData.description}
      </Paragraph>
    </Card>
  );
}
