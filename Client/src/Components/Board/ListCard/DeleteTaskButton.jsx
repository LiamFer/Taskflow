import { DeleteOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import useNotify from "../../../Context/notificationContext";
import { deleteTask } from "../../../Services/boardService";

export default function DeleteTaskButton({ taskID, refreshLists }) {
  const { notify } = useNotify();

  const handleDelete = () => {
    deleteTask(taskID)
      .then((response) => {
        notify("success", "All done!", "Everything went smoothly.");
        refreshLists();
      })
      .catch((err) => {
        notify(
          "error",
          "Oops!",
          "Something didn't go as planned. Please refresh the page or try again."
        );
      });
  };

  return (
    <Popconfirm
      title="Delete this Task"
      description="Are you sure to delete this Task?"
      onConfirm={handleDelete}
      onCancel={() => {}}
      okText="Yes"
      cancelText="No"
    >
      <Button type="text" icon={<DeleteOutlined />} />
    </Popconfirm>
  );
}
