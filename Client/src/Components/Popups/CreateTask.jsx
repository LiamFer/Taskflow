import { Form, Input, Modal } from "antd";
import { createTask } from "../../Services/boardService";
import useNotify from "../../Context/notificationContext";

export default function CreateTask({
  isModalOpen,
  setIsModalOpen,
  listID,
  refreshTasks,
}) {
  const [form] = Form.useForm();
  const { notify } = useNotify();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        createTask(listID, values)
          .then(() => {
            notify("success", "Done", "Task created successfully!");
            form.resetFields();
            setIsModalOpen(false);
            refreshTasks();
          })
          .catch(() => {
            notify("error", "Error", "Failed to create the Task.");
          });
      })
      .catch(() => {
        notify("warning", "Validation", "Please fill the fields correctly!");
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="New Task"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Create"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Task Name"
          name="title"
          rules={[{ required: true, message: "Please enter a Task name." }]}
        >
          <Input placeholder="e.g. To Do" />
        </Form.Item>
        <Form.Item
          label="Task Description"
          name="description"
          rules={[{ required: true, message: "Please enter the Description." }]}
        >
          <Input.TextArea placeholder="e.g. To Do" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
