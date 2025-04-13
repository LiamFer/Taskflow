import {
  UserAddOutlined,
  UserOutlined,
  AntDesignOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Avatar, Tooltip, Typography } from "antd";
import stringToColor from "../../utils/stringToColor";
import useNotify from "../../Context/notificationContext";
import { useBoardData } from "../../Context/boardContext";
import DeleteBoard from "./DeleteBoard";

export default function BoardHeader({ boardInfo }) {
  const { notify } = useNotify();
  const { updateBoardInfo } = useBoardData();

  function changeBoardTitle(newTitle) {
    if (newTitle == boardInfo.title) return;
    if (newTitle.length >= 6) {
      updateBoardInfo(boardInfo.id, {
        title: newTitle,
        description: boardInfo.description,
      })
        .then(() =>
          notify("success", "Board Edited!", "Everything went smoothly.")
        )
        .catch(() =>
          notify(
            "error",
            "Oops!",
            "Something didn't go as planned. Please refresh the page or try again."
          )
        );
    } else {
      notify("warning", "Oops!", "The title must be least 6 characters long!");
    }
  }

  return (
    /* Titulo e Icone do Board*/
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxHeight: "60px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          padding: "10px",
          flexGrow: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <Avatar
          shape="square"
          size="large"
          style={{
            backgroundColor: stringToColor(boardInfo?.title || "Board"),
            color: "white",
            boxShadow: "rgba(2, 2, 2, 0.2) 2px 2px 5px",
            minWidth: "40px",
          }}
        >
          {boardInfo?.title.substr(0, 4)}
        </Avatar>

        <Typography.Title
          level={1}
          style={{
            flexGrow: "1",
            margin: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          editable={{
            onChange: (newTitle) => changeBoardTitle(newTitle),
            triggerType: "text",
          }}
        >
          {boardInfo?.title}
        </Typography.Title>
      </div>
      {/* Componente de Membros do board e Invite */}
      <div style={{ display: "flex", gap: "10px" }}>
        <Avatar.Group
          max={{
            count: 3,
            style: { color: "#f56a00", backgroundColor: "#fde3cf" },
          }}
        >
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
          <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
          <Tooltip title="Ant User" placement="top">
            <Avatar
              style={{ backgroundColor: "#87d068" }}
              icon={<UserOutlined />}
            />
          </Tooltip>
          <Avatar
            style={{ backgroundColor: "#1677ff" }}
            icon={<AntDesignOutlined />}
          />
        </Avatar.Group>
        <Button icon={<UserAddOutlined />}>Invite</Button>
        <DeleteBoard boardInfo={boardInfo} />
      </div>
    </div>
  );
}
