import { Layout, Avatar } from "antd";
import stringToColor from "../../utils/stringToColor";
const { Header } = Layout;


export default function AppHeader({token,user}) {
  return (
    <Header
      style={{
        padding: 10,
        background: token.colorBgContainer,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <h1>Welcome, {user?.name}!</h1>
      <Avatar
        size={"large"}
        style={{
          backgroundColor: stringToColor(user?.name || "Usuário"),
          color: "white",
          marginBottom: 8,
        }}
      >
        {user?.name}
      </Avatar>
    </Header>
  );
}
