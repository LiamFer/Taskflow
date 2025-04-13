import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import useNotify from "../../Context/notificationContext";
import { useBoardData } from "../../Context/boardContext";
import { useNavigate } from "react-router-dom";

export default function DeleteBoard({ boardInfo }) {
  const { notify } = useNotify();
  const { removeBoard } = useBoardData();
  const navigate = useNavigate();

  function handleDelete() {
    removeBoard(boardInfo.id)
      .then(() => {
        notify("success", "Board Deleted!", "Everything went smoothly.");
        navigate("/home");
      })
      .catch(() => {
        notify(
          "error",
          "Oops!",
          "Something didn't go as planned. Please refresh the page or try again."
        );
      });
  }

  return (
    <Popconfirm
      title="Delete this Board"
      description="Are you sure you want to delete this Board?"
      onConfirm={handleDelete}
      onCancel={() => {}}
      okText="Yes"
      cancelText="No"
      placement="leftTop"
    >
      <Button icon={<DeleteOutlined />}>Delete Board</Button>
    </Popconfirm>
  );
}
