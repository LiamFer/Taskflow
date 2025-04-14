import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import useNotify from "../../../Context/notificationContext";
import { deleteList } from "../../../Services/boardService";
import { useBoardData } from "../../../Context/boardContext";
import socket from "../../../Services/websocket";

export default function DeleteListButton({ listID }) {
  const { notify } = useNotify();
  const { setBoardData } = useBoardData();

  const handleDelete = () => {
    deleteList(listID)
      .then((response) => {
        setBoardData((prev) => prev.filter((list) => list.id != listID));
        notify("success", "All done!", "Everything went smoothly.");
        if (socket.connected) {
          socket.emit("listDelete",{listID});
        }
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
      title="Delete this List"
      description="Are you sure to delete this List?"
      onConfirm={handleDelete}
      onCancel={() => {}}
      okText="Yes"
      cancelText="No"
    >
      <Button type="text" icon={<DeleteOutlined />} />
    </Popconfirm>
  );
}
