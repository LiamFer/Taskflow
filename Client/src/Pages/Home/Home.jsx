import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  SunOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, FloatButton } from "antd";
import React, { useState, useContext } from "react";
import { themeContext } from "../../Context/themeContext";
import { Outlet } from "react-router-dom";
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
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
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

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token } = theme.useToken();
  const { darkMode, setDarkMode } = useContext(themeContext);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
      >
        <div className="demo-logo-vertical" />
        <Menu defaultSelectedKeys={["1"]} mode="inline" items={items} />
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
