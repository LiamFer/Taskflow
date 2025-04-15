import {
  AppstoreOutlined,
  TableOutlined,
  UnorderedListOutlined,
  ClockCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Tabs } from "antd";
import { useContext, useEffect, useState } from "react";
import CreateList from "../../Popups/CreateList";
import { useBoardData } from "../../../Context/boardContext";
import socket from "../../../Services/websocket";
import { getMembers } from "../../../Services/boardService";
import Kanban from "../Kanban/Kanban";
import Table from "../Table/Table";
import { userContext } from "../../../Context/userContext";

export default function BoardTab({ ID }) {
  const { fetchBoard } = useBoardData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {user} = useContext(userContext)
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetchBoard(ID);
  }, [ID]);

  // Conexão com o websocket
  useEffect(() => {
    if (ID) {
      getMembers(ID).then((res) => {
        const members = res.data.data;
        if (members.filter((m) => m.email != user.email).length) {
          socket.connect();
          socket.emit("joinBoard", { boardID: ID});
        }
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [ID]);


  const items = [
    {
      label: (
        <span>
          <AppstoreOutlined /> Kanban
        </span>
      ),
      key: 0,
    },
    {
      label: (
        <span>
          <TableOutlined /> Table
        </span>
      ),
      key: 1,
    },
    {
      label: (
        <span>
          <UnorderedListOutlined /> List
        </span>
      ),
      key: 2,
      disabled: true,
    },
    {
      label: (
        <span>
          <ClockCircleOutlined /> Timeline
        </span>
      ),
      key: 3,
      disabled: true,
    },
  ];
  const views = [<Kanban />,<Table/>]

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        style={{ width: "100%" }}
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

      {views[activeTab]}

    

      <CreateList isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}
