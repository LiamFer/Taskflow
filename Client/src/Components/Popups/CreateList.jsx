import { Form, Input, Modal } from "antd";
import { createList } from "../../Services/boardService";
import useNotify from "../../Context/notificationContext";
import { useBoardData } from "../../Context/boardContext";

export default function CreateList({
  isModalOpen,
  setIsModalOpen,
  boardID,
}) {
  const [form] = Form.useForm();
  const { notify } = useNotify();
  const { fetchBoard } = useBoardData();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        createList(boardID, values)
          .then(() => {
            notify("success", "Done", "List created successfully!");
            form.resetFields();
            setIsModalOpen(false);
            fetchBoard();
          })
          .catch(() => {
            notify("error", "Error", "Failed to create the list.");
          });
      })
      .catch(() => {
        notify("warning", "Validation", "Please enter a list name.");
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="New List"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Create"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="List Name"
          name="title"
          rules={[{ required: true, message: "Please enter a list name." }]}
        >
          <Input placeholder="e.g. To Do" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
