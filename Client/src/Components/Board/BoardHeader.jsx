import {
  UserAddOutlined,
  UserOutlined,
  AntDesignOutlined,
} from "@ant-design/icons";
import { Button, Avatar, Tooltip } from "antd";
import stringToColor from "../../utils/stringToColor";

export default function BoardHeader({ boardInfo }) {
  return (
    /* Titulo e Icone do Board*/
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Avatar
          shape="square"
          size="large"
          style={{
            backgroundColor: stringToColor(boardInfo?.title || "Board"),
            color: "white",
            boxShadow: "rgba(2, 2, 2, 0.2) 2px 2px 5px",
          }}
        >
          {boardInfo?.title.substr(0, 4)}
        </Avatar>
        <h1>{boardInfo?.title}</h1>
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
      </div>
    </div>
  );
}
