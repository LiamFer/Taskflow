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
import { getBoards } from "../../Services/boardService";
import { useBoardData } from "../../Context/boardContext";

// Função que cria cada item do menu
function getItem(label, key, icon, children, disabled) {
  return {
    key,
    icon,
    children,
    label,
    disabled,
  };
}

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
  const { userBoards, fetchUserBoards } = useBoardData();
  const [selectedKey, setSelectedKey] = useState(location.pathname);

  useEffect(() => {
    fetchUserBoards();
  }, []);

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const handleSelect = ({ key }) => {
    setSelectedKey(key);
    const label = findLabelByKey(items, key);
    navigate(key);
  };

  const items = [
    getItem("Home", "/home", <HomeOutlined />),
    getItem(
      "Boards",
      "/home/boards",
      <AppstoreOutlined />,
      userBoards.map((board) =>
        getItem(board.title, `/home/boards/${board.id}`)
      )
    ),
    getItem("My Tasks", "/my-tasks", <CheckSquareOutlined />, null, true),
    getItem("Archived", "/archived", <InboxOutlined />, null, true),
    getItem("Teams", "/teams", <TeamOutlined />, null, true),
  ];
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
