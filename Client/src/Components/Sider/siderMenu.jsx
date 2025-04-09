import {
  DesktopOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

const items = [
  getItem("Home", "1", <HomeOutlined />),
  getItem("Boards", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

export default function SiderMenu() {
  return (
    <Menu
      defaultSelectedKeys={["1"]}
      mode="inline"
      items={items}
      style={{ flexGrow: 1 }}
    />
  );
}
