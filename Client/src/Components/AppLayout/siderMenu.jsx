import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  HomeOutlined,
  AppstoreOutlined,
  CheckSquareOutlined,
  InboxOutlined,
  TeamOutlined,
  SettingOutlined,
} from "@ant-design/icons";

// Função que cria cada item do menu
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Home", "/home", <HomeOutlined />),
  getItem("Boards", "/boards", <AppstoreOutlined />),
  getItem("My Tasks", "/my-tasks", <CheckSquareOutlined />),
  getItem("Archived", "/archived", <InboxOutlined />),
  getItem("Teams", "/teams", <TeamOutlined />),
];

function findLabelByKey(items, key) {
  for (const item of items) {
    if (item.key === key) return item.label;
    if (item.children) {
      const found = findLabelByKey(item.children, key);
      if (found) return found;
    }
  }
  return null;
}

export default function SiderMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname);

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const handleSelect = ({ key }) => {
    setSelectedKey(key);
    const label = findLabelByKey(items, key);
    navigate(key);
  };

  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      items={items}
      style={{ flexGrow: 1 }}
      onSelect={handleSelect}
    />
  );
}
