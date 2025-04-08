import { Form, Card, notification, FloatButton } from "antd";
import { useContext, useState } from "react";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { themeContext } from "../../Context/themeContext";
import styles from "./login.module.css";
import LoginForm from "../../Components/LoginForm/LoginForm";
import RegisterForm from "../../Components/RegisterForm/RegisterForm";
import { authMe, createUser, login } from "../../Services/userService";
import { userContext } from "../../Context/userContext";

export default function Login() {
  const [form] = Form.useForm();
  const { darkMode, setDarkMode } = useContext(themeContext);
  const [activeTab, setActiveTab] = useState("1");
  const [api, contextHolder] = notification.useNotification();
  const { user,setUser } = useContext(userContext);

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
    if (activeTab == "1") {
      login(values)
        .then((response) => {
          authMe().then((response) => setUser(response.data.data));
          api["success"]({
            message: "Login Efetuado!",
            description: response.data.message,
          });
        })
        .catch((e) => {
          api["error"]({
            message: "Invalid Credentials",
            description: "Invalid Credentials",
          });
        });
    } else {
      createUser(values)
        .then((response) => {
          form.resetFields();
          setActiveTab("1");
          api["success"]({
            message: "Usuário Criado",
            description: response.data.message,
          });
        })
        .catch((e) => {
          api["error"]({
            message: "Invalid Credentials",
            description: e.response.data.message,
          });
        });
    }
  };

  const onFinishFailed = (values) => {
    console.log(values);
  };

  return (
    <>
      {contextHolder}
      <main className={styles.box}>
        <div className={styles.loader}>
          <div className={styles.loaderSquare}></div>
          <div className={styles.loaderSquare}></div>
          <div className={styles.loaderSquare}></div>
          <div className={styles.loaderSquare}></div>
          <div className={styles.loaderSquare}></div>
          <div className={styles.loaderSquare}></div>
          <div className={styles.loaderSquare}></div>
        </div>
        <Form
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
            onTabChange={(key) => {
              setActiveTab(key);
              form.resetFields();
            }}
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
