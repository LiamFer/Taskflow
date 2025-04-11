import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Dropdown } from "antd";
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

  const items = [
    {
      key: "1",
      label: (
        <Popconfirm
          title="Delete this Task"
          description="Are you sure to delete this Task?"
          onConfirm={handleDelete}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <a onClick={() => {}}>Delete Task</a>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomLeft">
      <Button type="text" icon={<EllipsisOutlined />} />
    </Dropdown>
  );
}
