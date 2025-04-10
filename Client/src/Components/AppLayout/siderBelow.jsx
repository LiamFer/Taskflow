import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu, Modal } from "antd";
import { logout } from "../../Services/userService";


export default function SiderBelow({ collapsed,open,setOpen }) {
  const [modal, contextHolder] = Modal.useModal();

  const showConfirm = () => {
  modal.confirm({
    title: "Are you sure you want to log out?",
    content: "This action will end your session.",
    okText: "Yes",
    cancelText: "Cancel",
    onOk() {
      logout();
    },
    onCancel() {
      console.log("User canceled");
    },
  });
};


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
            showConfirm();
          }}
        >
          {!collapsed && "Logout"}
        </Menu.Item>
        <Menu.Item
          key="settings"
          title="Config."
          icon={<SettingOutlined />}
          onClick={() => {
            setOpen(true)
          }}
        >
          {!collapsed && "Config."}
        </Menu.Item>
      </Menu>
      {contextHolder}
    </div>
  );
}
