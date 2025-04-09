import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu, Avatar } from "antd";

export default function SiderBelow({ collapsed, user, token }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: collapsed ? "8px" : "6px",
        transition: "all 0.3s",
      }}
    >
      <Avatar
        size={collapsed ? "small" : "large"}
        style={{
          backgroundColor: "#fde3cf",
          color: "#f56a00",
          marginBottom: 8,
        }}
      >
        {user?.name}
      </Avatar>
      {!collapsed && (
        <div style={{ fontSize: 14, color: token.colorTextBase }}>
          {user?.name || "Usuário"}
        </div>
      )}

      <Menu mode="inline" selectable={false} style={{ border: "none" }}>
        <Menu.Item
          key="logout"
          icon={<LogoutOutlined />}
          onClick={() => {
            console.log("Logout");
          }}
        >
          {!collapsed && "Logout"}
        </Menu.Item>
        <Menu.Item
          key="settings"
          icon={<SettingOutlined />}
          onClick={() => {
            console.log("Configurações");
          }}
        >
          {!collapsed && "Config."}
        </Menu.Item>
      </Menu>
    </div>
  );
}
