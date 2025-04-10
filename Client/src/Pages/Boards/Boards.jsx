import {
  AppstoreOutlined,
  TableOutlined,
  UnorderedListOutlined,
  ClockCircleOutlined,
  UserAddOutlined,
  UserOutlined,
  AntDesignOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Tabs, theme, Card, Avatar, Tooltip } from "antd";
import stringToColor from "../../utils/stringToColor";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBoards, getLists } from "../../Services/boardService";
import BoardHeader from "./../../Components/Board/BoardHeader";
import BoardList from "../../Components/Board/BoardList/BoardList";

export default function Boards() {
  const { boardID } = useParams();
  const [boardInfo, setBoardInfo] = useState();
  const [boardLists, setBoardLists] = useState([]);
  const { token } = theme.useToken();

  useEffect(() => {
    getBoards().then((response) => {
      const boardData = response.data.data.filter(
        (board) => board.id == boardID
      )[0];
      setBoardInfo(boardData);
      getLists(boardData.id).then((response) =>
        setBoardLists(response.data.data)
      );
    });
  }, [boardID]);

  const items = [
    {
      label: (
        <span>
          <AppstoreOutlined /> Kanban
        </span>
      ),
      key: "1",
      children: (
        <div
          style={{
            display: "flex",
            width: "100%",
            gap: 20,
          }}
        >
          {boardLists.map((list) => (
            <BoardList list={list} />
          ))}
        </div>
      ),
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
      <BoardHeader boardInfo={boardInfo} />
      <div
        style={{
          flex: 1, // ocupa o resto do espaço
          overflowY: "auto", // scroll só aqui
          padding: "10px",
        }}
      >
        <Tabs
          defaultActiveKey="1"
          items={items}
          tabBarExtraContent={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => console.log("Adicionar membro")}
            >
              New List
            </Button>
          }
        />
      </div>
    </div>
  );
}
