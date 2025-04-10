import {
  AppstoreOutlined,
  TableOutlined,
  UnorderedListOutlined,
  ClockCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Tabs } from "antd";
import { useEffect, useState } from "react";
import BoardList from "../BoardList/BoardList";
import { getLists } from "../../../Services/boardService";

export default function BoardTab({ boardID }) {
  const [boardLists, setBoardLists] = useState([]);

  useEffect(() => {
    getLists(boardID).then((response) => setBoardLists(response.data.data));
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
            <BoardList key={list.id} list={list} setBoardLists={setBoardLists} />
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
    <Tabs
      defaultActiveKey="1"
      items={items}
      tabBarExtraContent={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => console.log("New List")}
        >
          New List
        </Button>
      }
    />
  );
}
