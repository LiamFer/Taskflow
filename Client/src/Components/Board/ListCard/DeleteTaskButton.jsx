import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import useNotify from "../../../Context/notificationContext";
import { deleteTask } from "../../../Services/boardService";
import { useBoardData } from "../../../Context/boardContext";

export default function DeleteTaskButton({ taskID }) {
  const { notify } = useNotify();
  const { fetchBoard } = useBoardData();

  const handleDelete = () => {
    deleteTask(taskID)
      .then((response) => {
        notify("success", "All done!", "Everything went smoothly.");
        fetchBoard();
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
