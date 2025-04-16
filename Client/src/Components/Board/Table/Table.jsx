import React, { useState, useContext, useRef, useEffect } from "react";
import { Checkbox, Table, Tag, Form, Input } from "antd";
import { useBoardData } from "../../../Context/boardContext";
import stringToColor from "./../../../utils/stringToColor";
import useNotify from "../../../Context/notificationContext";
import { editTask } from "../../../Services/boardService";
import socket from "../../../Services/websocket";

var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };

const EditableContext = React.createContext(null);
const EditableRow = (_a) => {
  var { index } = _a,
    props = __rest(_a, ["index"]);
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = (_a) => {
  var { title, editable, children, dataIndex, record, handleSave } = _a,
    restProps = __rest(_a, [
      "title",
      "editable",
      "children",
      "dataIndex",
      "record",
      "handleSave",
    ]);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    var _a;
    if (editing) {
      (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };
  const save = () =>
    __awaiter(void 0, void 0, void 0, function* () {
      try {
        const values = yield form.validateFields();
        toggleEdit();
        handleSave(Object.assign(Object.assign({}, record), values), dataIndex);
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    });
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: true, message: `${title} is required.` }]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingInlineEnd: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

export default function TasksTable() {
  const { boardData, patchTask } = useBoardData();
  const notify = useNotify();

  const updateTask = (task, data) => {
    editTask(task.id, data).catch(() =>
      notify("error", "Error", "Failed to edit the task.")
    );
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const data = boardData
    .map((list) => {
      return list.tasks.map((task) => {
        return { ...task, listname: list.title };
      });
    })
    .flat();

  const listNames = [...new Set(data.map((task) => task.listname))];

  const handleSave = (row, field) => {
    const previousTask = data.find((t) => t.id == row.id);
    if (previousTask[field] != row[field]) {
      const taskData = {
        title: row.title,
        description: row.description,
        completed: row.completed,
      };
      const task = { id: row.id };
      if (socket.connected) {
        socket.emit("taskEdited", { task, taskData, field, value: row[field] });
      }
      updateTask(task, { ...taskData, [field]: row[field] });
      patchTask(task, taskData, field, row[field]);
    }
  };

  const defaultColumns = [
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
      render: (_, record) => (
        <Checkbox
          checked={record.completed}
          onChange={(e) =>
            handleSave({ ...record, completed: e.target.checked }, "completed")
          }
        ></Checkbox>
      ),
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
      editable: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      editable: true,
    },
  ];

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return Object.assign(Object.assign({}, col), {
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    });
  });

  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        flexGrow: 1,
      }}
    >
      <Table
        components={components}
        style={{ flexGrow: 1, height: "100%" }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
}
