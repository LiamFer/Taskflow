import {
  AppstoreOutlined,
  TableOutlined,
  UnorderedListOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Button, Tabs, theme, Card } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBoards } from "../../Services/boardService";

export default function Boards() {
  const { boardID } = useParams();
  const [boardInfo, setBoardInfo] = useState();
  const { token } = theme.useToken();

  useEffect(() => {
    getBoards().then((response) =>
      setBoardInfo(response.data.data.filter((board) => board.id == boardID)[0])
    );
  }, [boardID]);

  const items = [
    {
      label: (
        <span>
          <AppstoreOutlined /> Kanban
        </span>
      ),
      key: "1",
      children: "Conteúdo Kanban",
    },
    {
      label: (
        <span>
          <TableOutlined /> Table
        </span>
      ),
      key: "2",
      children: "Conteúdo Table",
      disabled: true,
    },
    {
      label: (
        <span>
          <UnorderedListOutlined /> List
        </span>
      ),
      key: "3",
      children: "Conteúdo List",
      disabled: true,
    },
    {
      label: (
        <span>
          <ClockCircleOutlined /> Timeline
        </span>
      ),
      key: "4",
      children: "Conteúdo Timeline",
      disabled: true,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <h1>{boardInfo?.title}</h1>

      <div
        style={{
          flex: 1, // ocupa o resto do espaço
          overflowY: "auto", // scroll só aqui
          padding: "10px",
        }}
      >
        {" "}
        <Tabs
          defaultActiveKey="1"
          items={items}
        />
      </div>
    </div>
  );
}
