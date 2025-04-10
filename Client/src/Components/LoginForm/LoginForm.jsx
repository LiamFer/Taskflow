import { Button, Form, Input } from "antd";

export default function LoginForm() {
  return (
    <>
      <Form.Item name="email" label="Email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: true }]} >
        <Input.Password autoComplete="new-password"  />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" block>
          Login
        </Button>
      </Form.Item>
    </>
  );
}
