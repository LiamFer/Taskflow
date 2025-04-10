import { Drawer,Button } from "antd";
import { themeContext } from "../../Context/themeContext";
import { useContext } from "react";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";


export default function ConfigPanel({ open,setOpen }) {
  const { darkMode, setDarkMode } = useContext(themeContext);

  return (
    <Drawer
      title="App Configuration"
      placement={"left"}
      closable={false}
      onClose={() => setOpen(false)}
      open={open}
      key={"left"}
    >
      <Button
          icon={darkMode ? <SunOutlined /> : <MoonOutlined />}
          tooltip="Change Theme"
          onClick={() => setDarkMode((prev) => !prev)}
        >Change App Theme</Button>
    </Drawer>
  );
}
