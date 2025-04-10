import { Checkbox, theme, Card } from "antd";

export default function ListCard({task}) {
  const { token } = theme.useToken();

  return (
    <Card
      key={task.id}
      size="small"
      title={<Checkbox checked={task.completed}>{task.title}</Checkbox>}
    >
      <p
        style={{
          margin: 0,
          color: token.colorTextDescription,
          fontWeight: "normal",
          fontSize: 11,
        }}
      >
        {`${task?.description?.substring(0, 19)}...`}
      </p>
    </Card>
  );
}
