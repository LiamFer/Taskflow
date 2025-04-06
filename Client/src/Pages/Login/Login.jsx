import { Button, Form, Card, Input, FloatButton } from "antd";
import { useContext, useState } from "react";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { themeContext } from "../../Context/themeContext";
import styles from "./login.module.css";

export default function Login() {
  const [form] = Form.useForm();
  const { darkMode ,setDarkMode } = useContext(themeContext);
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
    openNotification();
  };

  return (
    <>
      <main className={styles.box}>
        <Form
          className={styles.form}
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <Card
            style={{ width: "350px" }}
            title="LOG INTO THE SYSTEM"
            tabList={tabList}
            activeTabKey={activeTab}
            onTabChange={(key) => setActiveTab(key)}
          >
            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                Entrar
              </Button>
            </Form.Item>
          </Card>
        </Form>
        <FloatButton icon={darkMode ? <SunOutlined /> : <MoonOutlined />} tooltip="Change Theme" onClick={() => setDarkMode((prev) => !prev)}></FloatButton>
      </main>
    </>
  );
}

/* <Button onClick={() => setDarkMode((prev) => !prev)}>SADASD</Button> */
