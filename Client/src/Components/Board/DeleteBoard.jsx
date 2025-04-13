import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import useNotify from "../../Context/notificationContext";
import { useBoardData } from "../../Context/boardContext";

export default function DeleteBoard({ boardInfo }) {
  const { notify } = useNotify();
  const { updateBoardInfo } = useBoardData();

  return <Button icon={<DeleteOutlined />}>Delete Board</Button>;
}
