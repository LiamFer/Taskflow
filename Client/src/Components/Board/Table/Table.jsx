import React from "react";
import { Checkbox, Table, Tag } from "antd";
import { useBoardData } from "../../../Context/boardContext";
import stringToColor from "./../../../utils/stringToColor";

export default function TasksTable() {
  const { boardData } = useBoardData();
  const data = boardData
    .map((list) => {
      return list.tasks.map((task) => {
        return { ...task, listname: list.title };
      });
    })
    .flat();

  const listNames = [...new Set(data.map((task) => task.listname))];

  const columns = [
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
      render: (_, record) => <Checkbox checked={record.completed}></Checkbox>,
      filters: [
        { text: "Completed", value: true },
        { text: "Pending", value: false },
      ],
      onFilter: (value, record) => record.completed === value,
    },
    {
      title: "List",
      dataIndex: "listname",
      key: "listname",
      render: (text) => (
        <Tag color={stringToColor(text)} key={text}>
          {text}
        </Tag>
      ),
      filters: listNames.map((name) => ({
        text: name,
        value: name,
      })),
      onFilter: (value, record) => record.listname.indexOf(value) === 0,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];
  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        flexGrow: 1,
      }}
    >
      <Table
        style={{ flexGrow: 1, height: "100%" }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
}
