import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu, Popconfirm } from "antd";

export default function SiderBelow({ collapsed, user, token }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: collapsed ? "8px" : "6px",
        transition: "all 0.3s",
      }}
    >
      <Menu
        mode="inline"
        selectable={false}
        style={{ border: "none", textAlign: "left" }}
      >
        <Menu.Item
          key="logout"
          title="Logout"
          icon={<LogoutOutlined />}
          onClick={() => {
            console.log("Logout");
          }}
        >
          {!collapsed && "Logout"}
        </Menu.Item>
        <Menu.Item
          key="settings"
          title="Config."

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
