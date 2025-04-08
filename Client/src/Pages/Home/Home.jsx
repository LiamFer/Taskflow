import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  SunOutlined,
  MoonOutlined,
  AntDesignOutlined,
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, FloatButton, Avatar } from "antd";
import React, { useState, useContext } from "react";
import { themeContext } from "../../Context/themeContext";
import { Outlet } from "react-router-dom";
import { userContext } from "../../Context/userContext";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

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

const configItems = [
  getItem("Logout", "1", <LogoutOutlined />),
  getItem("Config", "2", <SettingOutlined />),
];

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token } = theme.useToken();
  const { darkMode, setDarkMode } = useContext(themeContext);
  const { user } = useContext(userContext);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
        width={200}
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "16px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "start",
              padding: "0 16px",
              marginBottom: 16,
            }}
          >
            <img
              src="https://images.vexels.com/media/users/3/196923/isolated/preview/79898c94791f3ed578e90b613d31eac0-cristal-roxo-brilhante.png" // substitua pelo caminho da sua logo
              alt="Taskflow Logo"
              style={{
                height: 32,
                objectFit: "contain",
                transition: "all 0.3s",
              }}
            />
            {!collapsed && (
              <span
                style={{
                  marginLeft: 8,
                  fontWeight: "bold",
                  fontSize: 18,
                  whiteSpace: "nowrap",
                  color: token.colorTextBase,
                }}
              >
                Taskflow
              </span>
            )}
          </div>
          <Menu
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            style={{ flexGrow: 1 }}
          />
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
                  // Lógica de logout
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
        </div>
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: token.colorBgContainer }} />

        <Content style={{ margin: "0 16px" }}>
          <Outlet />
        </Content>

        <Footer style={{ textAlign: "center" }}>
          Taskflow ©{new Date().getFullYear()} Gauss
        </Footer>
      </Layout>

      <FloatButton
        icon={darkMode ? <SunOutlined /> : <MoonOutlined />}
        tooltip="Change Theme"
        onClick={() => setDarkMode((prev) => !prev)}
      ></FloatButton>
    </Layout>
  );
};

export default Home;
