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
import CreateList from "../../Popups/CreateList";

export default function BoardTab({ boardID }) {
  const [boardLists, setBoardLists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State pra Atualizar as Listas caso o Usuário crie uma Nova !
  const [listsVersion, setListsVersion] = useState(0);
  useEffect(() => {
    getLists(boardID).then((response) => setBoardLists(response.data.data));
  }, [boardID, listsVersion]);

  function refreshLists() {
    setListsVersion((prev) => prev + 1);
  }

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
            <BoardList
              key={list.id}
              list={list}
              setBoardLists={setBoardLists}
            />
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
    <>
      <Tabs
        defaultActiveKey="1"
        items={items}
        tabBarExtraContent={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            New List
          </Button>
        }
      />
      <CreateList
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        refreshLists={refreshLists}
        boardID={boardID}
      />
    </>
  );
}
