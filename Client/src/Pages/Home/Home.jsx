import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { Layout, theme, FloatButton, Avatar } from "antd";
import React, { useState, useContext } from "react";
import { themeContext } from "../../Context/themeContext";
import { Outlet } from "react-router-dom";
import { userContext } from "../../Context/userContext";
import SiderMenu from "../../Components/AppLayout/siderMenu";
import SiderBelow from "../../Components/AppLayout/siderBelow";
import SiderLogo from "../../Components/AppLayout/siderLogo";
import AppHeader from "../../Components/AppLayout/Header";
const { Header, Content, Footer, Sider } = Layout;

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
          <SiderLogo collapsed={collapsed} token={token} />
          <SiderMenu />
          <SiderBelow collapsed={collapsed} user={user} token={token} />
        </div>
      </Sider>

      <Layout>
        <AppHeader token={token} user={user}/>

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
