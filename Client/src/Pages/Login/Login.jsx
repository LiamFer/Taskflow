import { Button, Form, Card, Input, FloatButton } from "antd";
import { useContext, useState } from "react";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { themeContext } from "../../Context/themeContext";
import styles from "./login.module.css";
import LoginForm from "../../Components/LoginForm/LoginForm";
import RegisterForm from "../../Components/RegisterForm/RegisterForm";

export default function Login() {
  const [form] = Form.useForm();
  const { darkMode, setDarkMode } = useContext(themeContext);
  const [activeTab, setActiveTab] = useState("1");

  const tabList = [
    {
      key: "1",
      tab: "Login",
    },
    {
      key: "2",
      tab: "Register",
    },
  ];

  const onFinish = (values) => {
    console.log(values);
  };

  const onFinishFailed = (values) => {
    console.log(values);
  };

  return (
    <>
      <main className={styles.box}>
        <Form
          className={styles.form}
          layout="vertical"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Card
            style={{ width: "350px" }}
            title="TASKFLOW"
            tabList={tabList}
            activeTabKey={activeTab}
            onTabChange={(key) => setActiveTab(key)}
          >
            {activeTab == "1" ? <LoginForm /> : <RegisterForm />}
          </Card>
        </Form>
        <FloatButton
          icon={darkMode ? <SunOutlined /> : <MoonOutlined />}
          tooltip="Change Theme"
          onClick={() => setDarkMode((prev) => !prev)}
        ></FloatButton>
      </main>
    </>
  );
}

/* <Button onClick={() => setDarkMode((prev) => !prev)}>SADASD</Button> */
