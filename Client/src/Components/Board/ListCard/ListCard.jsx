import { Checkbox, theme, Card, Typography, Button } from "antd";
import { useState } from "react";
import { editTask } from "../../../Services/boardService";
import useNotify from "../../../Context/notificationContext";
import DeleteTaskButton from "./DeleteTaskButton";
import { useDraggable } from "@dnd-kit/core";
import { useBoardData } from "../../../Context/boardContext";
import { MenuOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

export default function ListCard({ task }) {
  const { patchTask } = useBoardData();
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        position: "fixed",
        zIndex: 9999,
        width: "250px",
        pointerEvents: "none",
      }
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
    if (taskData[field] != value) {
      updateTask({ ...taskData, [field]: value });
      patchTask(task, taskData, field, value);
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={{
        ...style,
        cursor: isDragging ? "grabbing" : "default",
        position: "relative",
      }}
      key={task.id}
      size="small"
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            gap: "15px",
            margin: 0,
          }}
        >
          <Button
            {...listeners}
            {...attributes}
            style={{
              cursor: "grab",
              fontWeight: "bold",
              userSelect: "none",
            }}
            onMouseDown={(e) => e.stopPropagation()}
            type="text"
            icon={<MenuOutlined />}
          />

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

          <DeleteTaskButton task={task} />
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
