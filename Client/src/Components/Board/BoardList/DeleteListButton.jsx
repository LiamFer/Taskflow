import { DeleteOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Dropdown } from "antd";
import useNotify from "../../../Context/notificationContext";
import { deleteList } from "../../../Services/boardService";

export default function DeleteListButton({ listID, setBoardLists }) {
  const { notify } = useNotify();

  const handleDelete = () => {
    deleteList(listID)
      .then((response) => {
        setBoardLists((prev) => prev.filter((list) => list.id != listID));
        notify("success", "All done!", "Everything went smoothly.");
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
