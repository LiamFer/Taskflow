import { Avatar, Form, Input, Modal } from "antd";
import { createBoard, createTask } from "../../Services/boardService";
import useNotify from "../../Context/notificationContext";
import { useBoardData } from "../../Context/boardContext";
import stringToColor from "../../utils/stringToColor";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CreateBoard({ open, setOpen }) {
  const [title, setTitle] = useState("");
  const [form] = Form.useForm();
  const { notify } = useNotify();
  const { addBoard } = useBoardData();
  const navigate = useNavigate();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        addBoard(values)
          .then((response) => {
            notify("success", "Done", "Board created successfully!");
            form.resetFields();
            navigate(`/home/boards/${response}`);
            setOpen(false);
          })
          .catch(() => {
            notify("error", "Error", "Failed to create the Board.");
          });
      })
      .catch(() => {
        notify("warning", "Validation", "Please fill the fields correctly!");
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setTitle("");
    setOpen(false);
  };

  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Avatar
            size="large"
            style={{
              backgroundColor: stringToColor(title),
              color: "white",
              minWidth: "40px",
            }}
          >
            {title.substring(0, 4)}
          </Avatar>
          <h1 style={{ margin: 0 }}>New Board</h1>
        </div>
      }
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Create"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Board Name"
          name="title"
          rules={[
            { required: true, message: "Please enter a Board name." },
            { min: 6, message: "Board name must be at least 6 characters." },
          ]}
        >
          <Input
            placeholder="e.g. To Do"
            onChange={(ev) => setTitle(ev.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Board Description"
          name="description"
          rules={[{ required: true, message: "Please enter the Description." }]}
        >
          <Input.TextArea placeholder="e.g. To Do" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
